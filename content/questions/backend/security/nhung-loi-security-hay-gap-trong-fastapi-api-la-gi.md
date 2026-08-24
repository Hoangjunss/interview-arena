---
id: nhung-loi-security-hay-gap-trong-fastapi-api-la-gi
position: backend
technology: security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những lỗi security hay gặp trong FastAPI API là gì?

## Question (EN)
What security mistakes are common in FastAPI APIs?

## Đáp án chi tiết (VI)
Các lỗi hay gặp: expose field nhạy cảm vì thiếu response model, wildcard CORS với credentials, JWT expiry quá dài, thiếu rate limit, thiếu authorization ở object-level, log token/PII, upload file không giới hạn, và tin header từ proxy khi chưa cấu hình trusted proxy.\
\
Cách phòng tránh: schema response rõ, dependency auth/permission dùng lại, secret manager, security headers ở reverse proxy, request size limit, rate limiting, audit log và test negative cases cho endpoint quan trọng.

## Detailed Answer (EN)
Common mistakes: exposing sensitive fields due to missing response models, wildcard CORS with credentials, too-long JWT expiry, no rate limiting, missing object-level authorization, logging tokens/PII, unlimited file uploads, and trusting proxy headers without trusted proxy configuration.\
\
Mitigate with explicit response schemas, reusable auth/permission dependencies, secret managers, security headers at the reverse proxy, request size limits, rate limiting, audit logs and negative tests for important endpoints.
