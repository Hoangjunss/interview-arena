---
id: vi-sao-service-nen-stateless-de-scale-ngang
position: system-design
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao service nên stateless để scale ngang?

## Question (EN)
Why should a service be stateless to scale horizontally?

## Đáp án chi tiết (VI)
**Stateless**: server **không giữ trạng thái phiên trong bộ nhớ** giữa các request — mỗi request tự chứa đủ thông tin, hoặc trạng thái được đẩy ra **kho ngoài dùng chung** (DB, Redis, JWT phía client).\
\
Vì sao quan trọng cho **horizontal scaling** (thêm nhiều instance thay vì làm một máy mạnh hơn):\
- **Request đi tới instance nào cũng được** → load balancer chia tự do, không cần \\"sticky session\\".\
- **Thêm/bớt instance dễ dàng** (autoscale) mà không mất dữ liệu người dùng.\
- **Một instance chết không kéo theo mất session** → chịu lỗi tốt hơn.\
\
Hệ quả thực tế: đừng lưu session/giỏ hàng/bộ đếm trong RAM một instance; đưa ra Redis/DB. Đây cũng là lý do REST đề cao stateless. Dữ liệu **thực sự có trạng thái** (DB) thì tách riêng và scale bằng cơ chế khác (replication/sharding).

## Detailed Answer (EN)
**Stateless**: the server **keeps no session state in memory** between requests — each request carries everything needed, or state is pushed to **shared external storage** (DB, Redis, client-side JWT).\
\
Why it matters for **horizontal scaling** (adding more instances instead of one bigger machine):\
- **Any request can hit any instance** → the load balancer distributes freely, no \\"sticky sessions\\" needed.\
- **Instances add/remove easily** (autoscaling) without losing user data.\
- **One instance dying does not lose sessions** → better fault tolerance.\
\
Practical upshot: do not store sessions/carts/counters in one instance's RAM; move them to Redis/DB. This is also why REST emphasizes statelessness. **Genuinely stateful** data (the DB) is kept separate and scaled by other means (replication/sharding).
