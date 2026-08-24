---
id: key-expiration-va-eviction-policy-trong-redis-cac-policy-la-gi-va-khi-nao-dung
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Key expiration và eviction policy trong Redis: các policy là gì và khi nào dùng?

## Question (EN)
Key expiration and eviction policies in Redis: what are the policies and when should you use each?

## Đáp án chi tiết (VI)
Key expiration: dùng `EXPIRE key seconds`, `PEXPIRE key milliseconds`, hoặc `SET key value EX seconds` để tự động xóa key sau khoảng thời gian. Redis kiểm tra expiry theo hai cách: lazy expiration (kiểm tra khi access key) và active expiration (background job mỗi 100ms xóa random sample 20 key trong set expired keys). Eviction policy được áp dụng khi Redis đạt `maxmemory`: `noeviction` (reject write khi full), `allkeys-lru` (xóa key ít dùng nhất gần đây trong toàn bộ keyspace), `volatile-lru` (chỉ xóa key có TTL ít dùng nhất), `allkeys-lfu` (xóa key ít dùng nhất theo frequency — Redis 4.0+), `volatile-ttl` (xóa key có TTL ngắn nhất), `allkeys-random`. Cache dùng `allkeys-lru` hoặc `allkeys-lfu`; session store dùng `volatile-lru`; data không thể mất dùng `noeviction`. Nên set `maxmemory-policy` phù hợp và monitor `evicted_keys` metric.

## Detailed Answer (EN)
Key expiration: use `EXPIRE key seconds`, `PEXPIRE key milliseconds`, or `SET key value EX seconds` to automatically delete keys after a given time. Redis checks expiry in two ways: lazy expiration (checked on access) and active expiration (a background job runs every 100ms and deletes a random sample of expired keys). Eviction policies apply when Redis reaches `maxmemory`: `noeviction` (reject writes when full), `allkeys-lru` (evict the least recently used key from the entire keyspace), `volatile-lru` (evict the least recently used key that has a TTL), `allkeys-lfu` (evict the least frequently used key — Redis 4.0+), `volatile-ttl` (evict the key with the shortest remaining TTL), `allkeys-random`. Use `allkeys-lru` or `allkeys-lfu` for caches; `volatile-lru` for session stores; `noeviction` when data must not be lost. Always set an appropriate `maxmemory-policy` and monitor the `evicted_keys` metric.
