---
id: memory-optimization-trong-redis-cac-ky-thuat-giam-memory-footprint
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Memory optimization trong Redis: các kỹ thuật giảm memory footprint?

## Question (EN)
Memory optimization in Redis: what techniques reduce memory footprint?

## Đáp án chi tiết (VI)
Dùng appropriate data type: Hash thay vì nhiều String key riêng lẻ cho object nhỏ (Redis tự động dùng listpack encoding khi Hash nhỏ hơn `hash-max-listpack-entries` entries và mỗi value nhỏ hơn `hash-max-listpack-value` bytes — memory efficient hơn hashtable). Lưu ý: Redis 7.0 đổi tên ziplist thành listpack; config hiện tại dùng `hash-max-listpack-entries` và `hash-max-listpack-value`. Compressed encoding: Redis tự optimize encoding dựa trên size (listpack, intset, skiplist). Dùng `OBJECT ENCODING key` để xem encoding. Giảm key size: `usr:1001:prf` thay vì `user:1001:profile` tiết kiệm memory nhân với hàng triệu key. Set TTL cho tất cả cache key tránh memory leak. Dùng `MEMORY USAGE key` để đo memory một key, `MEMORY DOCTOR` để chẩn đoán vấn đề memory. Nén value ở application layer (gzip JSON trước khi lưu) giảm 70-80% với JSON lớn. Monitor `used_memory`, `mem_fragmentation_ratio` (\u003e1.5 là vấn đề fragmentation — có thể bật `activedefrag yes` hoặc dùng `MEMORY PURGE` để defragment).

## Detailed Answer (EN)
$88
