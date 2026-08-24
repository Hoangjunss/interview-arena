---
id: cac-chien-luoc-caching-cache-aside-write-through-va-cach-vo-hieu-hoa-invalidate
position: backend
technology: caching
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các chiến lược caching (cache-aside, write-through) và cách vô hiệu hóa (invalidate) cache?

## Question (EN)
What caching strategies (cache-aside, write-through) exist and how do you invalidate a cache?

## Đáp án chi tiết (VI)
Cache giữ dữ liệu hay dùng ở tầng nhanh (RAM, vd Redis) → giảm tải DB, tăng tốc đọc.\
\
Chiến lược đọc/ghi:\
- **Cache-aside (lazy loading)**: app đọc cache trước; **miss** thì đọc DB rồi ghi vào cache. Phổ biến nhất; cache chỉ chứa dữ liệu thật được dùng.\
- **Write-through**: ghi đồng thời vào cache và DB → cache luôn mới, nhưng ghi chậm hơn.\
- **Write-behind**: ghi cache trước, đẩy xuống DB sau (nhanh, rủi ro mất dữ liệu nếu sập).\
\
Vô hiệu hóa cache: **TTL** (hết hạn tự động), xóa/ghi đè khi dữ liệu đổi, và **eviction** khi đầy (vd **LRU**). \\"Cache invalidation\\" là một trong hai bài toán khó kinh điển của CS.

## Detailed Answer (EN)
A cache keeps hot data in a fast layer (RAM, e.g. Redis) → offloads the DB and speeds up reads.\
\
Read/write strategies:\
- **Cache-aside (lazy loading)**: the app reads the cache first; on a **miss** it reads the DB then populates the cache. Most common; the cache holds only data actually used.\
- **Write-through**: write to cache and DB together → cache always fresh, but slower writes.\
- **Write-behind**: write to cache first, flush to DB later (fast, risks data loss on crash).\
\
Invalidation: **TTL** (auto-expiry), delete/overwrite on change, and **eviction** when full (e.g. **LRU**). \\"Cache invalidation\\" is one of the two classic hard problems in CS.
