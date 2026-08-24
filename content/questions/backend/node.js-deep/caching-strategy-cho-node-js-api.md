---
id: caching-strategy-cho-node-js-api
position: backend
technology: node.js-deep
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Caching strategy cho Node.js API?

## Question (EN)
What are the caching strategies for a Node.js API?

## Đáp án chi tiết (VI)
Caching cho Node.js API hoạt động theo nhiều tầng, mỗi tầng phục vụ mục đích khác nhau. Tầng in-memory dùng node-cache hoặc Map để cache dữ liệu truy cập thường xuyên ngay trong process, truy xuất cực nhanh nhưng mất khi restart. Tầng distributed dùng Redis để cache chia sẻ giữa nhiều server instances, phù hợp cho production.\
\
Pattern phổ biến nhất là cache-aside: kiểm tra cache trước, nếu miss thì query database rồi set vào cache với TTL, ví dụ cache key dạng `users:${id}:profile` với TTL 5 phút.\
\
Phần khó nhất là invalidation — có thể dùng TTL-based (tự hết hạn sau thời gian) hoặc event-based (khi data thay đổi thì xóa cache liên quan), và cần cẩn thận với cache stampede khi nhiều requests cùng miss cache đồng thời.

## Detailed Answer (EN)
Node.js API caching works at multiple layers. In-memory layer: use node-cache or a Map to cache frequently accessed data within the process — ultra-fast access but lost on restart. Distributed layer: use Redis for a shared cache across multiple server instances — suitable for production. The most common pattern is cache-aside: check the cache first; on a miss, query the database, set the result in cache with a TTL (e.g., `users:${id}:profile` with a 5-minute TTL), then return. The hardest part is invalidation — use TTL-based (auto-expiry) or event-based (delete related cache when data changes). Be careful about cache stampede when many requests simultaneously miss the cache.
