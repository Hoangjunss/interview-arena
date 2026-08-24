---
id: layer-va-build-cache-trong-docker-hoat-dong-the-nao
position: backend
technology: docker
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Layer và build cache trong Docker hoạt động thế nào?

## Question (EN)
How do Docker layers and the build cache work?

## Đáp án chi tiết (VI)
Mỗi instruction trong Dockerfile tạo một **layer** bất biến. Khi build lại, Docker **tái dùng cache** cho một layer nếu instruction và input của nó không đổi.\
\
- Cache **hỏng từ layer đầu tiên có thay đổi trở đi** — mọi layer phía sau phải build lại.\
- Vì vậy đặt phần **ít đổi lên trên**, phần **hay đổi xuống dưới**.\
\
Mẹo thường dùng với Node: `COPY package*.json` rồi `RUN npm install` **trước** khi `COPY . .`. Nhờ đó sửa mã nguồn không làm mất cache của bước cài dependency. Dùng `.dockerignore` để loại file thừa khỏi context.

## Detailed Answer (EN)
Each Dockerfile instruction creates an immutable **layer**. On rebuild, Docker **reuses the cache** for a layer if its instruction and inputs are unchanged.\
\
- The cache **invalidates from the first changed layer onward** — every later layer rebuilds.\
- So put **rarely-changing steps on top**, **frequently-changing steps below**.\
\
Classic Node trick: `COPY package*.json` then `RUN npm install` **before** `COPY . .`. That way editing source code does not bust the dependency-install cache. Use `.dockerignore` to keep junk out of the build context.
