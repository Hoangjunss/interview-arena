---
id: cac-nhom-http-status-code-va-y-nghia
position: backend
technology: api-\u0026-http
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các nhóm HTTP status code và ý nghĩa?

## Question (EN)
What are the HTTP status code classes and what do they mean?

## Đáp án chi tiết (VI)
Năm nhóm theo chữ số đầu:\
\
- **1xx** Informational — request đã nhận, đang xử lý.\
- **2xx** Success — thành công: `200 OK`, `201 Created`, `204 No Content`.\
- **3xx** Redirection — cần bước tiếp: `301` (chuyển vĩnh viễn), `304 Not Modified` (cache).\
- **4xx** Client error — lỗi phía client: `400` (sai request), `401` (chưa xác thực), `403` (không đủ quyền), `404` (không tồn tại), `409` (xung đột), `429` (quá nhiều request).\
- **5xx** Server error: `500` (lỗi server), `502`/`503` (gateway/quá tải).\
\
Hay bị hỏi: phân biệt `401` (chưa auth) vs `403` (đã auth nhưng thiếu quyền), và `400` vs `422`.

## Detailed Answer (EN)
Five classes by leading digit:\
\
- **1xx** Informational — received, processing.\
- **2xx** Success: `200 OK`, `201 Created`, `204 No Content`.\
- **3xx** Redirection: `301` (moved permanently), `304 Not Modified` (cache).\
- **4xx** Client error: `400` (bad request), `401` (unauthenticated), `403` (forbidden), `404` (not found), `409` (conflict), `429` (too many requests).\
- **5xx** Server error: `500` (server error), `502`/`503` (gateway/overloaded).\
\
Common follow-ups: `401` (not authenticated) vs `403` (authenticated but lacking permission), and `400` vs `422`.
