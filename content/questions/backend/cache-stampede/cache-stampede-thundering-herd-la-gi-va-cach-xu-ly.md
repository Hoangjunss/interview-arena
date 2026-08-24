---
id: cache-stampede-thundering-herd-la-gi-va-cach-xu-ly
position: backend
technology: cache-stampede
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache stampede (thundering herd) là gì và cách xử lý?

## Question (EN)
What is a cache stampede (thundering herd) and how do you handle it?

## Đáp án chi tiết (VI)
**Cache stampede** xảy ra khi một key nóng **hết hạn cùng lúc**: hàng loạt request đồng thời **miss** và đồng loạt truy vấn DB để tính lại → DB quá tải đột ngột.\
\
Cách giảm:\
- **Locking / single-flight**: chỉ cho **một** request tính lại, số còn lại chờ kết quả (hoặc dùng giá trị cũ tạm).\
- **Early / probabilistic expiration**: làm mới key sớm một cách ngẫu nhiên trước khi hết hạn, để không phải mọi request cùng rơi vào lúc hết hạn.\
- **Jitter TTL**: cộng thời gian ngẫu nhiên vào TTL → phân tán thời điểm hết hạn.\
- **Stale-while-revalidate**: trả bản cũ ngay, làm mới ở nền.\
\
Hai vấn đề liên quan: **cache penetration** (query key không tồn tại liên tục → cache cả giá trị rỗng), và **cache avalanche** (rất nhiều key hết hạn cùng thời điểm → dùng jitter TTL).

## Detailed Answer (EN)
A **cache stampede** happens when a hot key **expires at the same moment**: many concurrent requests **miss** and all rush to the DB to recompute → sudden DB overload.\
\
Mitigations:\
- **Locking / single-flight**: let only **one** request recompute; the rest wait for its result (or serve the stale value briefly).\
- **Early / probabilistic expiration**: randomly refresh a key shortly before it expires, so not every request hits the expiry at once.\
- **Jitter TTL**: add a random offset to the TTL → spread out expiry times.\
- **Stale-while-revalidate**: serve the stale copy immediately, refresh in the background.\
\
Two related problems: **cache penetration** (repeated queries for a nonexistent key → cache the empty result too) and **cache avalanche** (many keys expiring together → use TTL jitter).
