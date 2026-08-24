---
id: rest-la-gi-mot-api-restful-can-nhung-nguyen-tac-nao
position: backend
technology: api-\u0026-http
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
REST là gì? Một API RESTful cần những nguyên tắc nào?

## Question (EN)
What is REST? What principles make an API RESTful?

## Đáp án chi tiết (VI)
REST (Representational State Transfer) là kiểu kiến trúc cho API trên HTTP. Nguyên tắc chính:\
\
- **Stateless**: mỗi request tự chứa đủ thông tin; server không giữ trạng thái phiên giữa các request → dễ scale ngang.\
- **Tài nguyên (resource) + URI**: mỗi thực thể là một resource định danh bằng URI (`/users/123`); dùng danh từ, không động từ.\
- **HTTP method chuẩn**: `GET` (đọc), `POST` (tạo), `PUT`/`PATCH` (cập nhật), `DELETE` (xóa).\
- **Biểu diễn (representation)**: trả JSON/XML; client thao tác qua representation đó.\
- **Dùng đúng status code** và **HATEOAS** (tùy chọn: gắn link điều hướng).\
\
Stateless + method/URI nhất quán là điểm hay bị hỏi nhất.

## Detailed Answer (EN)
REST (Representational State Transfer) is an architectural style for HTTP APIs. Core principles:\
\
- **Stateless**: each request carries everything needed; the server keeps no session state between requests → scales horizontally.\
- **Resources + URIs**: each entity is a resource identified by a URI (`/users/123`); use nouns, not verbs.\
- **Standard HTTP methods**: `GET` (read), `POST` (create), `PUT`/`PATCH` (update), `DELETE` (remove).\
- **Representations**: return JSON/XML; the client manipulates that representation.\
- **Proper status codes** and **HATEOAS** (optional: embed navigation links).\
\
Statelessness plus consistent method/URI usage are the most commonly probed points.
