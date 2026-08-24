---
id: connection-pooling-la-gi-va-vi-sao-quan-trong
position: backend
technology: connection-pooling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Connection pooling là gì và vì sao quan trọng?

## Question (EN)
What is connection pooling and why does it matter?

## Đáp án chi tiết (VI)
Mở một kết nối DB **tốn kém**: bắt tay TCP, thiết lập TLS, xác thực, cấp phát tài nguyên phía server — mất mili-giây và tiêu tốn bộ nhớ mỗi kết nối. Nếu mỗi request mở rồi đóng kết nối riêng thì độ trễ và tải tăng nhanh.\
\
**Connection pool** giữ sẵn một **tập kết nối đang mở, tái sử dụng**: request **mượn** một kết nối rảnh, dùng xong **trả lại** pool thay vì đóng. Lợi ích:\
- **Giảm độ trễ**: bỏ chi phí thiết lập lặp lại.\
- **Giới hạn tải DB**: DB có trần `max_connections`; pool chặn số kết nối đồng thời, tránh làm DB quá tải.\
\
Tham số hay chỉnh: **kích thước tối thiểu/tối đa**, thời gian chờ mượn, idle timeout. Lưu ý kiến trúc **serverless/nhiều instance**: mỗi instance một pool nhỏ có thể cộng dồn vượt trần DB → dùng **pooler bên ngoài** (PgBouncer, RDS Proxy) đặt giữa app và DB. Pool quá nhỏ gây chờ đợi; quá lớn làm nghẽn DB — cần đo và cân chỉnh.

## Detailed Answer (EN)
Opening a DB connection is **expensive**: TCP handshake, TLS setup, authentication, server-side resource allocation — milliseconds and memory per connection. If every request opens and closes its own connection, latency and load climb fast.\
\
A **connection pool** keeps a **set of open, reusable connections**: a request **borrows** an idle one and **returns** it to the pool when done instead of closing it. Benefits:\
- **Lower latency**: eliminates repeated setup cost.\
- **Caps DB load**: the DB has a `max_connections` ceiling; the pool bounds concurrent connections so the DB is not overwhelmed.\
\
Common settings: **min/max size**, borrow timeout, idle timeout. Architecture note for **serverless/many instances**: each instance running its own small pool can sum past the DB ceiling → use an **external pooler** (PgBouncer, RDS Proxy) between app and DB. Too small a pool causes waiting; too large chokes the DB — measure and tune.
