---
id: dhcp-cap-phat-ip-dong-the-nao-giai-thich-4-buoc-dora
position: backend
technology: giao-thức
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DHCP cấp phát IP động thế nào? Giải thích 4 bước DORA.

## Question (EN)
How does DHCP assign IP addresses dynamically? Explain the four DORA steps.

## Đáp án chi tiết (VI)
DHCP (Dynamic Host Configuration Protocol) tự động cấp IP và cấu hình mạng (subnet mask, gateway, DNS) cho client, tránh phải đặt IP tĩnh thủ công. Quy trình 4 bước DORA:\
- Discover: client mới broadcast để tìm DHCP server.\
- Offer: server đề nghị một IP kèm lease.\
- Request: client broadcast xác nhận chọn offer đó.\
- Ack: server chốt và ghi nhận lease (thời hạn thuê IP).\
IP được cấp có thời hạn (lease time); client gia hạn (renew) khi dùng hết khoảng nửa lease. Broadcast được dùng vì client chưa có IP để gửi unicast. Trong mạng nhiều subnet, DHCP relay chuyển tiếp request tới một server tập trung.

## Detailed Answer (EN)
DHCP (Dynamic Host Configuration Protocol) automatically assigns an IP and network settings (subnet mask, gateway, DNS) to clients, avoiding manual static configuration. The four-step DORA process:\
- Discover: a new client broadcasts to find a DHCP server.\
- Offer: the server proposes an IP with a lease.\
- Request: the client broadcasts to accept that offer.\
- Ack: the server confirms and records the lease (how long the IP is rented).\
The assigned IP has a lease time; the client renews it around half the lease. Broadcast is used because the client has no IP yet to send unicast. Across multiple subnets, a DHCP relay forwards requests to a centralized server.
