---
id: dockerfile-security-hardening
position: devops
technology: security-devsecops
level: mid
tags: [docker, container-security, dockerfile]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Review đoạn Dockerfile sau và chỉ ra các vấn đề bảo mật, đề xuất cách sửa:
```dockerfile
FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install
ENV DB_PASSWORD=supersecret123
EXPOSE 3000
CMD ["node", "server.js"]
```

## Question (EN)
Review the following Dockerfile, identify the security issues, and propose fixes:
```dockerfile
FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install
ENV DB_PASSWORD=supersecret123
EXPOSE 3000
CMD ["node", "server.js"]
```

## Đáp án chi tiết (VI)
**Danh sách vấn đề và cách sửa:**

**1. `FROM node:latest` — base image không pin version:**
- `latest` thay đổi theo thời gian, build hôm nay khác build ngày mai (không reproducible), có thể vô tình kéo về bản có breaking change hoặc CVE mới.
- **Sửa:** pin version cụ thể, và ưu tiên bản `-slim`/`-alpine` để giảm attack surface:
```dockerfile
FROM node:20.11.1-alpine3.19
```

**2. Chạy container bằng `root` (mặc định khi không khai báo `USER`):**
- Nếu ứng dụng bị exploit (RCE), kẻ tấn công có quyền root ngay trong container — dễ dàng leo thang nếu container có misconfiguration khác (VD: mount `/var/run/docker.sock`, hoặc kernel có lỗ hổng container escape).
- **Sửa:** tạo user riêng, chạy ứng dụng bằng user không có quyền root:
```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

**3. `ENV DB_PASSWORD=supersecret123` — secret bị bake cứng vào image:**
- Đây là lỗi nghiêm trọng nhất: secret nằm vĩnh viễn trong mọi layer của image, ai có quyền `docker history`/`docker inspect` hoặc pull image đều đọc được, kể cả sau khi "xoá" ở Dockerfile version sau (layer cũ vẫn tồn tại trong image cache/registry).
```bash
docker history myapp:1.0 --no-trunc | grep DB_PASSWORD
docker inspect myapp:1.0 | grep -A2 Env
```
- **Sửa:** không bao giờ đặt secret trong `ENV`/`ARG` của Dockerfile. Inject lúc runtime qua:
```dockerfile
# Không set secret trong Dockerfile
# Runtime: docker run -e DB_PASSWORD=$(vault read -field=password secret/db) myapp
```
Hoặc tốt hơn — dùng Docker secrets/K8s Secret mount dưới dạng file, không qua env var, để tránh bị lộ qua `/proc/<pid>/environ` hay log crash dump.

**4. `COPY . /app` — copy toàn bộ context, có thể chứa file nhạy cảm:**
- Nếu không có `.dockerignore`, file như `.env`, `.git`, `node_modules` cũ, private key test đều bị copy vào image.
- **Sửa:** thêm `.dockerignore`:
```
.env
.git
node_modules
*.pem
```

**5. `RUN npm install` — không dùng lockfile, cài phiên bản không xác định:**
- Không đảm bảo build reproducible, dễ dính supply-chain attack qua version mới bị compromise.
- **Sửa:**
```dockerfile
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
```

**6. Không dùng multi-stage build — image cuối cùng chứa cả build tool không cần thiết:**
- `npm install` có thể cần build tool (gcc, python cho native module) không cần thiết lúc runtime, làm tăng attack surface và kích thước image không cần thiết.
- **Sửa:**
```dockerfile
# Stage 1: build
FROM node:20.11.1-alpine3.19 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Stage 2: runtime tối giản
FROM node:20.11.1-alpine3.19
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder --chown=appuser:appgroup /app .
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

**Dockerfile hoàn chỉnh sau khi sửa:**
```dockerfile
FROM node:20.11.1-alpine3.19 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .

FROM node:20.11.1-alpine3.19
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder --chown=appuser:appgroup /app .
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

**Bước tiếp theo trong pipeline:** chạy `trivy image` hoặc `hadolint` (linter chuyên cho Dockerfile) trên bản đã sửa để xác nhận không còn misconfiguration/CVE nào trước khi push lên registry.

## Detailed Answer (EN)
**Issues and fixes:**

**1. `FROM node:latest` — base image not pinned:**
- `latest` changes over time, so today's build differs from tomorrow's (non-reproducible), and can silently pull in a version with breaking changes or new CVEs.
- **Fix:** pin an exact version, preferring a `-slim`/`-alpine` variant to reduce attack surface:
```dockerfile
FROM node:20.11.1-alpine3.19
```

**2. Running as `root` (the default when `USER` isn't declared):**
- If the app is exploited (RCE), the attacker gets root inside the container right away — easy to escalate further if other misconfigurations exist (e.g., mounting `/var/run/docker.sock`, or a kernel vulnerability enabling container escape).
- **Fix:** create a dedicated user and run the app as non-root:
```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

**3. `ENV DB_PASSWORD=supersecret123` — secret baked into the image:**
- This is the most severe issue: the secret persists forever in every layer of the image; anyone with `docker history`/`docker inspect` access, or who pulls the image, can read it — even after "removing" it in a later Dockerfile version (the old layer still exists in the image cache/registry).
```bash
docker history myapp:1.0 --no-trunc | grep DB_PASSWORD
docker inspect myapp:1.0 | grep -A2 Env
```
- **Fix:** never place secrets in a Dockerfile's `ENV`/`ARG`. Inject at runtime instead:
```dockerfile
# No secret set in the Dockerfile
# Runtime: docker run -e DB_PASSWORD=$(vault read -field=password secret/db) myapp
```
Better still — use Docker secrets/K8s Secret mounted as a file rather than an env var, avoiding exposure via `/proc/<pid>/environ` or crash-dump logs.

**4. `COPY . /app` — copies the entire build context, potentially including sensitive files:**
- Without a `.dockerignore`, files like `.env`, `.git`, stale `node_modules`, or test private keys all get copied into the image.
- **Fix:** add a `.dockerignore`:
```
.env
.git
node_modules
*.pem
```

**5. `RUN npm install` — no lockfile, installs undetermined versions:**
- Doesn't guarantee a reproducible build, and increases exposure to a supply-chain attack via a newly compromised version.
- **Fix:**
```dockerfile
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
```

**6. No multi-stage build — the final image carries unnecessary build tools:**
- `npm install` may need build tools (gcc, python for native modules) unnecessary at runtime, needlessly increasing attack surface and image size.
- **Fix:**
```dockerfile
# Stage 1: build
FROM node:20.11.1-alpine3.19 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Stage 2: minimal runtime
FROM node:20.11.1-alpine3.19
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder --chown=appuser:appgroup /app .
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

**Fully corrected Dockerfile:**
```dockerfile
FROM node:20.11.1-alpine3.19 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .

FROM node:20.11.1-alpine3.19
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder --chown=appuser:appgroup /app .
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

**Next pipeline step:** run `trivy image` or `hadolint` (a Dockerfile-specific linter) against the fixed version to confirm no remaining misconfigurations/CVEs before pushing to the registry.
