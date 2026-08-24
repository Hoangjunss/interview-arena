---
id: dong-bo-du-lieu-tu-postgresql-sang-elasticsearch-nen-lam-the-nao
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đồng bộ dữ liệu từ PostgreSQL sang Elasticsearch nên làm thế nào?

## Question (EN)
How should data be synchronised from PostgreSQL to Elasticsearch?

## Đáp án chi tiết (VI)
Ba cách, theo mức độ tin cậy tăng dần:\
\
1. **Dual write** — service ghi DB xong ghi luôn sang Elasticsearch. Đơn giản nhưng **không có bảo đảm**: ghi DB xong mà service chết thì Elasticsearch thiếu document vĩnh viễn.\
2. **Polling theo `updated_at`** — job chạy định kỳ quét record mới. Dễ làm, nhưng bỏ sót record bị xoá (cần soft delete) và có độ trễ.\
3. **CDC qua WAL** (Debezium + Kafka) — bắt thay đổi từ replication log của Postgres. Đáng tin cậy nhất, không sót, không phải sửa ứng dụng, nhưng thêm hạ tầng phải vận hành.\
\
Một lựa chọn trung gian hay dùng: ghi DB trong transaction cùng với một bảng outbox, rồi một worker đọc outbox đẩy sang Elasticsearch. Được tính atomic của DB mà không cần Kafka.\
\
Dù chọn cách nào cũng phải có **job đối soát định kỳ**: đếm và so `updated_at` giữa hai bên, và có sẵn đường **reindex lại toàn bộ từ DB** — coi Elasticsearch là read model dựng lại được, không phải nơi giữ dữ liệu.

## Detailed Answer (EN)
Three approaches, in increasing order of reliability:\
\
1. **Dual write** — the service writes to the database then to Elasticsearch. Simple but **offers no guarantee**: if the service dies after the database write, Elasticsearch misses that document forever.\
2. **Polling on `updated_at`** — a periodic job scans new rows. Easy, but it misses deletes (needs soft deletes) and adds lag.\
3. **CDC from the WAL** (Debezium plus Kafka) — capturing changes from the Postgres replication log. The most reliable, misses nothing, requires no application change, but adds infrastructure to operate.\
\
A popular middle ground: write to the database and an outbox table in one transaction, then have a worker read the outbox and push to Elasticsearch. You get database atomicity without Kafka.\
\
Whatever you choose, add a **periodic reconciliation job**: compare counts and `updated_at` on both sides, and keep a path to **fully reindex from the database** — treat Elasticsearch as a rebuildable read model, not a system of record.
