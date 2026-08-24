---
id: em-truyen-token-private-registry-qua-arg-luc-build-vi-sao-cach-nay-lo-secret-va
position: backend
technology: secrets
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Em truyền token private registry qua `ARG` lúc build. Vì sao cách này lộ secret, và thay bằng gì?

## Question (EN)
I pass a private registry token via `ARG` at build time. Why does that leak the secret, and what should I use instead?

## Đáp án chi tiết (VI)
Vì `ARG` và mọi lệnh `RUN` đều được ghi vào **metadata của image**. Ai có image cũng đọc lại được:\
\
```bash\
docker history --no-trunc my-image     # shows the full RUN command with the token\
docker inspect my-image                # build args appear in the config\
```\
\
Xoá ở layer sau cũng vô ích: layer là **bất biến và cộng dồn**, file đã nằm ở layer trước thì vẫn tồn tại trong image.\
\
Cách đúng là **BuildKit secret mount** — secret chỉ tồn tại trong lúc chạy `RUN`, không ghi vào layer nào:\
\
```dockerfile\
# syntax=docker/dockerfile:1\
RUN --mount=type=secret,id=npmtoken \\\\\
    NPM_TOKEN=$(cat /run/secrets/npmtoken) npm ci\
```\
\
```bash\
docker build --secret id=npmtoken,env=NPM_TOKEN .\
```\
\
Còn secret **runtime** (DB password, API key) thì không bao giờ nhét vào image: truyền qua biến môi trường lúc `docker run`/Compose, hoặc lấy từ secret manager (Vault, AWS Secrets Manager, Kubernetes Secret). Image phải chạy được ở mọi môi trường mà không chứa cấu hình của môi trường nào.

## Detailed Answer (EN)
$84
