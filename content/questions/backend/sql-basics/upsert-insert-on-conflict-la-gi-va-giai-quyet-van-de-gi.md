---
id: upsert-insert-on-conflict-la-gi-va-giai-quyet-van-de-gi
position: backend
technology: sql-basics
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
UPSERT (INSERT ... ON CONFLICT) là gì và giải quyết vấn đề gì?

## Question (EN)
What is UPSERT (INSERT ... ON CONFLICT) and what problem does it solve?

## Đáp án chi tiết (VI)
UPSERT = \\"**insert nếu chưa có, update nếu đã có**\\" trong **một câu lệnh atomic**. Tránh mẫu sai thường gặp \\"kiểm tra trước rồi ghi\\" (`SELECT` → nếu không có thì `INSERT`), vốn dính **race condition**: hai request cùng thấy \\"chưa có\\" rồi cùng `INSERT` → lỗi trùng khóa hoặc dữ liệu nhân đôi.\
\
PostgreSQL dùng `INSERT ... ON CONFLICT`:\
\
```sql\
INSERT INTO counters (key, count)\
VALUES ('page_view', 1)\
ON CONFLICT (key)\
DO UPDATE SET count = counters.count + 1;\
```\
\
- `ON CONFLICT (cột)` — chỉ ra ràng buộc unique/PK để phát hiện trùng.\
- `DO UPDATE SET ...` — hành động khi trùng (truy cập giá trị mới qua `EXCLUDED`).\
- `DO NOTHING` — bỏ qua nếu trùng, không lỗi.\
\
Lợi ích:\
- **Atomic**, tránh race condition mà không cần khóa/transaction thủ công.\
- Làm thao tác **idempotent**: chạy lại cùng dữ liệu không gây trùng — quan trọng cho retry, đồng bộ, webhook.\
\
Chuẩn SQL và các hệ khác dùng `MERGE`; MySQL có `INSERT ... ON DUPLICATE KEY UPDATE`. Cần có **ràng buộc unique/PK** thì UPSERT mới biết thế nào là \\"trùng\\".

## Detailed Answer (EN)
$85
