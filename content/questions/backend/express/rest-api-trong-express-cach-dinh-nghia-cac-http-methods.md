---
id: rest-api-trong-express-cach-dinh-nghia-cac-http-methods
position: backend
technology: express
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
REST API trong Express: cách định nghĩa các HTTP methods?

## Question (EN)
REST API in Express: how do you define HTTP methods?

## Đáp án chi tiết (VI)
Express map trực tiếp tới HTTP methods với semantics rõ ràng: GET (idempotent, safe — chỉ đọc, không side effects), POST (không idempotent — tạo resource mới, mỗi call tạo record mới), PUT (idempotent — replace toàn bộ resource, gửi thiếu field thì field đó bị null/default), PATCH (idempotent — partial update, chỉ gửi fields cần thay đổi), DELETE (idempotent — xóa, gọi nhiều lần kết quả như nhau). CRUD thực tế: `GET /users` (list), `POST /users` (create, trả 201), `GET /users/:id` (read), `PUT /users/:id` (replace, trả 200), `PATCH /users/:id` (update, trả 200), `DELETE /users/:id` (delete, trả 204 no content). Status codes quan trọng: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 500 Internal Server Error. Content negotiation: `req.accepts('json')` kiểm tra client Accept header. Lưu ý: dùng GET với body để filter — không đúng semantics, dùng query params thay thế.

## Detailed Answer (EN)
Express maps directly to HTTP methods with clear semantics: GET (idempotent, safe — read only, no side effects), POST (not idempotent — creates a new resource; each call creates a new record), PUT (idempotent — replaces the entire resource; missing fields are set to null/default), PATCH (idempotent — partial update; only send fields to change), DELETE (idempotent — delete; multiple calls produce the same result). Practical CRUD: `GET /users` (list), `POST /users` (create, return 201), `GET /users/:id` (read), `PUT /users/:id` (replace, return 200), `PATCH /users/:id` (update, return 200), `DELETE /users/:id` (delete, return 204 no content). Important status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 500 Internal Server Error. Content negotiation: `req.accepts('json')` checks the client's Accept header. Pitfall: using GET with a body for filtering — incorrect semantics; use query params instead.
