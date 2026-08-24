---
id: vpn-va-tunneling-hoat-dong-the-nao
position: backend
technology: bảo-mật-mạng
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
VPN và tunneling hoạt động thế nào?

## Question (EN)
How do VPNs and tunneling work?

## Đáp án chi tiết (VI)
VPN (Virtual Private Network) tạo một \\"đường hầm\\" mã hóa qua mạng công cộng (Internet) để thiết bị truy cập tài nguyên như đang ở trong mạng nội bộ, đồng thời giấu lưu lượng khỏi bên trung gian.\
\
Tunneling là kỹ thuật nền: gói tin gốc (kể cả header IP nội bộ) được đóng gói (encapsulate) làm payload bên trong một gói tin khác, truyền qua Internet tới endpoint VPN; tại đó nó được bóc ra và chuyển tiếp vào mạng đích. Với VPN bảo mật, gói gốc còn được mã hóa trước khi bọc (IPsec, WireGuard, OpenVPN).\
\
Kết quả: (1) bảo mật — nội dung được mã hóa, chống nghe lén trên Wi-Fi công cộng; (2) truy cập từ xa — như đang ngồi trong mạng công ty; (3) ẩn IP thật — bên ngoài chỉ thấy IP của VPN server.

## Detailed Answer (EN)
A VPN (Virtual Private Network) creates an encrypted \\"tunnel\\" over a public network (the Internet) so a device can reach internal resources as if it were on the local network, while hiding the traffic from intermediaries.\
\
Tunneling is the underlying technique: the original packet (including its internal IP header) is encapsulated as the payload inside another packet, transmitted across the Internet to the VPN endpoint, where it is unwrapped and forwarded into the target network. In a secure VPN the original packet is also encrypted before wrapping (IPsec, WireGuard, OpenVPN).\
\
The results: (1) security — encrypted contents resist eavesdropping on public Wi-Fi; (2) remote access — as if sitting inside the corporate network; (3) IP masking — outsiders only see the VPN server's IP.
