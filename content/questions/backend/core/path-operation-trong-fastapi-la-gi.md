---
id: path-operation-trong-fastapi-la-gi
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Path operation trong FastAPI là gì?

## Question (EN)
What is a path operation in FastAPI?

## Đáp án chi tiết (VI)
Path operation là function gắn với một HTTP method và path, ví dụ GET `/users/{id}` hoặc POST `/orders`. FastAPI đọc type hints từ function parameters để parse path params, query params, body, header, cookie và validate tự động.\
\
Điểm mạnh là route handler vừa là code xử lý request vừa là contract cho OpenAPI docs. Vì vậy type hints và response model nên được viết nghiêm túc, không chỉ để editor autocomplete.

## Detailed Answer (EN)
A path operation is a function bound to an HTTP method and path, such as GET `/users/{id}` or POST `/orders`. FastAPI reads function type hints to parse path params, query params, body, headers, cookies and validate automatically.\
\
The route handler is both request handling code and the OpenAPI contract. Type hints and response models should therefore be treated as API design, not just editor autocomplete.
