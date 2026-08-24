---
id: websocket-scaling-gap-nhung-thach-thuc-gi-cach-giai-quyet-trong-he-thong-nhieu-s
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WebSocket scaling gặp những thách thức gì? Cách giải quyết trong hệ thống nhiều server?

## Question (EN)
What challenges does WebSocket scaling present? How do you solve them in a multi-server system?

## Đáp án chi tiết (VI)
WebSocket là persistent connection — mỗi connected client chiếm một file descriptor và memory trên server. Với 10,000 concurrent connections, single server có thể chịu được; nhưng khi scale horizontal lên nhiều server, gặp vấn đề: client A kết nối server 1, client B kết nối server 2, làm sao server 1 biết để gửi message tới client B?\
\
Giải pháp:\
(1) Sticky sessions (IP hash) — load balancer luôn route cùng client về cùng server, nhưng không giúp giao tiếp cross-server.\
(2) Pub/Sub broker: tất cả server subscribe vào Redis Pub/Sub hoặc Kafka, khi cần broadcast/unicast thì publish vào broker, server nào cũng nhận được; Socket.IO có adapter pattern cho việc này.\
(3) Dedicated WebSocket service: tách service riêng (Pusher, Ably, AWS API Gateway WebSocket) xử lý connection management.\
\
Ngoài ra: WebSocket không qua CDN cache được; cần load balancer hỗ trợ upgrade protocol (Nginx `proxy_http_version 1.1`, `proxy_set_header Upgrade`).

## Detailed Answer (EN)
Each WebSocket is a persistent connection that consumes a file descriptor and memory on the server. A single server can handle around 10,000 concurrent connections, but horizontal scaling introduces a fan-out problem: client A is connected to server 1, client B is on server 2 — how does server 1 know to forward a message to client B?\
\
Solutions:\
(1) Sticky sessions (IP hash) — the load balancer always routes the same client to the same server, but this does not help cross-server messaging.\
(2) Pub/Sub broker — all servers subscribe to Redis Pub/Sub or Kafka; when a message needs to be broadcast or unicast, it is published to the broker and every server receives it; Socket.IO has an adapter pattern for this.\
(3) Dedicated WebSocket service — offload connection management to a managed service (Pusher, Ably, AWS API Gateway WebSocket).\
\
Additionally: WebSocket connections cannot be cached by a CDN; the load balancer must support protocol upgrades (Nginx `proxy_http_version 1.1` and `proxy_set_header Upgrade`).
