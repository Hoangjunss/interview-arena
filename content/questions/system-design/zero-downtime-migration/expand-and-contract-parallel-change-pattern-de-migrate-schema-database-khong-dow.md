---
id: expand-and-contract-parallel-change-pattern-de-migrate-schema-database-khong-dow
position: system-design
technology: zero-downtime-migration
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Expand-and-contract (parallel change) pattern để migrate schema database không downtime là gì? Mô tả các bước khi đổi tên một cột.

## Question (EN)
What is the expand-and-contract (parallel change) pattern for zero-downtime DB schema migration? Walk through renaming a column.

## Đáp án chi tiết (VI)
Khi app đang chạy nhiều instance, không thể đổi schema *và* code cùng lúc — phải để **schema cũ và mới song song tồn tại** trong lúc deploy cuốn chiếu. Đó là **expand → migrate → contract**.\
\
Ví dụ đổi cột `username` → `handle`:\
\
1. **Expand (mở rộng):** thêm cột mới `handle` (nullable, không phá cột cũ). Schema tương thích ngược — code cũ vẫn chạy.\
2. **Dual-write:** deploy code ghi vào **cả hai** cột, đọc cột cũ. Backfill dữ liệu cũ sang `handle` theo batch.\
3. **Migrate read:** deploy code đọc từ `handle`. Giờ cả hai cột đồng bộ.\
4. **Contract (thu hẹp):** ngừng ghi cột cũ; sau khi chắc chắn không còn ai đọc → **drop `username`**.\
\
**Vì sao chia nhỏ:** mỗi bước deploy phải tương thích với phiên bản code **liền trước và liền sau** (rolling deploy có cả hai version chạy song song).\
\
**Lưu ý:**\
- Tránh thao tác DDL **khóa bảng lâu** (thêm cột NOT NULL có default trên bảng lớn) — dùng công cụ online như `pt-online-schema-change`/`gh-ost`.\
- Áp dụng cả khi tách bảng, đổi kiểu dữ liệu, hay tách service.

## Detailed Answer (EN)
$7a
