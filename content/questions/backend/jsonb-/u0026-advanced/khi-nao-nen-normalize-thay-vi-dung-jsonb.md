---
id: khi-nao-nen-normalize-thay-vi-dung-jsonb
position: backend
technology: jsonb-\u0026-advanced
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên normalize thay vì dùng JSONB?

## Question (EN)
When should you normalize instead of using JSONB?

## Đáp án chi tiết (VI)
Chọn **normalize** (tách thành cột/bảng riêng) khi field cần join, hay lọc, cần ràng buộc/foreign key, cần update độc lập hoặc dùng cho báo cáo. Chọn **JSONB** khi cấu trúc hay đổi, ít khi query sâu, metadata thay đổi liên tục, hoặc cần giữ nguyên payload từ hệ thống ngoài.\
\
Quy tắc thực tế: dữ liệu cốt lõi của nghiệp vụ nên là cột/bảng rõ ràng; dữ liệu phụ hoặc nửa cấu trúc thì để JSONB. Dấu hiệu nên normalize: bạn cứ phải liên tục tạo index trên từng field bên trong JSONB để query — lúc đó JSONB đang gánh việc của bảng quan hệ.

## Detailed Answer (EN)
Choose **normalize** (split into separate columns/tables) when a field needs joins, frequent filtering, constraints/foreign keys, independent updates, or reporting. Choose **JSONB** when the shape changes often, deep querying is rare, metadata changes constantly, or you must keep a payload from an external system as-is.\
\
Practical rule: core domain data should be clear columns/tables; secondary or semi-structured data can be JSONB. A sign you should normalize: you keep creating indexes on individual fields inside the JSONB to query them — at that point JSONB is doing a relational table's job.
