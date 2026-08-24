---
id: acid-la-gi-cac-muc-transaction-isolation-va-hien-tuong-chung-ngan
position: backend
technology: database
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ACID là gì? Các mức transaction isolation và hiện tượng chúng ngăn?

## Question (EN)
What is ACID? What are the transaction isolation levels and the anomalies they prevent?

## Đáp án chi tiết (VI)
**ACID**: Atomicity (toàn bộ hoặc không), Consistency (giữ ràng buộc), Isolation (transaction chạy như độc lập), Durability (đã commit thì bền).\
\
Bốn mức **isolation** (chặt dần) và hiện tượng ngăn được:\
- **Read Uncommitted**: yếu nhất, có thể **dirty read**.\
- **Read Committed** (mặc định PostgreSQL): chỉ đọc dữ liệu đã commit; vẫn có **non-repeatable read**, **phantom read**.\
- **Repeatable Read**: ngăn non-repeatable read (PostgreSQL còn ngăn phantom); còn **serialization anomaly**.\
- **Serializable**: chặt nhất, như chạy tuần tự; ngăn cả bốn, nhưng chi phí cao và cần retry.\
\
Càng chặt càng ít bất thường nhưng càng giảm concurrency.

## Detailed Answer (EN)
**ACID**: Atomicity (all-or-nothing), Consistency (preserves constraints), Isolation (transactions run as if alone), Durability (once committed, it survives).\
\
Four **isolation** levels (increasingly strict) and the anomalies they prevent:\
- **Read Uncommitted**: weakest, allows **dirty reads**.\
- **Read Committed** (PostgreSQL default): reads only committed data; still allows **non-repeatable reads** and **phantom reads**.\
- **Repeatable Read**: prevents non-repeatable reads (PostgreSQL also prevents phantoms); still allows a **serialization anomaly**.\
- **Serializable**: strictest, as if serial; prevents all four, but costs more and needs retry logic.\
\
Stricter = fewer anomalies but lower concurrency.
