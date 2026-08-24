---
id: docker-layer-caching
position: devops
technology: docker
level: junior
tags: [docker, dockerfile, performance]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker layer caching hoạt động như thế nào? Làm sao viết Dockerfile để tận dụng cache hiệu quả?

## Question (EN)
How does Docker layer caching work? How do you write a Dockerfile to take advantage of it effectively?

## Đáp án chi tiết (VI)
Mỗi instruction trong Dockerfile (chủ yếu là `RUN`, `COPY`, `ADD`) tạo ra một **layer** riêng, và layer được lưu cache dựa trên: nội dung instruction + checksum của các file liên quan (với COPY/ADD) + layer cha ngay trước đó. Khi build lại, Docker duyệt từ trên xuống: nếu một layer **không đổi** (cùng instruction, cùng input) thì dùng lại cache; ngay khi có **một layer bị invalidate**, mọi layer phía sau nó đều phải build lại, dù nội dung của chúng không đổi.

Vì vậy thứ tự instruction cực kỳ quan trọng. So sánh hai cách viết:

**Cách sai (cache kém hiệu quả):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .                 # copy toàn bộ source — invalidate mỗi khi sửa 1 dòng code
RUN npm install           # phải chạy lại install mỗi lần build, dù package.json không đổi
CMD ["node", "server.js"]
```
Chỉ cần sửa 1 file `.js` bất kỳ, layer `COPY . .` bị invalidate → layer `RUN npm install` phía sau cũng phải chạy lại, tốn vài chục giây tới vài phút mỗi lần build.

**Cách đúng (tách dependency ra khỏi source code):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./      # chỉ invalidate khi package.json/lock thay đổi
RUN npm ci --omit=dev       # cache được tái sử dụng hầu hết các lần build
COPY . .                    # copy source sau cùng
CMD ["node", "server.js"]
```
Với cách này, `npm ci` chỉ chạy lại khi `package.json`/`package-lock.json` đổi — sửa code business logic không ảnh hưởng tới layer cài dependency.

**Các kỹ thuật khác để tối ưu cache:**
- Đặt các instruction **ít thay đổi nhất lên trên** (base image, cài OS packages), **thay đổi nhiều nhất xuống dưới** (copy source code).
- Dùng `.dockerignore` để tránh copy file không cần thiết (node_modules, .git, log) làm sai lệch checksum.
- Trong CI, dùng `--cache-from` hoặc BuildKit cache (`docker buildx build --cache-to=type=registry,ref=...`) để tái sử dụng cache giữa các build agent khác nhau (vì cache local thường mất khi agent là ephemeral).
- Gộp nhiều `RUN apt-get update && apt-get install` vào **một RUN duy nhất** để tránh layer `update` bị cache cũ trong khi `install` chạy version mới — gây lỗi package không tồn tại.

**Edge case:** cache có thể "false positive" khi build trên máy khác nhau (khác kiến trúc CPU, khác Docker version) — CI/CD nên luôn build trên môi trường nhất quán hoặc dùng multi-platform buildx cache riêng cho từng platform.

## Detailed Answer (EN)
Each Dockerfile instruction (mainly `RUN`, `COPY`, `ADD`) produces its own **layer**, cached based on: the instruction's content + a checksum of referenced files (for COPY/ADD) + the parent layer right before it. On rebuild, Docker walks top to bottom: if a layer is **unchanged** (same instruction, same input) the cache is reused; as soon as **one layer is invalidated**, every layer after it must rebuild, even if their own content didn't change.

So instruction order matters a lot. Compare:

**Bad (poor cache reuse):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .                 # copies all source — invalidated on any code edit
RUN npm install            # reruns install every build, even if package.json is unchanged
CMD ["node", "server.js"]
```
Editing any single `.js` file invalidates the `COPY . .` layer, which cascades into re-running `RUN npm install` — costing tens of seconds to minutes per build.

**Good (dependencies separated from source):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./      # invalidated only when package.json/lock changes
RUN npm ci --omit=dev        # cache reused on most builds
COPY . .                     # source copied last
CMD ["node", "server.js"]
```
Here `npm ci` only reruns when `package.json`/`package-lock.json` change — editing business logic doesn't touch the dependency-install layer.

**Other cache optimization techniques:**
- Put the **least frequently changing** instructions first (base image, OS packages), and the **most frequently changing** ones last (source code copy).
- Use `.dockerignore` to avoid copying unnecessary files (node_modules, .git, logs) that would shift checksums unexpectedly.
- In CI, use `--cache-from` or BuildKit registry cache (`docker buildx build --cache-to=type=registry,ref=...`) to share cache across ephemeral build agents that don't retain local Docker state.
- Combine multiple `apt-get update && apt-get install` calls into **one single RUN** to avoid a stale cached `update` layer paired with a freshly-run `install` — which can fail with "package not found".

**Edge case:** cache can produce false positives across machines with different CPU architecture or Docker versions — CI/CD should build on a consistent environment or use per-platform buildx cache when doing multi-platform builds.
