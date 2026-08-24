---
id: lam-sao-migration-schema-ma-khong-downtime
position: backend
technology: migrations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao migration schema mà không downtime?

## Question (EN)
How do you run schema migrations with zero downtime?

## Đáp án chi tiết (VI)
Với hệ đang chạy, migration phá vỡ tương thích sẽ làm chết code cũ đang deploy chung. Kỹ thuật chuẩn là **expand–contract (parallel change)**, triển khai theo bước tương thích ngược:\
\
1. **Expand**: thêm cấu trúc mới **không phá cũ** — thêm cột/bảng **nullable**, có default; **thêm index dạng non-blocking** (`CREATE INDEX CONCURRENTLY` trong Postgres).\
2. **Backfill**: chép/điền dữ liệu sang cấu trúc mới **theo lô nhỏ** để không khóa lâu.\
3. **Migrate app**: deploy code ghi/đọc **cả hai** (dual-write), rồi chuyển dần sang đọc cột mới.\
4. **Contract**: khi không còn code dùng cột cũ → mới xóa cột/ràng buộc cũ.\
\
Lưu ý:\
- Tránh thao tác **khóa lâu**: đổi kiểu cột, thêm `NOT NULL`/FK trực tiếp trên bảng lớn → tách thành các bước an toàn.\
- Đảm bảo code **N và N+1 chạy được song song** (deploy cuốn chiếu).\
- Migration phải **idempotent** và có kế hoạch rollback.

## Detailed Answer (EN)
For a live system, a breaking migration kills the old code deployed alongside it. The standard technique is **expand–contract (parallel change)**, rolled out in backward-compatible steps:\
\
1. **Expand**: add new structures **without breaking the old** — add **nullable** columns/tables with defaults; add indexes non-blocking (`CREATE INDEX CONCURRENTLY` in Postgres).\
2. **Backfill**: copy/populate data into the new structure **in small batches** to avoid long locks.\
3. **Migrate app**: deploy code that writes/reads **both** (dual-write), then shift reads to the new column.\
4. **Contract**: once no code uses the old column, drop the old column/constraint.\
\
Notes:\
- Avoid **long-locking** operations: changing a column type, adding `NOT NULL`/FK directly on a large table → break into safe steps.\
- Ensure versions **N and N+1 run side by side** (rolling deploy).\
- Migrations must be **idempotent** with a rollback plan.
