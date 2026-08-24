---
id: mvcc-la-gi-va-giai-quyet-van-de-gi
position: backend
technology: mvcc
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MVCC là gì và giải quyết vấn đề gì?

## Question (EN)
What is MVCC and what problem does it solve?

## Đáp án chi tiết (VI)
MVCC (**Multi-Version Concurrency Control**) cho phép nhiều transaction đọc/ghi đồng thời mà **đọc không chặn ghi và ghi không chặn đọc**. Thay vì khóa để serialize, DB giữ **nhiều phiên bản** của mỗi hàng.\
\
Cách PostgreSQL làm:\
- Mỗi `UPDATE` **không sửa tại chỗ** mà tạo **phiên bản hàng mới (tuple)**, đánh dấu phiên bản cũ hết hạn.\
- Mỗi transaction thấy một **snapshot** nhất quán tương ứng thời điểm bắt đầu (theo isolation level) → transaction đọc vẫn thấy phiên bản cũ trong khi transaction khác ghi phiên bản mới.\
\
Lợi: concurrency cao, đọc nhất quán không cần khóa đọc. Cái giá — **bloat**: phiên bản cũ (dead tuple) tích lại, cần **VACUUM** dọn để thu hồi không gian và tránh transaction-id wraparound. MVCC cũng là nền tảng cho các mức isolation trong Postgres.

## Detailed Answer (EN)
MVCC (**Multi-Version Concurrency Control**) lets many transactions read/write concurrently so that **reads don't block writes and writes don't block reads**. Instead of locking to serialize, the DB keeps **multiple versions** of each row.\
\
How PostgreSQL does it:\
- An `UPDATE` **does not modify in place** — it creates a **new row version (tuple)** and marks the old one expired.\
- Each transaction sees a consistent **snapshot** tied to its start (per its isolation level) → a reading transaction still sees the old version while another writes a new one.\
\
Benefit: high concurrency, consistent reads without read locks. The cost — **bloat**: old versions (dead tuples) accumulate and need **VACUUM** to reclaim space and prevent transaction-id wraparound. MVCC also underpins Postgres's isolation levels.
