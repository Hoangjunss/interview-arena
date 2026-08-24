---
id: redis-bitmaps-la-gi-ung-dung-thuc-te-nao-phu-hop-nhat
position: backend
technology: data-structures
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis Bitmaps là gì? Ứng dụng thực tế nào phù hợp nhất?

## Question (EN)
What are Redis Bitmaps? What real-world applications are they best suited for?

## Đáp án chi tiết (VI)
Redis Bitmap không phải data type riêng — đó là String với các bit operation. Mỗi String key có thể chứa đến 512MB = ~4 tỷ bits. Lệnh: `SETBIT key offset 1`, `GETBIT key offset`, `BITCOUNT key` (đếm số bit=1), `BITOP AND/OR/XOR dest key1 key2`. **Use case điển hình:** Daily Active Users (DAU) — dùng user_id làm offset, mỗi ngày một key `active:2024-01-15`; `SETBIT active:2024-01-15 user_id 1` khi user login; `BITCOUNT active:2024-01-15` = số user active hôm nay. Memory: 1 triệu users = 1 triệu bits = 125KB — cực kỳ efficient. **Feature flags per user**: `SETBIT feature:dark-mode user_id 1` để enable tính năng cho user cụ thể. **Streak tracking**: check consecutive days login. **BITPOS**: tìm vị trí bit đầu tiên = 0 hoặc 1 — dùng để assign ID.\
\
**Lưu ý:** nếu user_id lớn (\u003e 100 triệu), bitmap vẫn chỉ tốn 12MB cho 100M users — vẫn hiệu quả.

## Detailed Answer (EN)
Redis Bitmaps are not a separate data type — they are String keys with bit operations applied. Each String key can hold up to 512MB = ~4 billion bits. Commands: `SETBIT key offset 1`, `GETBIT key offset`, `BITCOUNT key` (count bits set to 1), `BITOP AND/OR/XOR dest key1 key2`. **Typical use cases:** Daily Active Users (DAU) — use user_id as the offset, one key per day `active:2024-01-15`; `SETBIT active:2024-01-15 user_id 1` when a user logs in; `BITCOUNT active:2024-01-15` = number of active users today. Memory: 1 million users = 1 million bits = 125KB — extremely efficient. **Feature flags per user**: `SETBIT feature:dark-mode user_id 1` to enable a feature for a specific user. **Streak tracking**: check consecutive login days. **BITPOS**: find the first bit position equal to 0 or 1 — useful for ID assignment.\
\
**Note:** even with large user IDs (\u003e 100 million), a bitmap only uses 12MB for 100M users — still very efficient.
