---
id: acid-la-gi-giai-thich-tung-thuoc-tinh
position: backend
technology: transactions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ACID là gì? Giải thích từng thuộc tính.

## Question (EN)
What is ACID? Explain each property.

## Đáp án chi tiết (VI)
ACID là bốn đảm bảo cho **transaction** — nhóm thao tác chạy như một đơn vị:\
\
- **Atomicity**: toàn bộ thành công hoặc **rollback** hết, không có nửa vời.\
- **Consistency** (nhất quán): transaction đưa DB từ trạng thái hợp lệ này sang trạng thái hợp lệ khác, giữ mọi **ràng buộc** (PK, FK, check).\
- **Isolation** (cô lập): transaction chạy đồng thời cho kết quả như thể chạy **tuần tự**; mức độ do isolation level quyết định.\
- **Durability** (bền vững): đã **commit** thì dữ liệu tồn tại kể cả mất điện — nhờ ghi **WAL/redo log** xuống đĩa.\
\
Kinh điển: chuyển tiền A→B phải trừ A và cộng B **cùng lúc hoặc không cái nào** (atomicity).

## Detailed Answer (EN)
ACID is four guarantees for a **transaction** — a group of operations run as one unit:\
\
- **Atomicity**: all operations succeed or the whole thing **rolls back**, never half-applied.\
- **Consistency**: a transaction moves the DB from one valid state to another, preserving all **constraints** (PK, FK, checks).\
- **Isolation**: concurrent transactions produce a result as if run **serially**; the degree is set by the isolation level.\
- **Durability**: once **committed**, data survives even a power loss — thanks to writing a **WAL/redo log** to disk.\
\
Classic example: transferring money A→B must debit A and credit B **together or not at all** (atomicity).
