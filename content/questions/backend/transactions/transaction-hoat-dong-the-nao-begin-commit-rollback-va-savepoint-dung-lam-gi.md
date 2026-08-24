---
id: transaction-hoat-dong-the-nao-begin-commit-rollback-va-savepoint-dung-lam-gi
position: backend
technology: transactions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transaction hoạt động thế nào (BEGIN/COMMIT/ROLLBACK) và savepoint dùng làm gì?

## Question (EN)
How do transactions work (BEGIN/COMMIT/ROLLBACK) and what are savepoints for?

## Đáp án chi tiết (VI)
Một transaction bọc nhiều câu lệnh thành một đơn vị atomic:\
\
- `BEGIN` (hoặc `START TRANSACTION`): mở transaction.\
- `COMMIT`: xác nhận, làm mọi thay đổi bền vững và hiển thị cho transaction khác.\
- `ROLLBACK`: hủy toàn bộ thay đổi từ khi BEGIN, DB trở về như cũ.\
\
**Savepoint** là mốc lồng bên trong transaction:\
- `SAVEPOINT sp1` → đặt mốc.\
- `ROLLBACK TO sp1` → hủy phần thay đổi **sau** mốc, **giữ** phần trước, transaction vẫn tiếp tục.\
- `RELEASE SAVEPOINT sp1` → bỏ mốc.\
\
Dùng savepoint khi muốn thử một phần thao tác có thể lỗi mà không phải bỏ cả transaction (vd xử lý từng dòng trong batch, dòng lỗi rollback riêng).\
\
Thực dụng: **giữ transaction càng ngắn càng tốt** và không làm I/O bên ngoài (gọi HTTP, đọc file) bên trong — transaction dài giữ lock lâu, chặn giao dịch khác và cản vacuum.

## Detailed Answer (EN)
A transaction wraps several statements into one atomic unit:\
\
- `BEGIN` (or `START TRANSACTION`): open a transaction.\
- `COMMIT`: confirm — make all changes durable and visible to others.\
- `ROLLBACK`: undo every change since `BEGIN`, returning the DB to its prior state.\
\
A **savepoint** is a nested marker inside a transaction:\
- `SAVEPOINT sp1` → set a marker.\
- `ROLLBACK TO sp1` → undo changes made **after** the marker, **keep** the earlier ones, and continue.\
- `RELEASE SAVEPOINT sp1` → discard the marker.\
\
Use savepoints to attempt a fallible sub-step without aborting the whole transaction (e.g. processing a batch row-by-row and rolling back only the failing row).\
\
Practical rule: **keep transactions as short as possible** and do no external I/O (HTTP calls, file reads) inside them — a long transaction holds locks, blocks other transactions and hinders vacuum.
