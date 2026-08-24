---
id: migration-schema-postgresql-can-lam-sao-de-it-downtime
position: backend
technology: schema-\u0026-constraints
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Migration schema PostgreSQL cần làm sao để ít downtime?

## Question (EN)
How do you run PostgreSQL schema migrations with low downtime?

## Đáp án chi tiết (VI)
Migration ít downtime cốt ở chỗ tránh các thao tác khóa bảng lâu hoặc viết lại cả bảng vào giờ cao điểm. Pattern an toàn theo nhiều bước: thêm cột nullable → backfill dữ liệu theo từng lô nhỏ → deploy code app đọc/ghi tương thích cả cũ lẫn mới → cuối cùng mới thêm constraint/index (dùng `CONCURRENTLY` để không khóa ghi).\
```sql\
CREATE INDEX CONCURRENTLY idx_orders_created_at ON orders (created_at);\
```\
Đừng chạy migration nguy hiểm chung với deploy app khi chưa rõ nó khóa ở mức nào. Luôn test trên dữ liệu giống production và chuẩn bị sẵn kế hoạch rollback.

## Detailed Answer (EN)
Low-downtime migration is mostly about avoiding long table locks or full-table rewrites during peak traffic. A safe multi-step pattern: add a nullable column → backfill data in small batches → deploy app code compatible with both old and new shapes → only then add constraints/indexes (use `CONCURRENTLY` so writes are not locked).\
```sql\
CREATE INDEX CONCURRENTLY idx_orders_created_at ON orders (created_at);\
```\
Do not run a dangerous migration together with an app deploy before you know what lock level it takes. Always test on production-like data and have a rollback plan ready.
