---
id: connection-pooling-la-gi-va-vi-sao-can
position: backend
technology: connections
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Connection pooling là gì và vì sao cần?

## Question (EN)
What is connection pooling and why is it needed?

## Đáp án chi tiết (VI)
Mở một kết nối DB tốn kém: bắt tay TCP, xác thực, cấp phát tài nguyên server. Nếu mỗi request lại mở rồi đóng kết nối thì **độ trễ cao** và DB dễ cạn kết nối.\
\
**Connection pool** giữ sẵn một **tập kết nối mở**, tái sử dụng: request \\"mượn\\" một kết nối, dùng xong \\"trả lại\\" pool thay vì đóng. Lợi:\
- Bỏ chi phí thiết lập kết nối lặp đi lặp lại → nhanh hơn nhiều.\
- **Giới hạn số kết nối đồng thời** tới DB (mỗi kết nối Postgres tốn RAM/process) → chống quá tải.\
\
Tham số quan trọng: kích thước pool tối đa/tối thiểu, thời gian chờ lấy kết nối, idle timeout. Cỡ pool tham khảo: `(số core × 2) + số đĩa` — to hơn chưa chắc nhanh hơn vì tốn chi phí chuyển ngữ cảnh. Với serverless/nhiều instance thường thêm **proxy pooler** (PgBouncer, hoặc pooled endpoint của Neon) vì mỗi instance tự giữ pool sẽ nhân số kết nối vượt giới hạn DB.

## Detailed Answer (EN)
Opening a DB connection is expensive: TCP handshake, authentication, server-side resource allocation. If every request opens then closes a connection, latency is high and the DB runs out of connections.\
\
A **connection pool** keeps a **set of open connections** ready and reuses them: a request \\"borrows\\" one and \\"returns\\" it to the pool when done instead of closing it. Benefits:\
- Removes the repeated connection-setup cost → much faster.\
- **Caps concurrent connections** to the DB (each Postgres connection costs RAM/a process) → prevents overload.\
\
Key parameters: max/min pool size, acquire timeout, idle timeout. A sizing rule of thumb: `(cores × 2) + disks` — bigger is not always faster due to context-switching overhead. With serverless/many instances you typically add a **proxy pooler** (PgBouncer, or Neon's pooled endpoint) because each instance holding its own pool multiplies connections past the DB limit.
