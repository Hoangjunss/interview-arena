---
id: put-va-patch-khac-nhau-the-nao-tinh-idempotent-cua-tung-method-ra-sao
position: backend
technology: api-\u0026-http
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PUT và PATCH khác nhau thế nào? Tính idempotent của từng method ra sao?

## Question (EN)
What is the difference between PUT and PATCH, and how idempotent is each?

## Đáp án chi tiết (VI)
- **PUT** = **thay cả bản ghi**: client phải gửi payload đầy đủ, field không gửi coi như bị xóa/reset (RFC 9110).\
- **PATCH** = **sửa một phần**: chỉ gửi field cần đổi (RFC 5789).\
\
```http\
PUT   /users/1   { \\"name\\": \\"An\\

## Detailed Answer (EN)
- **PUT** = **replace the whole record**: the client must send the full payload; omitted fields count as deleted/reset (RFC 9110).\
- **PATCH** = **partial update**: send only the fields that change (RFC 5789).\
\
```http\
PUT   /users/1   { \\"name\\": \\"An\\
