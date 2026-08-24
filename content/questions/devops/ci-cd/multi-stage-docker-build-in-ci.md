---
id: multi-stage-docker-build-in-ci
position: devops
technology: ci-cd
level: mid
tags: [docker, containerization, build-optimization]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Multi-stage Docker build là gì và vì sao nên dùng trong CI pipeline? Cho ví dụ cụ thể với một ứng dụng Node.js hoặc Go.

## Question (EN)
What is a multi-stage Docker build, and why should you use it in a CI pipeline? Give a concrete example with a Node.js or Go application.

## Đáp án chi tiết (VI)
**Multi-stage build** cho phép dùng nhiều `FROM` trong một Dockerfile, mỗi stage có thể dùng base image khác nhau, và stage sau chỉ copy những gì cần thiết từ stage trước — thay vì đóng gói toàn bộ toolchain build (compiler, dev dependency) vào image production cuối cùng.

**Vấn đề nếu KHÔNG dùng multi-stage:**
```dockerfile
# Cách làm sai (single-stage) - image production kèm theo toàn bộ build tool
FROM node:20
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
CMD ["node", "dist/server.js"]
```
Image này chứa devDependencies, source TypeScript gốc, npm cache, build tool — kích thước có thể lên tới 1GB+ dù ứng dụng thực chạy chỉ cần vài file JS đã compile. Điều này làm chậm pull image, tăng bề mặt tấn công bảo mật (nhiều package không cần thiết = nhiều CVE tiềm ẩn).

**Với multi-stage build:**
```dockerfile
# Stage 1: build - có đầy đủ toolchain
FROM node:20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: production - chỉ copy artifact cần thiết
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
USER node
CMD ["node", "dist/server.js"]
```

**Ví dụ với Go (hiệu quả rõ rệt hơn vì Go compile ra binary tĩnh):**
```dockerfile
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server .

FROM scratch
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]
```
Image cuối dùng `scratch` (base image trống hoàn toàn) — chỉ chứa 1 binary tĩnh, kích thước có thể chỉ vài MB thay vì hàng trăm MB nếu dùng `golang:1.22` làm base cho production.

**Lợi ích trong CI pipeline:**

| Lợi ích | Giải thích |
|---|---|
| **Image nhỏ hơn** | Deploy nhanh hơn, pull image nhanh hơn (quan trọng với rolling update/autoscaling) |
| **Bảo mật tốt hơn** | Ít package = ít CVE bề mặt tấn công; không có compiler/shell trong image production (khó bị exploit nếu container bị chiếm) |
| **Tách biệt rõ ràng build vs runtime** | Dev dependency, test tool không lẫn vào runtime, giảm rủi ro leak thông tin build |
| **Tận dụng cache tốt hơn** | Mỗi stage cache độc lập; sửa code app không invalidate cache của stage cài dependency |
| **Một Dockerfile cho nhiều mục đích** | Có thể build target riêng cho test (`docker build --target=builder`) và production (`docker build --target=production`) |

**Trong CI, build với target cụ thể:**
```yaml
- run: docker build --target=builder -t app:test .
- run: docker run app:test npm test
- run: docker build --target=production -t app:${{ github.sha }} .
```

**Pitfall thường gặp:**
- Quên `COPY --from=builder` đúng path, dẫn đến thiếu file cần thiết ở runtime (lỗi "module not found" chỉ xuất hiện ở production, không xuất hiện lúc build).
- Copy cả `node_modules` build-time (bao gồm devDependencies) sang stage production thay vì chạy `npm ci --production` riêng ở stage cuối — vẫn làm phình image dù có multi-stage.
- Dùng `scratch`/`distroless` cho ứng dụng cần debug (không có shell) — khó `kubectl exec` vào container khi cần troubleshoot; cân nhắc `distroless` với debug tag khi cần.

## Detailed Answer (EN)
A **multi-stage build** allows multiple `FROM` statements in one Dockerfile, each stage potentially using a different base image, with later stages copying only what they need from earlier ones — instead of packaging the entire build toolchain (compiler, dev dependencies) into the final production image.

**The problem without multi-stage:**
```dockerfile
# Wrong approach (single-stage) - production image ships with the whole build toolchain
FROM node:20
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
CMD ["node", "dist/server.js"]
```
This image contains devDependencies, the original TypeScript source, npm cache, and build tools — potentially 1GB+ even though the app only needs a handful of compiled JS files at runtime. This slows image pulls and increases the security attack surface (more unnecessary packages = more potential CVEs).

**With multi-stage build:**
```dockerfile
# Stage 1: build - has the full toolchain
FROM node:20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: production - only copies what's needed
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
USER node
CMD ["node", "dist/server.js"]
```

**Go example (an even more dramatic improvement since Go compiles to a static binary):**
```dockerfile
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server .

FROM scratch
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]
```
The final image uses `scratch` (a completely empty base image) — containing only one static binary, potentially just a few MB instead of hundreds of MB if `golang:1.22` were used as the production base.

**Benefits in a CI pipeline:**

| Benefit | Explanation |
|---|---|
| **Smaller image** | Faster deploys, faster image pulls (important for rolling updates/autoscaling) |
| **Better security** | Fewer packages = smaller CVE attack surface; no compiler/shell in the production image (harder to exploit if the container is compromised) |
| **Clear separation of build vs runtime** | Dev dependencies and test tools never leak into runtime, reducing risk of build info leaking |
| **Better cache utilization** | Each stage caches independently; changing app code doesn't invalidate the dependency-install stage's cache |
| **One Dockerfile, multiple purposes** | Build a separate target for testing (`docker build --target=builder`) vs production (`docker build --target=production`) |

**In CI, build a specific target:**
```yaml
- run: docker build --target=builder -t app:test .
- run: docker run app:test npm test
- run: docker build --target=production -t app:${{ github.sha }} .
```

**Common pitfalls:**
- Forgetting the correct path in `COPY --from=builder`, leading to missing files at runtime (a "module not found" error only surfaces in production, not during the build).
- Copying build-time `node_modules` (including devDependencies) into the production stage instead of running `npm ci --production` separately in the final stage — still bloating the image despite using multi-stage.
- Using `scratch`/`distroless` for an application that needs debugging (no shell) — makes `kubectl exec` into the container impossible when troubleshooting; consider a `distroless` debug tag variant when needed.