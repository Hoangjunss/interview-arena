---
id: replication-trong-postgresql-gom-nhung-kieu-nao
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Replication trong PostgreSQL gồm những kiểu nào?

## Question (EN)
What types of replication does PostgreSQL have?

## Đáp án chi tiết (VI)
Hai kiểu replication chính:\
\
- **Physical (streaming)**: sao chép WAL ở mức khối đĩa, tạo bản sao y hệt cả cluster. Hợp cho standby/read replica/failover (sẵn sàng cao).\
- **Logical**: phát các thay đổi theo từng bảng. Hợp khi chỉ muốn sao một phần, migration, CDC (bắt thay đổi để đẩy sang hệ khác), hoặc tích hợp hệ thống khác.\
\
Physical thường đơn giản hơn cho HA và scale đọc. Logical linh hoạt hơn nhưng phải hiểu replica identity, xử lý schema đổi, conflict và độ trễ (lag). Cả hai đều cần theo dõi replication lag và vẫn phải có chiến lược backup độc lập — replica không thay thế backup.

## Detailed Answer (EN)
Two main replication types:\
\
- **Physical (streaming)**: copies the WAL at disk-block level, creating an identical copy of the whole cluster. Fits standby/read replica/failover (high availability).\
- **Logical**: publishes changes per table. Fits copying only part of the data, migrations, CDC (capturing changes to push to another system), or integrating with other systems.\
\
Physical is usually simpler for HA and read scaling. Logical is more flexible but you must understand replica identity, schema-change handling, conflicts and lag. Both need replication-lag monitoring, and you still need an independent backup strategy — a replica is not a backup.
