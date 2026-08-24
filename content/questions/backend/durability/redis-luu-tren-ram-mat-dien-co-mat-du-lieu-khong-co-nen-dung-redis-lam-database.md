---
id: redis-luu-tren-ram-mat-dien-co-mat-du-lieu-khong-co-nen-dung-redis-lam-database
position: backend
technology: durability
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis lưu trên RAM — mất điện có mất dữ liệu không? Có nên dùng Redis làm database chính?

## Question (EN)
Redis lives in RAM — is data lost on a power cut? Should Redis be the primary database?

## Đáp án chi tiết (VI)
Redis **có** cơ chế lưu xuống đĩa, nhưng độ bền vẫn thấp hơn một RDBMS và phải hiểu rõ trước khi tin tưởng.\
\
Hai cơ chế:\
- **RDB**: chụp snapshot toàn bộ dataset theo chu kỳ. File nhỏ, khởi động lại nhanh, nhưng **mất phần dữ liệu ghi sau snapshot cuối** (thường vài phút).\
- **AOF**: ghi tiếp mọi lệnh thay đổi vào một file log. Bền hơn; với `appendfsync everysec` thì tối đa mất khoảng 1 giây dữ liệu. File lớn hơn, cần rewrite định kỳ.\
\
Có thể bật **cả hai**: AOF để phục hồi bền, RDB để backup và khởi động nhanh.\
\
**Dùng làm DB chính?** Chỉ khi dữ liệu chấp nhận mất một phần, hoặc có thể dựng lại từ nguồn khác (cache, session, rate-limit counter, leaderboard). Với dữ liệu bắt buộc không được mất (đơn hàng, giao dịch), Redis không thay được Postgres: không transaction đa bảng theo kiểu ACID với rollback tuỳ ý, không JOIN, không constraint, và dataset bị chặn bởi dung lượng RAM.

## Detailed Answer (EN)
Redis **does** persist to disk, but its durability is weaker than an RDBMS and you must understand it before relying on it.\
\
Two mechanisms:\
- **RDB**: periodic point-in-time snapshots of the dataset. Small files, fast restart, but **loses writes made after the last snapshot** (often minutes).\
- **AOF**: appends every write command to a log file. More durable; with `appendfsync everysec` you lose at most about one second of writes. Bigger file, needs periodic rewrite.\
\
You can enable **both**: AOF for durable recovery, RDB for backups and fast startup.\
\
**As the primary DB?** Only when the data can be lost partially or rebuilt from another source (cache, sessions, rate-limit counters, leaderboards). For data that must never be lost (orders, payments), Redis does not replace Postgres: no ACID multi-table transactions with arbitrary rollback, no JOINs, no constraints, and the dataset is capped by available RAM.
