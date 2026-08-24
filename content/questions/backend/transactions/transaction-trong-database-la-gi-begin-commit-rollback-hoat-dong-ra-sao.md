---
id: transaction-trong-database-la-gi-begin-commit-rollback-hoat-dong-ra-sao
position: backend
technology: transactions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transaction trong database là gì? BEGIN/COMMIT/ROLLBACK hoạt động ra sao?

## Question (EN)
What is a database transaction? How do BEGIN/COMMIT/ROLLBACK work?

## Đáp án chi tiết (VI)
Transaction là một nhóm câu lệnh chạy như **một đơn vị atomic** — hoặc tất cả thành công, hoặc không gì cả.\
\
- **BEGIN**: mở transaction.\
- **COMMIT**: xác nhận; mọi thay đổi trở nên bền vững và thấy được với transaction khác.\
- **ROLLBACK**: hủy; đưa DB về trạng thái trước `BEGIN`.\
\
Ví dụ chuyển tiền: trừ tài khoản A **và** cộng tài khoản B phải cùng thành công; nếu bước hai lỗi thì `ROLLBACK` để không mất tiền. Đây chính là chữ **A (Atomicity)** trong ACID; DB ghi **write-ahead log (WAL)** để đảm bảo durability và khôi phục sau crash — còn rollback trong PostgreSQL dựa trên **MVCC** (bản ghi cũ vẫn còn, transaction chỉ bị đánh dấu hủy).\
\
Lưu ý: **autocommit** bật mặc định ở nhiều client → mỗi câu lệnh là một transaction; muốn gộp nhiều câu thành một đơn vị phải `BEGIN` tường minh.

## Detailed Answer (EN)
A transaction is a group of statements that runs as **one atomic unit** — either all succeed or none do.\
\
- **BEGIN**: start the transaction.\
- **COMMIT**: confirm; all changes become durable and visible to other transactions.\
- **ROLLBACK**: abort; return the DB to its state before `BEGIN`.\
\
Money-transfer example: debiting account A **and** crediting account B must both succeed; if the second step fails, `ROLLBACK` so no money is lost. This is the **A (Atomicity)** in ACID; the DB writes a **write-ahead log (WAL)** for durability and crash recovery — while rollback in PostgreSQL relies on **MVCC** (old row versions remain; the transaction is simply marked aborted).\
\
Note: **autocommit** is on by default in many clients → each statement is its own transaction; to group several into one unit you must `BEGIN` explicitly.
