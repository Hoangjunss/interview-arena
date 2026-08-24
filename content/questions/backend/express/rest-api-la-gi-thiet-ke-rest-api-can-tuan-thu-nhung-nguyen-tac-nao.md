---
id: rest-api-la-gi-thiet-ke-rest-api-can-tuan-thu-nhung-nguyen-tac-nao
position: backend
technology: express
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
REST API là gì? Thiết kế REST API cần tuân thủ những nguyên tắc nào?

## Question (EN)
What is a REST API? What principles should you follow when designing one?

## Đáp án chi tiết (VI)
REST (Representational State Transfer) là kiến trúc thiết kế API dựa trên HTTP, trong đó mỗi URL đại diện cho một resource (tài nguyên). Nguyên tắc quan trọng: dùng danh từ số nhiều cho endpoints (/users, /products), dùng đúng HTTP methods — GET lấy dữ liệu, POST tạo mới, PUT/PATCH cập nhật, DELETE xóa. Status codes phải chính xác: 200 thành công, 201 tạo mới OK, 400 request sai, 401 chưa đăng nhập, 404 không tìm thấy, 500 lỗi server. Ngoài ra cần versioning (/api/v1/), pagination (?page=1\u0026limit=20), và response format thống nhất dạng `{ data, error, meta }` để frontend dễ xử lý.

## Detailed Answer (EN)
REST (Representational State Transfer) is an architectural style for HTTP APIs where each URL represents a resource. Key principles: use plural nouns for endpoints (/users, /products); use correct HTTP methods — GET to retrieve, POST to create, PUT/PATCH to update, DELETE to remove. Status codes must be accurate: 200 success, 201 created, 400 bad request, 401 unauthorized, 404 not found, 500 server error. Also include versioning (/api/v1/), pagination (?page=1\u0026limit=20), and a consistent response format like `{ data, error, meta }` for predictable client handling.
