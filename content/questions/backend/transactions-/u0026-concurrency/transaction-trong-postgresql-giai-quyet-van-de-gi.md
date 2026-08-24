---
id: transaction-trong-postgresql-giai-quyet-van-de-gi
position: backend
technology: transactions-\u0026-concurrency
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transaction trong PostgreSQL giải quyết vấn đề gì?

## Question (EN)
What problem do transactions solve in PostgreSQL?

## Đáp án chi tiết (VI)
Transaction gom nhiều câu lệnh thành một khối \\"được ăn cả, ngã về không\\": commit thì mọi thay đổi được ghi bền vững, rollback thì hủy sạch như chưa từng chạy. Trong lúc chưa commit, thay đổi chưa hiện ra như dữ liệu hoàn chỉnh với transaction khác (theo isolation rules).\
\
Ví dụ chuyển tiền — trừ tài khoản này, cộng tài khoản kia, cả hai phải cùng thành công:\
```sql\
BEGIN;\
UPDATE accounts SET balance = balance - 100 WHERE id = 1;\
UPDATE accounts SET balance = balance + 100 WHERE id = 2;\
COMMIT;\
```\
Đây là nền tảng để tránh dữ liệu \\"nửa vời\\" trong thanh toán, tồn kho, đặt chỗ và mọi workflow nhiều bước.

## Detailed Answer (EN)
A transaction groups several statements into one all-or-nothing block: on commit every change is saved durably; on rollback everything is discarded as if it never ran. Before commit, the changes are not visible as completed data to other transactions (per isolation rules).\
\
Money transfer example — debit one account, credit another, both must succeed together:\
```sql\
BEGIN;\
UPDATE accounts SET balance = balance - 100 WHERE id = 1;\
UPDATE accounts SET balance = balance + 100 WHERE id = 2;\
COMMIT;\
```\
This is the foundation for avoiding half-done data in payments, inventory, booking and any multi-step workflow.
