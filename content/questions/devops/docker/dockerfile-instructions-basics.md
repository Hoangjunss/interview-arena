---
id: dockerfile-instructions-basics
position: devops
technology: docker
level: junior
tags: [docker, dockerfile, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dockerfile là gì? Hãy giải thích các chỉ thị (instruction) cơ bản: FROM, RUN, COPY, CMD, ENTRYPOINT.

## Question (EN)
What is a Dockerfile? Explain the basic instructions: FROM, RUN, COPY, CMD, ENTRYPOINT.

## Đáp án chi tiết (VI)
**Dockerfile** là một file văn bản chứa danh sách các chỉ thị (instruction) mô tả cách build một Docker image từ một base image có sẵn.

Ví dụ một Dockerfile cho ứng dụng Node.js:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Giải thích từng chỉ thị:
- **FROM**: chọn base image (ví dụ `node:20-alpine`). Mỗi Dockerfile phải bắt đầu bằng FROM (trừ khi dùng `scratch`).
- **RUN**: thực thi lệnh **tại thời điểm build** và tạo ra một layer mới (ví dụ cài package). Mỗi RUN tạo một layer image mới, chỉ chạy một lần khi build.
- **COPY**: copy file/thư mục từ máy host vào image. Khác `ADD` ở chỗ COPY không tự giải nén tar hay tải URL — nên **ưu tiên COPY** trừ khi thực sự cần tính năng của ADD.
- **CMD**: định nghĩa lệnh **mặc định** chạy khi container khởi động, nhưng có thể bị **override** bởi tham số truyền vào `docker run` (ví dụ `docker run myimage echo hi` sẽ chạy `echo hi` thay vì CMD).
- **ENTRYPOINT**: cũng định nghĩa lệnh chạy khi container khởi động, nhưng **không** dễ bị override — tham số của `docker run` sẽ được **append** vào sau ENTRYPOINT (nếu dùng dạng exec `["..."]`).

**Kết hợp ENTRYPOINT + CMD** là pattern rất phổ biến: ENTRYPOINT là binary cố định, CMD là default arguments có thể thay đổi:
```dockerfile
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
```
Khi đó `docker run myimage -v` sẽ chạy `nginx -v` thay vì `nginx -g "daemon off;"`.

**Lỗi thường gặp:**
- Dùng dạng **shell form** (`CMD npm start`) thay vì **exec form** (`CMD ["npm", "start"]`) khiến process chạy dưới một shell trung gian (`/bin/sh -c`), làm PID 1 là shell chứ không phải app → signal (SIGTERM) không được forward đúng cách tới app khi container dừng.
- Đặt `COPY . .` trước `RUN npm install` làm mất tác dụng của layer caching (xem thêm câu hỏi về layer caching).

## Detailed Answer (EN)
A **Dockerfile** is a text file containing a list of instructions describing how to build a Docker image from a base image.

Example Dockerfile for a Node.js app:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Instruction breakdown:
- **FROM**: selects the base image (e.g. `node:20-alpine`). Every Dockerfile must start with FROM (unless using `scratch`).
- **RUN**: executes a command **at build time** and creates a new layer (e.g. installing packages). Each RUN produces a new image layer and only runs once, during build.
- **COPY**: copies files/directories from the host into the image. Differs from `ADD` in that COPY does not auto-extract tarballs or fetch URLs — **prefer COPY** unless you actually need ADD's extra behavior.
- **CMD**: defines the **default** command run when the container starts, but it can be **overridden** by arguments passed to `docker run` (e.g. `docker run myimage echo hi` runs `echo hi` instead of CMD).
- **ENTRYPOINT**: also defines the startup command, but is **not** easily overridden — `docker run` arguments are **appended** after it (when using exec form `["..."]`).

**Combining ENTRYPOINT + CMD** is a very common pattern: ENTRYPOINT is the fixed binary, CMD supplies default arguments that can be swapped:
```dockerfile
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
```
Then `docker run myimage -v` runs `nginx -v` instead of `nginx -g "daemon off;"`.

**Common pitfalls:**
- Using **shell form** (`CMD npm start`) instead of **exec form** (`CMD ["npm", "start"]`) makes the process run under an intermediate shell (`/bin/sh -c`), so PID 1 is the shell, not the app — signals (SIGTERM) then don't propagate correctly to the app when the container stops.
- Placing `COPY . .` before `RUN npm install` defeats layer caching (see the layer caching question for details).
