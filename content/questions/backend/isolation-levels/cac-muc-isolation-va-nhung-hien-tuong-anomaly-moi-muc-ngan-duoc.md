---
id: cac-muc-isolation-va-nhung-hien-tuong-anomaly-moi-muc-ngan-duoc
position: backend
technology: isolation-levels
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các mức isolation và những hiện tượng (anomaly) mỗi mức ngăn được?

## Question (EN)
What are the isolation levels and which anomalies does each prevent?

## Đáp án chi tiết (VI)
Bốn mức isolation trong SQL (chặt dần) và hiện tượng còn cho phép:\
\
- **Read Uncommitted**: yếu nhất; cho **dirty read** (đọc dữ liệu chưa commit). *PostgreSQL không thực sự có mức này — nó chạy như Read Committed.*\
- **Read Committed** (mặc định PostgreSQL): chỉ đọc dữ liệu đã commit; vẫn có **non-repeatable read** và **phantom read**.\
- **Repeatable Read** (mặc định MySQL InnoDB): mỗi lần đọc cùng hàng cho cùng kết quả trong transaction; ngăn non-repeatable read (PostgreSQL còn ngăn cả phantom); còn **serialization anomaly**.\
- **Serializable**: chặt nhất, kết quả như chạy tuần tự; ngăn mọi hiện tượng nhưng chi phí cao và có thể phải **retry** khi phát hiện xung đột.\
\
Càng chặt càng ít bất thường nhưng càng giảm concurrency — chọn mức thấp nhất đủ đúng.

## Detailed Answer (EN)
The four SQL isolation levels (increasingly strict) and the anomalies each still allows:\
\
- **Read Uncommitted**: weakest; allows **dirty reads** (reading uncommitted data). *PostgreSQL has no true version — it behaves like Read Committed.*\
- **Read Committed** (PostgreSQL default): reads only committed data; still allows **non-repeatable reads** and **phantom reads**.\
- **Repeatable Read** (MySQL InnoDB default): re-reading a row yields the same result within the transaction; prevents non-repeatable reads (PostgreSQL also blocks phantoms); still allows a **serialization anomaly**.\
- **Serializable**: strictest, result as if run serially; prevents every anomaly but costs more and may force a **retry** when a conflict is detected.\
\
Stricter = fewer anomalies but lower concurrency — pick the lowest level that stays correct.
