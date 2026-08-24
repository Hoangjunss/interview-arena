---
id: idempotency-la-gi-http-method-nao-idempotent
position: backend
technology: api-\u0026-http
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Idempotency là gì? HTTP method nào idempotent?

## Question (EN)
What is idempotency? Which HTTP methods are idempotent?

## Đáp án chi tiết (VI)
Một method **idempotent** khi gửi request đó **một lần hay nhiều lần** đều cho cùng một tác động lên server.\
\
- **Idempotent**: `GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`.\
- **KHÔNG idempotent**: `POST` (mỗi lần thường tạo bản ghi mới), `PATCH` (tùy cách implement).\
\
Ý nghĩa thực tế: client **retry an toàn** với method idempotent khi mạng lỗi/timeout. Lưu ý: status code có thể khác giữa các lần (vd `DELETE` lần đầu `200`, lần sau `404`) nhưng *tác động* cuối vẫn như nhau. Với `POST`, muốn an toàn khi retry cần **idempotency key**.

## Detailed Answer (EN)
A method is **idempotent** when sending the request **once or many times** produces the same effect on the server.\
\
- **Idempotent**: `GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`.\
- **Not idempotent**: `POST` (usually creates a new record each time), `PATCH` (implementation-dependent).\
\
Practical meaning: clients can **safely retry** idempotent methods on network errors/timeouts. Note the status code may differ between calls (e.g. `DELETE` returns `200` then `404`) but the final *effect* is the same. To make `POST` retry-safe, use an **idempotency key**.
