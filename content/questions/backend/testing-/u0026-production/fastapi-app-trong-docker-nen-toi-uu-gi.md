---
id: fastapi-app-trong-docker-nen-toi-uu-gi
position: backend
technology: testing-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI app trong Docker nên tối ưu gì?

## Question (EN)
What should you optimize for a FastAPI app in Docker?

## Đáp án chi tiết (VI)
Docker image nên dùng base image rõ version, cài dependency có cache tốt, không chạy bằng root nếu không cần, copy source sau dependency để tận dụng layer cache, và expose healthcheck endpoint.\
\
Ví dụ command phổ biến:\
```\
CMD [\\"fastapi\\

## Detailed Answer (EN)
The Docker image should use a pinned base image, install dependencies with good cache behavior, avoid root when possible, copy source after dependencies to reuse layers, and expose a healthcheck endpoint.\
\
Common command example:\
```\
CMD [\\"fastapi\\
