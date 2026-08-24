---
id: docker-non-root-user-security
position: devops
technology: docker
level: mid
tags: [docker, security]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không nên chạy container với user `root`? Làm sao cấu hình Dockerfile để chạy bằng non-root user?

## Question (EN)
Why shouldn't containers run as `root`? How do you configure a Dockerfile to run as a non-root user?

## Đáp án chi tiết (VI)
Mặc định, nếu Dockerfile không chỉ định `USER`, process trong container chạy với **UID 0 (root)** — root **bên trong container**, không phải root thật của host, nhưng vẫn có rủi ro đáng kể:

1. **Container escape**: nếu có lỗ hổng trong container runtime hoặc kernel (privilege escalation), process root bên trong container dễ leo thang thành root trên **host** hơn process non-root.
2. **Bind mount nguy hiểm hơn**: nếu container root ghi vào một volume/bind mount, file được tạo ra sẽ **thuộc sở hữu UID 0** trên host — có thể gây vấn đề quyền truy cập hoặc bị lợi dụng nếu host cũng chạy process root đọc thư mục đó.
3. **Vi phạm nguyên tắc Least Privilege**: nếu ứng dụng bị compromise (ví dụ RCE qua lỗ hổng thư viện), attacker có toàn quyền trong container (cài package, đọc/ghi mọi file) thay vì bị giới hạn.
4. **Kubernetes Pod Security Standards** (baseline/restricted) và nhiều compliance framework (CIS Docker Benchmark) **yêu cầu** container không chạy root.

**Cách cấu hình non-root user trong Dockerfile:**
```dockerfile
FROM node:20-alpine

# Tạo user/group riêng (nhiều base image official đã có sẵn user "node")
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --chown=appuser:appgroup . .

RUN npm ci --only=production

USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

Nhiều official image đã có sẵn user non-root, chỉ cần khai báo `USER`:
```dockerfile
FROM node:20-alpine
...
USER node        # user "node" đã có sẵn trong image chính thức
```

**Xử lý bind port < 1024:** trên Linux, chỉ root mới được bind port dưới 1024 theo mặc định — non-root user không thể `listen` trên port 80/443 trực tiếp. Giải pháp:
- Cho app listen port cao (ví dụ 8080), rồi map ra port 80 bằng `-p 80:8080` hoặc qua reverse proxy/load balancer.
- Hoặc cấp capability `CAP_NET_BIND_SERVICE` riêng cho binary mà không cần full root:
```dockerfile
RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/node
USER appuser
```

**Kiểm tra image đã chạy đúng non-root chưa:**
```bash
docker run --rm myapp id
# uid=1000(appuser) gid=1000(appgroup) — đúng, không phải uid=0(root)
```

**Gotcha:**
- Đặt `USER` **trước** một lệnh `RUN` cần quyền ghi vào thư mục hệ thống (ví dụ cài package qua `apt-get`) sẽ khiến lệnh đó fail vì thiếu quyền — thứ tự đúng là: làm mọi việc cần root (cài đặt, cấu hình hệ thống) trước, rồi mới `USER appuser` **ở gần cuối** Dockerfile.
- `docker run --user 1000:1000` có thể override `USER` trong image lúc runtime, nhưng nếu ứng dụng ghi log/cache vào thư mục chỉ root mới có quyền, vẫn sẽ lỗi permission — cần đảm bảo `COPY --chown` hoặc `RUN chown` đúng cho các thư mục app cần ghi.
- Non-root không đồng nghĩa an toàn tuyệt đối — vẫn nên kết hợp thêm `--cap-drop=ALL`, `--read-only` filesystem, và seccomp/AppArmor profile để phòng thủ theo lớp (defense in depth).

## Detailed Answer (EN)
By default, if a Dockerfile doesn't specify `USER`, the process inside the container runs as **UID 0 (root)** — root **inside the container**, not the host's real root, but still carries meaningful risk:

1. **Container escape**: if there's a vulnerability in the container runtime or kernel (privilege escalation), a root process inside the container has an easier path to escalating to root **on the host** than a non-root process would.
2. **Riskier bind mounts**: if a root container writes to a volume/bind mount, the created files are **owned by UID 0** on the host — potentially causing permission issues or being exploitable if the host also has a root process reading that directory.
3. **Violates Least Privilege**: if the app is compromised (e.g., RCE via a library vulnerability), the attacker gets full control inside the container (install packages, read/write anything) instead of being constrained.
4. **Kubernetes Pod Security Standards** (baseline/restricted) and many compliance frameworks (CIS Docker Benchmark) **require** non-root containers.

**Configuring a non-root user in a Dockerfile:**
```dockerfile
FROM node:20-alpine

# Create a dedicated user/group (many official base images already ship one)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --chown=appuser:appgroup . .

RUN npm ci --only=production

USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

Many official images already have a non-root user available — just declare `USER`:
```dockerfile
FROM node:20-alpine
...
USER node        # "node" user already exists in the official image
```

**Handling binding to ports < 1024:** on Linux, only root can bind to ports below 1024 by default — a non-root user can't `listen` directly on port 80/443. Solutions:
- Have the app listen on a high port (e.g., 8080), then map to port 80 via `-p 80:8080` or a reverse proxy/load balancer.
- Or grant the `CAP_NET_BIND_SERVICE` capability specifically to the binary without needing full root:
```dockerfile
RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/node
USER appuser
```

**Verifying the image runs non-root:**
```bash
docker run --rm myapp id
# uid=1000(appuser) gid=1000(appgroup) — correct, not uid=0(root)
```

**Gotchas:**
- Placing `USER` **before** a `RUN` step that needs write access to system directories (e.g., installing packages via `apt-get`) will make that step fail due to insufficient permissions — the correct order is: do everything requiring root (installation, system config) first, then `USER appuser` **near the end** of the Dockerfile.
- `docker run --user 1000:1000` can override the image's `USER` at runtime, but if the app writes logs/cache into a directory only root can write to, it will still error on permission — make sure `COPY --chown` or `RUN chown` correctly covers the directories the app needs to write.
- Non-root isn't a complete safety guarantee — combine it with `--cap-drop=ALL`, a `--read-only` filesystem, and a seccomp/AppArmor profile for defense in depth.
