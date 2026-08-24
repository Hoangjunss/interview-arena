---
id: vi-sao-elasticsearch-thuong-khong-duoc-dung-lam-database-chinh
position: backend
technology: architecture
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao Elasticsearch thường không được dùng làm database chính?

## Question (EN)
Why is Elasticsearch usually not used as the primary database?

## Đáp án chi tiết (VI)
Vì nó **không có transaction đa document, không có join, và ưu tiên availability hơn consistency**. Mất dữ liệu trong tình huống network partition là chuyện đã được ghi nhận.\
\
Các điểm cụ thể thiếu so với một RDBMS:\
- Không có ACID transaction trên nhiều document. Update là **delete + reindex cả document**.\
- Không có foreign key, không có join thật (`nested` và `join` field đều có chi phí cao).\
- Không có unique constraint ngoài `_id`.\
- Near real-time, nên đọc ngay sau khi ghi có thể chưa thấy.\
\
Mô hình chuẩn trong hệ thống thật: **PostgreSQL/MySQL là source of truth**, Elasticsearch là read model được đồng bộ sang, phục vụ search và aggregation.\
\
Hệ quả vận hành quan trọng: khi index hỏng hoặc mapping sai, cách xử lý đúng là **reindex lại từ DB gốc**, không phải cố sửa dữ liệu trong Elasticsearch.

## Detailed Answer (EN)
Because it has **no multi-document transactions, no joins, and favours availability over consistency**. Data loss during network partitions is documented behaviour.\
\
Concrete gaps against an RDBMS:\
- No ACID transactions across documents. An update is **delete plus reindex of the whole document**.\
- No foreign keys and no real joins (`nested` and `join` fields both carry heavy costs).\
- No unique constraints beyond `_id`.\
- Near real-time, so a read right after a write may not see it.\
\
The standard production pattern: **PostgreSQL/MySQL is the source of truth**, Elasticsearch is a synchronised read model serving search and aggregations.\
\
An important operational consequence: when an index is corrupted or the mapping is wrong, the correct fix is **reindexing from the source database**, not repairing data inside Elasticsearch.
