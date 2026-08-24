---
id: docker-healthcheck-instruction
position: devops
technology: docker
level: junior
tags: [docker, healthcheck]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`HEALTHCHECK` trong Dockerfile dùng để làm gì? Nó khác gì so với việc container chỉ đơn giản đang ở trạng thái "Running"?

## Question (EN)
What is `HEALTHCHECK` in a Dockerfile for? How is it different from a container simply being "Running"?

## Đáp án chi tiết (VI)
`HEALTHCHECK` định nghĩa một lệnh Docker sẽ **định kỳ chạy bên trong container** để kiểm tra xem ứng dụng có thực sự **khỏe mạnh (healthy)** hay không, chứ không chỉ là process còn sống.

**Vấn đề nó giải quyết:** trạng thái `Running` chỉ cho biết **PID 1 chưa thoát** — không đảm bảo app đã sẵn sàng nhận request. Ví dụ: một Java app đang `Running` nhưng vẫn đang khởi động Spring context (mất 30s), hoặc app bị deadlock/treo nhưng process chưa crash — cả hai trường hợp này Docker vẫn báo `Running` dù thực tế app không dùng được.

Cú pháp:
```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1
```
- `--interval`: khoảng cách giữa 2 lần check (mặc định 30s).
- `--timeout`: thời gian tối đa cho 1 lần check trước khi coi là fail.
- `--start-period`: thời gian "ân hạn" lúc mới start, fail trong giai đoạn này không tính vào số lần retry (hữu ích cho app khởi động chậm).
- `--retries`: số lần fail liên tiếp trước khi đánh dấu container là `unhealthy`.
- Lệnh check phải **exit code 0** (healthy), **1** (unhealthy), hoặc **2** (reserved, không dùng).

Kiểm tra trạng thái:
```bash
docker ps                       # cột STATUS hiện "Up 2 minutes (healthy)" hoặc "(unhealthy)"
docker inspect --format='{{json .State.Health}}' my-app | jq
```

**Tại sao quan trọng trong production/orchestration:**
- Docker Compose: `depends_on` có thể chờ tới khi service phụ thuộc **healthy** rồi mới start service tiếp theo:
```yaml
services:
  app:
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5
```
- Trong Kubernetes, `HEALTHCHECK` của Docker image **không được K8s dùng trực tiếp** — K8s có cơ chế riêng là `livenessProbe`/`readinessProbe` khai báo trong Pod spec, độc lập với Dockerfile.
- Load balancer/orchestrator (Swarm, ECS...) dựa vào trạng thái `unhealthy` để **tự động restart hoặc loại container ra khỏi traffic**, tránh gửi request tới instance đang lỗi.

**Gotcha:** nếu binary dùng để check (`curl`, `wget`) không có trong image (ví dụ base `alpine` tối giản hoặc `distroless`), HEALTHCHECK sẽ luôn fail vì lệnh không chạy được — cần cài thêm hoặc dùng cách check khác (ví dụ chương trình tự viết bằng ngôn ngữ có sẵn trong image).

## Detailed Answer (EN)
`HEALTHCHECK` defines a command Docker will **periodically run inside the container** to check whether the application is actually **healthy**, not just whether the process is alive.

**Problem it solves:** the `Running` state only tells you **PID 1 hasn't exited** — it doesn't guarantee the app is ready to serve requests. Example: a Java app is `Running` but still bootstrapping its Spring context (takes 30s), or the app is deadlocked/hung but the process hasn't crashed — in both cases Docker still reports `Running` even though the app is unusable.

Syntax:
```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1
```
- `--interval`: time between checks (default 30s).
- `--timeout`: max time for one check before it's considered failed.
- `--start-period`: grace period at startup; failures during this window don't count toward retries (useful for slow-starting apps).
- `--retries`: number of consecutive failures before marking the container `unhealthy`.
- The check command must exit with **0** (healthy), **1** (unhealthy), or **2** (reserved, unused).

Checking status:
```bash
docker ps                       # STATUS column shows "Up 2 minutes (healthy)" or "(unhealthy)"
docker inspect --format='{{json .State.Health}}' my-app | jq
```

**Why it matters in production/orchestration:**
- Docker Compose: `depends_on` can wait until a dependency is **healthy** before starting the next service:
```yaml
services:
  app:
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5
```
- In Kubernetes, a Docker image's `HEALTHCHECK` **is not used directly by K8s** — K8s has its own mechanism, `livenessProbe`/`readinessProbe`, declared in the Pod spec independently of the Dockerfile.
- Load balancers/orchestrators (Swarm, ECS...) use `unhealthy` status to **automatically restart or remove a container from traffic**, avoiding routing requests to a broken instance.

**Gotcha:** if the binary used for the check (`curl`, `wget`) isn't present in the image (e.g., a minimal `alpine` base or `distroless`), the HEALTHCHECK will always fail because the command can't run — you'd need to install it or write the check differently, using whatever runtime is already available in the image.
