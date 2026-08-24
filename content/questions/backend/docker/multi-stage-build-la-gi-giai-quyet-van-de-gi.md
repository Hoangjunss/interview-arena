---
id: multi-stage-build-la-gi-giai-quyet-van-de-gi
position: backend
technology: docker
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Multi-stage build là gì? Giải quyết vấn đề gì?

## Question (EN)
What is a multi-stage build and what problem does it solve?

## Đáp án chi tiết (VI)
Multi-stage build dùng **nhiều `FROM`** trong một Dockerfile: stage đầu để **build** (có compiler, dev dependency), stage cuối chỉ **`COPY --from`** phần artifact cần thiết sang một base image gọn.\
\
- Kết quả: image cuối **không chứa** toolchain, source hay dev dependency → **nhỏ hơn và bề mặt tấn công ít hơn**.\
- Ví dụ Go: stage 1 `go build` ra binary; stage 2 `FROM alpine` chỉ chép binary. Với Node/Java tương tự (build ở stage 1, copy `dist`/`jar` sang stage runtime).\
\
Đây là cách chuẩn để có image production gọn mà vẫn giữ bước build đầy đủ.\
\
```dockerfile\
FROM golang:1.22 AS builder\
WORKDIR /src\
COPY . .\
RUN go build -o /app\
\
FROM alpine:3.20\
COPY --from=builder /app /app\
ENTRYPOINT [\\"/app\\"]\
```

## Detailed Answer (EN)
A multi-stage build uses **several `FROM`** stages in one Dockerfile: an early stage to **build** (compiler, dev dependencies), and a final stage that only **`COPY --from`** the needed artifact into a slim base image.\
\
- Result: the final image **excludes** the toolchain, source and dev dependencies → **smaller and a smaller attack surface**.\
- Go example: stage 1 runs `go build`; stage 2 `FROM alpine` copies just the binary. Node/Java are similar (build in stage 1, copy `dist`/`jar` to the runtime stage).\
\
This is the standard way to get a lean production image while keeping the full build step.\
\
```dockerfile\
FROM golang:1.22 AS builder\
WORKDIR /src\
COPY . .\
RUN go build -o /app\
\
FROM alpine:3.20\
COPY --from=builder /app /app\
ENTRYPOINT [\\"/app\\"]\
```
