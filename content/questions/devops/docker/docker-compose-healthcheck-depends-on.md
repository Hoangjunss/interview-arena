---
id: docker-compose-healthcheck-depends-on
position: devops
technology: docker
level: mid
tags: [docker, docker-compose, healthcheck]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Docker Compose, `depends_on` mặc định có đảm bảo service phụ thuộc đã "sẵn sàng" chưa? Làm sao xử lý đúng thứ tự khởi động khi app cần DB đã sẵn sàng?

## Question (EN)
In Docker Compose, does plain `depends_on` guarantee the dependency is actually "ready"? How do you correctly handle startup ordering when an app needs the DB to be ready?

## Đáp án chi tiết (VI)
**Không.** `depends_on` mặc định (dạng list đơn giản) chỉ đảm bảo **thứ tự container được start**, chứ không đảm bảo **ứng dụng bên trong container đó đã sẵn sàng nhận kết nối**.

```yaml
services:
  app:
    build: .
    depends_on:
      - db          # chỉ đảm bảo container db được start TRƯỚC container app
  db:
    image: postgres:16
```
Container `db` có thể đã ở trạng thái `Running`, nhưng Postgres bên trong **vẫn đang trong quá trình khởi tạo** (init database, chạy migration...) mất vài giây — nếu `app` cố kết nối ngay lúc start, sẽ gặp lỗi `connection refused` hoặc `ECONNREFUSED`.

**Cách xử lý đúng — kết hợp `depends_on` với `condition: service_healthy`:**
```yaml
services:
  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb

  db:
    image: postgres:16
    environment:
      - POSTGRES_PASSWORD=pass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 10
      start_period: 10s
```
Với cấu hình này, Compose sẽ **chờ `db` đạt trạng thái `healthy`** (dựa trên healthcheck) rồi mới start `app`.

**Các `condition` khác của `depends_on` (Compose v2+):**
| Condition | Ý nghĩa |
|---|---|
| `service_started` | Mặc định — chỉ chờ container start (không chờ ready) |
| `service_healthy` | Chờ healthcheck trả về `healthy` |
| `service_completed_successfully` | Chờ container đó **chạy xong và exit code 0** — dùng cho container chạy migration một lần rồi thoát |

Ví dụ dùng `service_completed_successfully` cho init container kiểu migration:
```yaml
services:
  migrate:
    build: .
    command: npm run migrate
    depends_on:
      db:
        condition: service_healthy

  app:
    build: .
    depends_on:
      migrate:
        condition: service_completed_successfully
```

**Chiến lược bổ sung (defense in depth):** ngay cả khi có healthcheck, app vẫn nên có **retry logic khi kết nối DB** (exponential backoff), vì:
- Healthcheck có `interval`, nên có độ trễ giữa lần check thực tế và lúc Compose đọc được trạng thái.
- Trong Kubernetes (không có `depends_on` như Compose), retry logic ở tầng ứng dụng là **bắt buộc**, không phải tùy chọn.

**Gotcha:** `depends_on` chỉ áp dụng trong **cùng một file/project Compose** — không kiểm soát được thứ tự giữa các stack Compose khác nhau hoặc dịch vụ chạy ngoài Compose.

## Detailed Answer (EN)
**No.** Plain `depends_on` (the simple list form) only guarantees **container start order**, not that **the application inside that container is ready** to accept connections.

```yaml
services:
  app:
    build: .
    depends_on:
      - db          # only guarantees the db container starts BEFORE the app container
  db:
    image: postgres:16
```
The `db` container may already be `Running`, but Postgres inside it **could still be initializing** (bootstrapping the database, running migrations...) for a few seconds — if `app` tries to connect immediately on start, it hits `connection refused`/`ECONNREFUSED`.

**Correct handling — combine `depends_on` with `condition: service_healthy`:**
```yaml
services:
  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb

  db:
    image: postgres:16
    environment:
      - POSTGRES_PASSWORD=pass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 10
      start_period: 10s
```
With this config, Compose **waits for `db` to reach `healthy`** (per its healthcheck) before starting `app`.

**Other `depends_on` conditions (Compose v2+):**
| Condition | Meaning |
|---|---|
| `service_started` | Default — only waits for the container to start (not ready) |
| `service_healthy` | Waits for the healthcheck to report `healthy` |
| `service_completed_successfully` | Waits for that container to **run to completion with exit code 0** — used for one-shot migration containers |

Example using `service_completed_successfully` for a migration init container:
```yaml
services:
  migrate:
    build: .
    command: npm run migrate
    depends_on:
      db:
        condition: service_healthy

  app:
    build: .
    depends_on:
      migrate:
        condition: service_completed_successfully
```

**Additional strategy (defense in depth):** even with a healthcheck, the app should still have **DB connection retry logic** (exponential backoff), because:
- Healthchecks have an `interval`, so there's inherent delay between the actual check and when Compose observes the state.
- In Kubernetes (which has no Compose-style `depends_on`), application-level retry logic is **mandatory**, not optional.

**Gotcha:** `depends_on` only applies **within the same Compose file/project** — it can't control ordering across separate Compose stacks or services running outside Compose.
