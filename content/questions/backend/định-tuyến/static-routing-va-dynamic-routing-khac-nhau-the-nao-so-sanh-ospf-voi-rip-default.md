---
id: static-routing-va-dynamic-routing-khac-nhau-the-nao-so-sanh-ospf-voi-rip-default
position: backend
technology: định-tuyến
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Static routing và dynamic routing khác nhau thế nào? So sánh OSPF với RIP; default gateway là gì?

## Question (EN)
How do static and dynamic routing differ? Compare OSPF with RIP; what is a default gateway?

## Đáp án chi tiết (VI)
- Static routing: admin cấu hình tay từng tuyến. Đơn giản, không tốn CPU/băng thông để trao đổi cập nhật, dễ đoán — nhưng không tự thích ứng khi topology đổi hay link chết; chỉ hợp mạng nhỏ, ổn định.\
- Dynamic routing: router tự học và cập nhật tuyến qua một giao thức định tuyến, tự né link hỏng — hợp mạng lớn.\
So sánh hai giao thức dynamic:\
- RIP (distance-vector): chọn đường theo số hop, tối đa 15 hop, hội tụ chậm, đơn giản — lỗi thời với mạng lớn.\
- OSPF (link-state): mỗi router dựng bản đồ toàn mạng rồi chạy Dijkstra tính đường ngắn nhất theo \\"cost\\" (thường dựa trên băng thông); hội tụ nhanh và mở rộng tốt nhờ chia area.\
Default gateway: tuyến mặc định (0.0.0.0/0) — khi đích không khớp tuyến cụ thể nào, gói được gửi tới gateway (thường là router LAN) để ra ngoài.

## Detailed Answer (EN)
- Static routing: an admin configures each route by hand. Simple, no CPU/bandwidth spent exchanging updates, predictable — but it does not adapt when the topology changes or a link fails; suitable only for small, stable networks.\
- Dynamic routing: routers learn and update routes via a routing protocol and automatically avoid failed links — suited to large networks.\
Comparing two dynamic protocols:\
- RIP (distance-vector): picks paths by hop count, max 15 hops, converges slowly, simple — outdated for large networks.\
- OSPF (link-state): each router builds a map of the whole network and runs Dijkstra to compute shortest paths by \\"cost\\" (typically based on bandwidth); it converges quickly and scales well via areas.\
Default gateway: the default route (0.0.0.0/0) — when a destination matches no specific route, the packet is sent to the gateway (usually the LAN router) to reach the outside.
