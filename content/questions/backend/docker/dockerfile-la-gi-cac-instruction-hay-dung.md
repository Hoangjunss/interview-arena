---
id: dockerfile-la-gi-cac-instruction-hay-dung
position: backend
technology: docker
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dockerfile là gì? Các instruction hay dùng?

## Question (EN)
What is a Dockerfile and what are the common instructions?

## Đáp án chi tiết (VI)
Dockerfile là file văn bản mô tả **từng bước build một image**. Docker đọc tuần tự các instruction để tạo layer.\
\
- **`FROM`**: image nền (base image).\
- **`WORKDIR`**: thư mục làm việc trong image.\
- **`COPY` / `ADD`**: chép file từ context vào image.\
- **`RUN`**: chạy lệnh lúc build (cài package, biên dịch).\
- **`ENV`**: đặt biến môi trường.\
- **`EXPOSE`**: khai báo port (mang tính tài liệu).\
- **`CMD`** vs **`ENTRYPOINT`**: lệnh chạy khi container start — `ENTRYPOINT` là lệnh cố định, `CMD` là tham số mặc định có thể ghi đè.\
\
`RUN` chạy lúc **build**, `CMD`/`ENTRYPOINT` chạy lúc **run** — đây là điểm hay bị hỏi.

## Detailed Answer (EN)
A Dockerfile is a text file describing **each step to build an image**. Docker reads the instructions in order, creating layers.\
\
- **`FROM`**: the base image.\
- **`WORKDIR`**: working directory inside the image.\
- **`COPY` / `ADD`**: copy files from the build context into the image.\
- **`RUN`**: execute a command at build time (install packages, compile).\
- **`ENV`**: set environment variables.\
- **`EXPOSE`**: document a port.\
- **`CMD`** vs **`ENTRYPOINT`**: the start command — `ENTRYPOINT` is the fixed executable, `CMD` provides default, overridable arguments.\
\
`RUN` runs at **build** time, `CMD`/`ENTRYPOINT` at **run** time — a common follow-up.
