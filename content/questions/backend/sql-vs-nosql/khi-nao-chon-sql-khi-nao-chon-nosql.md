---
id: khi-nao-chon-sql-khi-nao-chon-nosql
position: backend
technology: sql-vs-nosql
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào chọn SQL, khi nào chọn NoSQL?

## Question (EN)
When do you choose SQL versus NoSQL?

## Đáp án chi tiết (VI)
Chọn theo **mô hình truy vấn + yêu cầu nhất quán + cách scale**, không theo trào lưu.\
\
**Chọn SQL khi**:\
- Dữ liệu có cấu trúc rõ, quan hệ nhiều, cần `JOIN` linh hoạt.\
- Cần **giao dịch ACID** và nhất quán mạnh (thanh toán, kho, đặt chỗ).\
- Truy vấn ad-hoc đa dạng, chưa biết trước hết cách hỏi.\
\
**Chọn NoSQL khi**:\
- Dữ liệu bán cấu trúc / schema hay đổi, cần lặp nhanh.\
- Cần **scale ngang** và throughput rất cao, chấp nhận eventual consistency.\
- Mẫu truy cập biết trước và đơn giản (tra theo khóa, đọc tài liệu nguyên khối).\
- Loại dữ liệu chuyên biệt (đồ thị quan hệ, time-series, key-value cache).\
\
Thực tế nhiều hệ dùng **cả hai (polyglot persistence)**: Postgres cho dữ liệu giao dịch, Redis cache, Elasticsearch cho tìm kiếm... Mặc định nên bắt đầu bằng SQL trừ khi có lý do rõ ràng.

## Detailed Answer (EN)
Choose by **query patterns + consistency needs + scaling model**, not by hype.\
\
**Choose SQL when**:\
- Data is well-structured, relational, needs flexible `JOIN`s.\
- You need **ACID transactions** and strong consistency (payments, inventory, bookings).\
- Diverse ad-hoc queries where you don't know all access patterns upfront.\
\
**Choose NoSQL when**:\
- Semi-structured / frequently changing schema, fast iteration.\
- You need **horizontal scale** and very high throughput, tolerating eventual consistency.\
- Access patterns are known and simple (lookup by key, read a whole document).\
- Specialized data shapes (relationship graphs, time-series, key-value cache).\
\
In practice many systems use **both (polyglot persistence)**: Postgres for transactional data, Redis for cache, Elasticsearch for search... Default to SQL unless there is a clear reason not to.
