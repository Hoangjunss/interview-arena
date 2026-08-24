---
id: cache-invalidation-va-cache-stampede-la-gi-xu-ly-the-nao
position: system-design
technology: caching
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache invalidation và cache stampede là gì? Xử lý thế nào?

## Question (EN)
What are cache invalidation and cache stampede, and how do you handle them?

## Đáp án chi tiết (VI)
**Cache invalidation** — giữ cache đồng bộ với nguồn. Các cách:\
- **TTL** (hết hạn theo thời gian): đơn giản nhưng có cửa sổ dữ liệu cũ.\
- **Write invalidation**: khi ghi DB thì xóa/cập nhật key liên quan.\
- **Versioned key**: đổi key khi dữ liệu đổi.\
\
**Cache stampede (thundering herd)**: một key nóng hết hạn, **rất nhiều request cùng miss** và đồng loạt đánh vào DB → quá tải. Giảm thiểu bằng:\
- **Lock / single-flight**: chỉ một request được nạp lại, số còn lại chờ.\
- **Early/probabilistic recomputation**: làm mới trước khi hết hạn.\
- **Jitter cho TTL**: tránh nhiều key hết hạn cùng lúc.\
- **Stale-while-revalidate**: trả bản cũ trong lúc nạp mới nền.

## Detailed Answer (EN)
**Cache invalidation** — keeping the cache in sync with the source. Options:\
- **TTL** (time-based expiry): simple but leaves a stale window.\
- **Write invalidation**: on a DB write, delete/update the related keys.\
- **Versioned keys**: change the key when the data changes.\
\
**Cache stampede (thundering herd)**: a hot key expires and **many requests miss at once**, all hitting the DB → overload. Mitigations:\
- **Lock / single-flight**: only one request reloads, the rest wait.\
- **Early/probabilistic recomputation**: refresh before expiry.\
- **TTL jitter**: avoid many keys expiring simultaneously.\
- **Stale-while-revalidate**: serve the stale value while refreshing in the background.
