---
id: vi-sao-can-tang-cache-va-co-nhung-chien-luoc-nao
position: backend
technology: caching
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao cần tầng cache và có những chiến lược nào?

## Question (EN)
Why add a caching layer and what strategies exist?

## Đáp án chi tiết (VI)
Cache giữ dữ liệu hay dùng ở tầng nhanh (RAM, vd **Redis**) → **giảm tải DB**, giảm độ trễ đọc, chịu tải cao hơn. Hợp dữ liệu đọc nhiều-ghi ít, tốn công tính, hoặc chấp nhận hơi cũ.\
\
Chiến lược đọc/ghi:\
- **Cache-aside (lazy loading)**: app đọc cache trước; **miss** thì đọc DB rồi ghi vào cache. Phổ biến nhất; cache chỉ chứa dữ liệu thật được dùng.\
- **Write-through**: ghi đồng thời cache + DB → cache luôn mới, ghi chậm hơn.\
- **Write-behind**: ghi cache trước, đẩy DB sau (nhanh, rủi ro mất dữ liệu nếu sập).\
\
Vô hiệu cache (phần khó nhất):\
- **TTL**: cho hết hạn tự động — đơn giản, chấp nhận cũ trong khoảng TTL.\
- **Xóa/ghi đè** khi dữ liệu nguồn đổi.\
- **Eviction** khi đầy (vd **LRU**).\
\
Lưu ý bẫy: **cache stampede** (nhiều request cùng miss một lúc) → dùng khóa/single-flight; và **stale data** khi vô hiệu sai. \\"Cache invalidation\\" là một trong hai bài toán khó kinh điển của khoa học máy tính.

## Detailed Answer (EN)
A cache keeps hot data in a fast layer (RAM, e.g. **Redis**) → **offloads the DB**, cuts read latency, handles more load. Fits read-heavy/write-light data, expensive-to-compute results, or data that tolerates slight staleness.\
\
Read/write strategies:\
- **Cache-aside (lazy loading)**: read cache first; on a **miss** read the DB then populate the cache. Most common; the cache holds only data actually used.\
- **Write-through**: write cache + DB together → always fresh, slower writes.\
- **Write-behind**: write cache first, flush to DB later (fast, risks loss on crash).\
\
Invalidation (the hard part):\
- **TTL**: auto-expire — simple, tolerates staleness within the TTL.\
- **Delete/overwrite** when the source changes.\
- **Eviction** when full (e.g. **LRU**).\
\
Pitfalls: **cache stampede** (many requests miss at once) → use a lock/single-flight; and **stale data** from wrong invalidation. \\"Cache invalidation\\" is one of the two classic hard problems in computer science.
