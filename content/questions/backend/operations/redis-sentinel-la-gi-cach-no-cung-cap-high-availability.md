---
id: redis-sentinel-la-gi-cach-no-cung-cap-high-availability
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis Sentinel là gì? Cách nó cung cấp High Availability?

## Question (EN)
What is Redis Sentinel? How does it provide High Availability?

## Đáp án chi tiết (VI)
Redis Sentinel là hệ thống HA cho Redis single-master/replica setup — tự động monitor, notify và failover khi master fail. Sentinel chạy như separate process (thường 3+ Sentinel nodes để quorum). **Chức năng:** Monitoring — Sentinel liên tục ping master và replicas; Notification — alert qua pub/sub khi có vấn đề; Automatic failover — khi master down, Sentinel bầu (quorum majority) và promote replica thành master mới, cập nhật cấu hình các replica còn lại để follow master mới; Service discovery — client query Sentinel để lấy địa chỉ master hiện tại. **Quorum:** số Sentinel tối thiểu phải đồng ý master down để bắt đầu failover — tránh split-brain khi network partition. Setup tối thiểu: 3 Sentinel + 1 master + 1 replica. **Khác với Cluster:** Sentinel không sharding, không scale write horizontally — chỉ HA. Dùng Sentinel khi: cần HA nhưng data fit trong 1 server; dùng Cluster khi: cần scale beyond single server.

## Detailed Answer (EN)
$85
