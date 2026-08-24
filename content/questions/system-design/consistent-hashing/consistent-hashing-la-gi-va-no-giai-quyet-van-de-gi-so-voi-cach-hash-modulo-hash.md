---
id: consistent-hashing-la-gi-va-no-giai-quyet-van-de-gi-so-voi-cach-hash-modulo-hash
position: system-design
technology: consistent-hashing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consistent Hashing là gì và nó giải quyết vấn đề gì so với cách hash modulo (hash(key) % N) thông thường?

## Question (EN)
What is Consistent Hashing and what problem does it solve compared to plain `hash(key) % N`?

## Đáp án chi tiết (VI)
**Vấn đề với `hash(key) % N`:** khi số node `N` thay đổi (thêm/bớt 1 server), gần như **toàn bộ** key bị remap sang node khác → cache miss hàng loạt, rebalance data khổng lồ.\
\
**Consistent Hashing:** đặt cả node và key lên cùng một **vòng tròn hash** (0 → 2^32). Key thuộc về node đầu tiên gặp khi đi **theo chiều kim đồng hồ**.\
\
- Thêm/bớt 1 node chỉ ảnh hưởng **k/N key** (phần nằm giữa node đó và node liền trước), không phải toàn bộ.\
- **Virtual nodes (vnodes):** mỗi node vật lý ánh xạ thành nhiều điểm ảo trên vòng → phân bố đều hơn, tránh node mạnh/yếu lệch tải.\
\
**Hình dung:** mặt đồng hồ tròn; mỗi server cắm vài cái đinh; mỗi key rơi xuống và lăn theo chiều kim đồng hồ tới cây đinh gần nhất.\
\
**Lưu ý:** dùng trong distributed cache (Memcached client), DynamoDB/Cassandra ring, load balancer sticky. Vẫn có thể bị **hot key** nếu một key cụ thể quá nóng — consistent hashing chỉ giải bài toán phân bố, không giải hot key.

## Detailed Answer (EN)
**Problem with `hash(key) % N`:** when node count `N` changes (add/remove one server), almost **all** keys remap to different nodes → mass cache misses and huge data rebalancing.\
\
**Consistent Hashing:** place both nodes and keys on the same **hash ring** (0 → 2^32). A key belongs to the first node found going **clockwise**.\
\
- Adding/removing one node only affects **k/N keys** (the arc between it and the previous node), not everything.\
- **Virtual nodes (vnodes):** each physical node maps to many points on the ring → smoother distribution, avoids load skew.\
\
**Picture:** a round clock face; each server drives in a few pins; each key drops and rolls clockwise to the nearest pin.\
\
**Note:** used in distributed caches (Memcached client), DynamoDB/Cassandra rings, sticky load balancing. It can still suffer a **hot key** if one specific key is too hot — consistent hashing only solves distribution, not hot keys.
