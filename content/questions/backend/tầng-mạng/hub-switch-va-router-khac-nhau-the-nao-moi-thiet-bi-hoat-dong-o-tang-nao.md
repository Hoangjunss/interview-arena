---
id: hub-switch-va-router-khac-nhau-the-nao-moi-thiet-bi-hoat-dong-o-tang-nao
position: backend
technology: tầng-mạng
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hub, switch và router khác nhau thế nào? Mỗi thiết bị hoạt động ở tầng nào?

## Question (EN)
How do a hub, a switch, and a router differ? At which layer does each operate?

## Đáp án chi tiết (VI)
- Hub (tầng 1 — Physical): thiết bị đơn giản, nhận bit ở một cổng rồi lặp lại ra tất cả cổng khác. Mọi thiết bị chung một collision domain, băng thông bị chia sẻ — gần như tuyệt chủng ngày nay.\
- Switch (tầng 2 — Data Link): học MAC address của thiết bị trên mỗi cổng (MAC table) và chỉ chuyển frame tới đúng cổng đích. Mỗi cổng là một collision domain riêng, hiệu năng cao hơn hub nhiều.\
- Router (tầng 3 — Network): kết nối các mạng khác nhau, định tuyến gói tin dựa trên IP, và phân tách broadcast domain. Là thiết bị đưa lưu lượng ra Internet.\
Tóm lại: hub lặp bit, switch chuyển frame theo MAC trong một LAN, router định tuyến gói theo IP giữa các LAN.

## Detailed Answer (EN)
- Hub (layer 1 — Physical): a simple device that receives bits on one port and repeats them out of every other port. All devices share one collision domain and the bandwidth — essentially extinct today.\
- Switch (layer 2 — Data Link): learns the MAC address on each port (MAC table) and forwards a frame only to the correct destination port. Each port is its own collision domain, giving far better performance than a hub.\
- Router (layer 3 — Network): connects different networks, routes packets based on IP, and separates broadcast domains. It is the device that sends traffic out to the Internet.\
In short: a hub repeats bits, a switch forwards frames by MAC within one LAN, and a router routes packets by IP between LANs.
