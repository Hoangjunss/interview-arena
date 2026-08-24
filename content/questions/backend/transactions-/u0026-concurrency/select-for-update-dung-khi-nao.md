---
id: select-for-update-dung-khi-nao
position: backend
technology: transactions-\u0026-concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`SELECT FOR UPDATE` dùng khi nào?

## Question (EN)
When should you use `SELECT FOR UPDATE`?

## Đáp án chi tiết (VI)
`SELECT ... FOR UPDATE` khóa đúng các dòng vừa chọn, để transaction khác không thể update/delete chúng cho đến khi bạn commit hoặc rollback. Nó dành cho tình huống \\"đọc — sửa — ghi\\" cần an toàn, ví dụ trừ tồn kho hay lấy job khỏi hàng đợi.\
```sql\
BEGIN;\
SELECT * FROM inventory WHERE sku = 'A' FOR UPDATE;\
UPDATE inventory SET stock = stock - 1 WHERE sku = 'A';\
COMMIT;\
```\
Giữ transaction càng ngắn càng tốt: khóa lâu sẽ chặn người khác, gây timeout và nguy cơ deadlock.

## Detailed Answer (EN)
`SELECT ... FOR UPDATE` locks exactly the rows you selected so other transactions cannot update/delete them until you commit or roll back. It is for \\"read — modify — write\\" cases that must be safe, e.g. decrementing inventory or pulling a job off a queue.\
```sql\
BEGIN;\
SELECT * FROM inventory WHERE sku = 'A' FOR UPDATE;\
UPDATE inventory SET stock = stock - 1 WHERE sku = 'A';\
COMMIT;\
```\
Keep the transaction as short as possible: long-held locks block others, cause timeouts and risk deadlocks.
