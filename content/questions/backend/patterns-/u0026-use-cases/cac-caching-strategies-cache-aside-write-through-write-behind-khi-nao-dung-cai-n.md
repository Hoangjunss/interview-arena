---
id: cac-caching-strategies-cache-aside-write-through-write-behind-khi-nao-dung-cai-n
position: backend
technology: patterns-\u0026-use-cases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các caching strategies: Cache-Aside, Write-Through, Write-Behind — khi nào dùng cái nào?

## Question (EN)
Caching strategies: Cache-Aside, Write-Through, Write-Behind — when should you use each?

## Đáp án chi tiết (VI)
**Cache-Aside (Lazy Loading):** application tự quản lý cache. Read: check cache → miss → query DB → set cache → return. Write: update DB, invalidate hoặc update cache. Ưu điểm: chỉ cache data thực sự được request (no unnecessary warming); linh hoạt. Nhược điểm: cache miss gây thêm latency, cold start problem, potential stampede. Phổ biến nhất cho read-heavy workloads. **Write-Through:** mỗi write cập nhật cả DB lẫn cache đồng thời (application hoặc cache layer). Ưu điểm: cache luôn fresh. Nhược điểm: write latency cao hơn; cache nhiều data ít được đọc (waste memory). Tốt cho write-then-read workloads. **Write-Behind (Write-Back):** write vào cache trước, batch flush xuống DB async sau. Ưu điểm: write latency cực thấp, reduce DB write load. Nhược điểm: risk data loss nếu cache fail trước khi flush; eventual consistency. Dùng cho: high-frequency write (game score, view counter, shopping cart), khi DB write là bottleneck.

## Detailed Answer (EN)
**Cache-Aside (Lazy Loading):** the application manages the cache itself. Read: check cache → miss → query DB → set cache → return. Write: update DB, then invalidate or update the cache. Pros: only caches data that is actually requested (no unnecessary warming); flexible. Cons: cache misses add latency, cold-start problem, potential stampede. The most common strategy for read-heavy workloads. **Write-Through:** every write updates both the DB and the cache simultaneously (in the application or a cache layer). Pros: cache is always fresh. Cons: higher write latency; caches data that may never be read (wastes memory). Best for write-then-read workloads. **Write-Behind (Write-Back):** writes go to the cache first, with an async batch flush to the DB later. Pros: extremely low write latency, reduced DB write load. Cons: risk of data loss if the cache fails before flushing; eventual consistency. Use for: high-frequency writes (game scores, view counters, shopping carts), or when DB writes are the bottleneck.
