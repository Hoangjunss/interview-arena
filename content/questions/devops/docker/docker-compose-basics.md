---
id: docker-compose-basics
position: devops
technology: docker
level: junior
tags: [docker, docker-compose]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker Compose là gì và giải quyết vấn đề gì? Viết ví dụ một file `docker-compose.yml` chạy app + database.

## Question (EN)
What is Docker Compose and what problem does it solve? Write an example `docker-compose.yml` running an app + database.

## Đáp án chi tiết (VI)
**Docker Compose** là công cụ định nghĩa và chạy **nhiều container liên quan nhau** (multi-container application) bằng **một file YAML khai báo**, thay vì phải gõ nhiều lệnh `docker run` dài dòng, thủ công tạo network, volume...

**Vấn đề nó giải quyết:**
- Không cần nhớ/gõ lại các flag `docker run` phức tạp (port, env, volume, network) mỗi lần chạy.
- Tự động tạo một **network riêng** cho các service trong cùng file, cho phép các container **gọi nhau bằng tên service** (DNS nội bộ do Docker cung cấp).
- Quản lý vòng đời cả nhóm container bằng một lệnh: `docker compose up`, `docker compose down`.
- Khai báo được thứ tự phụ thuộc cơ bản (`depends_on`), biến môi trường, resource limit, health check... trong một chỗ, dễ review, dễ version control (đưa vào Git).

Ví dụ file `docker-compose.yml` cho app Node.js + PostgreSQL:
```yaml
version: "3.9"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
```

Chạy:
```bash
docker compose up -d       # chạy nền cả 2 service
docker compose logs -f app # xem log riêng service app
docker compose down        # dừng và xóa container (giữ lại volume)
docker compose down -v     # dừng và xóa cả volume (mất data)
```

**Điểm cần lưu ý:**
- Trong code app, kết nối DB dùng **tên service `db`** làm hostname (`postgres://user:pass@db:5432/mydb`), không phải `localhost` — vì mỗi container có network namespace riêng, `localhost` bên trong container `app` không trỏ tới container `db`.
- `docker-compose` (chương trình Python độc lập, bản v1, đã deprecated) khác với `docker compose` (plugin viết bằng Go, tích hợp sẵn trong Docker CLI hiện tại) — nên dùng cú pháp `docker compose` (không gạch nối) cho các dự án mới.
- Compose phù hợp cho **dev/local/staging đơn giản**; khi cần scale nhiều instance, self-healing, rolling update trên nhiều host thì nên chuyển sang Kubernetes hoặc Docker Swarm.

## Detailed Answer (EN)
**Docker Compose** is a tool for defining and running **multiple related containers** (a multi-container application) using **one declarative YAML file**, instead of manually typing long `docker run` commands and manually creating networks/volumes.

**Problem it solves:**
- No need to remember/retype complex `docker run` flags (ports, env, volumes, networks) every time.
- Automatically creates a **dedicated network** for services in the same file, letting containers **call each other by service name** (built-in Docker DNS).
- Manages the lifecycle of the whole group with a single command: `docker compose up`, `docker compose down`.
- Declares basic dependency ordering (`depends_on`), env vars, resource limits, health checks, etc. in one place — easy to review and version-control in Git.

Example `docker-compose.yml` for a Node.js app + PostgreSQL:
```yaml
version: "3.9"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
```

Run:
```bash
docker compose up -d       # run both services in the background
docker compose logs -f app # tail logs for the app service only
docker compose down        # stop and remove containers (volumes kept)
docker compose down -v     # stop and remove containers AND volumes (data lost)
```

**Things to note:**
- In application code, connect to the DB using the **service name `db`** as the hostname (`postgres://user:pass@db:5432/mydb`), not `localhost` — each container has its own network namespace, so `localhost` inside the `app` container does not point to the `db` container.
- `docker-compose` (the standalone Python program, v1, now deprecated) is different from `docker compose` (the Go-based plugin built into modern Docker CLI) — use the `docker compose` (no hyphen) syntax for new projects.
- Compose is best suited for **simple dev/local/staging** setups; when you need multi-instance scaling, self-healing, or rolling updates across multiple hosts, move to Kubernetes or Docker Swarm.
