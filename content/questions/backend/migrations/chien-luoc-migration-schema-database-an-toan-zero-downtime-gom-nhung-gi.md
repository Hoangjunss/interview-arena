---
id: chien-luoc-migration-schema-database-an-toan-zero-downtime-gom-nhung-gi
position: backend
technology: migrations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chiến lược migration schema database an toàn (zero-downtime) gồm những gì?

## Question (EN)
What makes a safe (zero-downtime) database migration strategy?

## Đáp án chi tiết (VI)
Migration là thay đổi schema **có phiên bản, chạy tuần tự** — mỗi file một bước, lưu trong version control để mọi môi trường hội tụ cùng schema (Flyway, Liquibase, Prisma Migrate...).\
\
Để **không downtime**, tách thay đổi phá vỡ (breaking) thành các bước tương thích ngược — mẫu **expand/contract**:\
- **Expand**: thêm cột/bảng mới (nullable hoặc có default); deploy code ghi **cả cũ lẫn mới**.\
- **Migrate**: backfill dữ liệu theo **lô (batch)** để tránh khóa bảng lâu.\
- **Contract**: khi code cũ không còn dùng, mới xóa cột/bảng cũ.\
\
Nguyên tắc: luôn có **đường lùi (rollback)**; tránh `ALTER` khóa bảng lớn giờ cao điểm; đổi tên cột = thêm cột mới rồi bỏ cũ (không rename trực tiếp vì phá client cũ).

## Detailed Answer (EN)
A migration is a **versioned, sequential** schema change — one step per file, kept in version control so every environment converges on the same schema (Flyway, Liquibase, Prisma Migrate...).\
\
For **zero downtime**, split a breaking change into backward-compatible steps — the **expand/contract** pattern:\
- **Expand**: add the new column/table (nullable or with a default); deploy code that writes **both old and new**.\
- **Migrate**: backfill data in **batches** to avoid long table locks.\
- **Contract**: only after the old code is gone, drop the old column/table.\
\
Rules: always keep a **rollback path**; avoid `ALTER`s that lock a large table at peak; rename a column by adding a new one then dropping the old (never rename in place — it breaks older clients).
