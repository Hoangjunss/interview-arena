---
id: environment-variables-va-secrets-trong-docker-compose-nen-xu-ly-the-nao
position: backend
technology: compose-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Environment variables và secrets trong Docker/Compose nên xử lý thế nào?

## Question (EN)
How should environment variables and secrets be handled in Docker/Compose?

## Đáp án chi tiết (VI)
Env vars phù hợp cấu hình không nhạy cảm hoặc secret đã được inject từ secret manager. Không nên commit `.env` chứa production secrets. Với Compose, có thể dùng `env_file` cho local và secrets/file mount cho dữ liệu nhạy cảm.\
\
Ví dụ Compose local:\
```yaml\
services:\
  api:\
    image: my-api\
    env_file:\
      - .env.local\
    environment:\
      NODE_ENV: development\
```\
Production nên dùng secret manager của platform, rotation policy và least privilege. Image không được chứa secret baked-in ở build time.

## Detailed Answer (EN)
Environment variables fit non-sensitive configuration or secrets injected from a secret manager. Do not commit `.env` files with production secrets. With Compose, `env_file` can be used for local development and secrets/file mounts for sensitive data.\
\
Local Compose example:\
```yaml\
services:\
  api:\
    image: my-api\
    env_file:\
      - .env.local\
    environment:\
      NODE_ENV: development\
```\
Production should use the platform secret manager, rotation policy and least privilege. Images must not contain secrets baked in at build time.
