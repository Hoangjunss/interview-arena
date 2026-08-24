---
id: delete-truncate-va-drop-khac-nhau-the-nao
position: backend
technology: sql-basics
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DELETE, TRUNCATE và DROP khác nhau thế nào?

## Question (EN)
How do DELETE, TRUNCATE and DROP differ?

## Đáp án chi tiết (VI)
- **`DELETE`**: xóa **hàng theo điều kiện** (`DELETE FROM t WHERE ...`), có thể xóa một phần. Là **DML**, ghi log từng hàng, chạy trong transaction (rollback được), kích hoạt **trigger**, tôn trọng FK. Xóa nhiều hàng thì chậm và để lại dead tuple (cần VACUUM ở Postgres). Không reset bộ đếm sequence.\
- **`TRUNCATE`**: xóa **toàn bộ hàng** của bảng cực nhanh bằng cách bỏ luôn vùng lưu trữ, **không quét từng hàng**. Là **DDL**; trong PostgreSQL vẫn **transaction-safe** (rollback được) nhưng lấy khóa mạnh; **không kích hoạt trigger** hàng; có thể `RESTART IDENTITY` để reset sequence. Không dùng được `WHERE`.\
- **`DROP`**: xóa **cả bảng** — dữ liệu + cấu trúc (cột, index, ràng buộc) khỏi schema. Bảng không còn tồn tại.\
\
Tóm tắt: DELETE = xóa có chọn lọc; TRUNCATE = làm rỗng nhanh cả bảng; DROP = xóa hẳn bảng.

## Detailed Answer (EN)
- **`DELETE`**: removes **rows by condition** (`DELETE FROM t WHERE ...`), can delete a subset. It's **DML**, logs per-row, runs in a transaction (rollback-able), fires **triggers**, respects FKs. Deleting many rows is slow and leaves dead tuples (needs VACUUM in Postgres). Does not reset sequences.\
- **`TRUNCATE`**: removes **all rows** very fast by dropping the storage, **without scanning rows**. It's **DDL**; in PostgreSQL it is still **transaction-safe** (rollback-able) but takes a strong lock; **does not fire row triggers**; can `RESTART IDENTITY` to reset sequences. Cannot use `WHERE`.\
- **`DROP`**: removes the **whole table** — data + structure (columns, indexes, constraints) from the schema. The table no longer exists.\
\
Summary: DELETE = selective removal; TRUNCATE = fast full empty; DROP = remove the table entirely.
