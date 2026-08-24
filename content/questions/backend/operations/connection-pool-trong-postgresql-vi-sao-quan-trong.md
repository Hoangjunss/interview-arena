---
id: connection-pool-trong-postgresql-vi-sao-quan-trong
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Connection pool trong PostgreSQL vì sao quan trọng?

## Question (EN)
Why is connection pooling important in PostgreSQL?

## Đáp án chi tiết (VI)
Mỗi kết nối tới PostgreSQL là một process riêng khá nặng (tốn RAM). Nếu app mở quá nhiều kết nối, DB có thể cạn bộ nhớ, CPU bận chuyển ngữ cảnh và latency xấu đi. Connection pool giải quyết bằng cách giữ sẵn một số kết nối và *tái sử dụng* thay vì mở mới liên tục.\
\
Thực tế thường dùng pool ở tầng app hoặc PgBouncer đặt trước DB. Lưu ý: phải cộng tổng số kết nối của *tất cả* instance/worker/replica, không chỉ một máy. Kích thước pool nên dựa trên sức chứa của DB và đặc tính workload, không phải theo số request đồng thời.

## Detailed Answer (EN)
Each connection to PostgreSQL is a separate, fairly heavy process (it uses RAM). If the app opens too many, the DB can run out of memory, the CPU spends time context-switching and latency worsens. A connection pool fixes this by keeping a set of connections ready and *reusing* them instead of constantly opening new ones.\
\
In practice you use a pool in the app or PgBouncer in front of the DB. Note: count the total connections across *all* instances/workers/replicas, not just one machine. Pool size should follow the DB's capacity and workload characteristics, not the raw count of concurrent requests.
