---
id: dockerfile-arg-vs-env
position: devops
technology: docker
level: junior
tags: [docker, dockerfile]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `ARG` và `ENV` trong Dockerfile. Vì sao không nên dùng `ARG` để truyền secret?

## Question (EN)
Distinguish `ARG` and `ENV` in a Dockerfile. Why shouldn't you use `ARG` to pass secrets?

## Đáp án chi tiết (VI)
| | `ARG` | `ENV` |
|---|---|---|
| Phạm vi tồn tại | Chỉ trong **quá trình build**, không có trong container lúc runtime | Tồn tại cả lúc build **và** trong container lúc chạy |
| Cách set | `docker build --build-arg KEY=value` | Set cứng trong Dockerfile, hoặc override bằng `docker run -e` |
| Mục đích | Tham số hóa quá trình build (version, base image tag...) | Cấu hình runtime cho ứng dụng (`NODE_ENV`, `PORT`...) |

Ví dụ:
```dockerfile
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine

ARG BUILD_ENV=production
ENV NODE_ENV=${BUILD_ENV}

CMD ["node", "server.js"]
```
```bash
docker build --build-arg NODE_VERSION=20 --build-arg BUILD_ENV=staging -t myapp .
```
Ở đây `ARG` dùng để chọn version base image lúc build, còn `ENV NODE_ENV` được "gán" từ ARG nhưng sau đó **tồn tại vĩnh viễn trong image** — bất kỳ ai `docker inspect` hoặc `docker exec env` container đều thấy được.

**Vì sao không dùng `ARG` (hay `ENV`) để truyền secret (API key, DB password...):**
1. Giá trị `ARG` **lưu lại trong lịch sử build cache và trong image metadata** — chạy `docker history --no-trunc <image>` có thể thấy lại giá trị đã truyền qua `--build-arg`.
2. Nếu gán `ARG` vào `ENV`, secret sẽ nằm **vĩnh viễn trong layer** và bất kỳ ai có quyền pull image (hoặc `docker exec`) đều đọc được bằng `docker inspect` / `env`.
3. Ngay cả khi không gán vào ENV, giá trị ARG vẫn có thể lộ qua build log nếu lệnh RUN nào đó echo nó ra, hoặc lộ qua image layer nếu ARG được dùng trong RUN mà RUN đó ghi log ra file COPY vào image.

**Cách làm đúng để truyền secret khi build:**
```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm install
```
```bash
docker build --secret id=npmrc,src=$HOME/.npmrc -t myapp .
```
`--mount=type=secret` (BuildKit) đảm bảo secret chỉ tồn tại trong RAM của build step đó, **không** được ghi vào layer nào của image cuối cùng — đây là cách an toàn thay cho `ARG`/`ENV`.

## Detailed Answer (EN)
| | `ARG` | `ENV` |
|---|---|---|
| Lifetime | Only during the **build process**, not present in the container at runtime | Exists at both build time **and** container runtime |
| How to set | `docker build --build-arg KEY=value` | Hardcoded in the Dockerfile, or overridden with `docker run -e` |
| Purpose | Parameterize the build (version, base image tag...) | Runtime app configuration (`NODE_ENV`, `PORT`...) |

Example:
```dockerfile
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine

ARG BUILD_ENV=production
ENV NODE_ENV=${BUILD_ENV}

CMD ["node", "server.js"]
```
```bash
docker build --build-arg NODE_VERSION=20 --build-arg BUILD_ENV=staging -t myapp .
```
Here `ARG` selects the base image version at build time, while `ENV NODE_ENV` is "assigned" from the ARG but then **persists permanently in the image** — anyone who runs `docker inspect` or `docker exec env` on the container can see it.

**Why not use `ARG` (or `ENV`) to pass secrets (API keys, DB passwords...):**
1. `ARG` values are **stored in the build cache history and image metadata** — running `docker history --no-trunc <image>` can reveal values passed via `--build-arg`.
2. If you assign an `ARG` to an `ENV`, the secret is baked **permanently into a layer**, and anyone with pull access to the image (or `docker exec`) can read it via `docker inspect` / `env`.
3. Even without assigning to ENV, an ARG value can still leak through the build log if any RUN step echoes it, or leak into an image layer if it's used inside a RUN whose output gets COPYed.

**Correct way to pass build-time secrets:**
```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm install
```
```bash
docker build --secret id=npmrc,src=$HOME/.npmrc -t myapp .
```
`--mount=type=secret` (BuildKit) ensures the secret only exists in that build step's RAM and is **never** written to any layer of the final image — this is the safe replacement for `ARG`/`ENV`.
