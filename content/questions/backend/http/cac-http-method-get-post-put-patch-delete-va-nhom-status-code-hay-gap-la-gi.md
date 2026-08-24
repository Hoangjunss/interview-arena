---
id: cac-http-method-get-post-put-patch-delete-va-nhom-status-code-hay-gap-la-gi
position: backend
technology: http
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các HTTP method (GET/POST/PUT/PATCH/DELETE) và nhóm status code hay gặp là gì?

## Question (EN)
What are the common HTTP methods (GET/POST/PUT/PATCH/DELETE) and status code groups?

## Đáp án chi tiết (VI)
**HTTP method** báo mục đích của request:\
\
- **GET** — lấy dữ liệu, không có body, **an toàn** (không đổi trạng thái) và **idempotent**; có thể cache.\
- **POST** — tạo mới / gửi dữ liệu; **không idempotent** (gọi 2 lần tạo 2 bản ghi).\
- **PUT** — thay thế **toàn bộ** một resource; **idempotent** (gọi lại kết quả như nhau).\
- **PATCH** — cập nhật **một phần** resource.\
- **DELETE** — xóa resource; idempotent.\
\
*Idempotent* = gọi nhiều lần cho cùng kết quả trạng thái như gọi một lần (quan trọng khi retry).\
\
**Nhóm status code**:\
- **2xx** thành công — `200 OK`, `201 Created`, `204 No Content`.\
- **3xx** chuyển hướng — `301` (vĩnh viễn), `302`/`307` (tạm thời), `304 Not Modified` (dùng cache).\
- **4xx** lỗi phía client — `400` (request sai), `401` (chưa xác thực), `403` (không đủ quyền), `404` (không tìm thấy), `429` (quá nhiều request).\
- **5xx** lỗi phía server — `500`, `502`, `503`.\
\
Mẹo phân biệt hay bị hỏi: `401` = \\"bạn là ai?\\" (chưa đăng nhập), `403` = \\"biết bạn là ai rồi nhưng không cho\\".

## Detailed Answer (EN)
The **HTTP method** signals a request’s intent:\
\
- **GET** — retrieve data, no body, **safe** (no state change) and **idempotent**; cacheable.\
- **POST** — create / submit data; **not idempotent** (calling twice creates two records).\
- **PUT** — replace an **entire** resource; **idempotent** (repeats give the same result).\
- **PATCH** — **partially** update a resource.\
- **DELETE** — remove a resource; idempotent.\
\
*Idempotent* = calling it many times leaves the same state as calling it once (important for retries).\
\
**Status code groups**:\
- **2xx** success — `200 OK`, `201 Created`, `204 No Content`.\
- **3xx** redirection — `301` (permanent), `302`/`307` (temporary), `304 Not Modified` (use cache).\
- **4xx** client errors — `400` (bad request), `401` (unauthenticated), `403` (forbidden), `404` (not found), `429` (too many requests).\
- **5xx** server errors — `500`, `502`, `503`.\
\
A frequently-asked distinction: `401` = \\"who are you?\\" (not logged in), `403` = \\"we know who you are, but you’re not allowed\\".
