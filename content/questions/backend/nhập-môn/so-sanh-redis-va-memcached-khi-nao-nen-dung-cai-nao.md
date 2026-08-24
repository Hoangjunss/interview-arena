---
id: so-sanh-redis-va-memcached-khi-nao-nen-dung-cai-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh Redis và Memcached: khi nào nên dùng cái nào?

## Question (EN)
Compare Redis and Memcached: when should you use each?

## Đáp án chi tiết (VI)
Memcached là pure cache với chỉ một kiểu dữ liệu (string), multi-threaded, đơn giản. Redis có nhiều kiểu dữ liệu (String, Hash, List, Set, Sorted Set, Stream, HyperLogLog, Geospatial), hỗ trợ persistence, pub/sub, transactions, Lua scripting, clustering native. Redis phù hợp cho hầu hết use case hiện đại. Nên dùng Memcached khi: chỉ cần simple key-value cache, muốn tận dụng multi-threading tốt hơn cho CPU-bound workload (hiếm gặp trong practice), team đã quen thuộc. Nên dùng Redis khi: cần data structure phong phú, persistence, pub/sub, session store, rate limiting, leaderboard, distributed lock — về cơ bản hầu hết mọi trường hợp. Trong thực tế, Redis đã thay thế Memcached ở phần lớn use case mới; Memcached chỉ còn được dùng trong legacy system.

## Detailed Answer (EN)
Memcached is a pure cache with a single data type (string), is multi-threaded, and is straightforward to operate. Redis supports rich data types (String, Hash, List, Set, Sorted Set, Stream, HyperLogLog, Geospatial), persistence, pub/sub, transactions, Lua scripting, and native clustering — making it suitable for the vast majority of modern use cases. Choose Memcached when: you only need simple key-value caching, want better multi-threading for CPU-bound workloads (rare in practice), or your team is already familiar with it. Choose Redis when: you need rich data structures, persistence, pub/sub, session storage, rate limiting, leaderboards, or distributed locks — essentially almost every scenario. In practice, Redis has replaced Memcached in most new projects; Memcached is mainly found in legacy systems.
