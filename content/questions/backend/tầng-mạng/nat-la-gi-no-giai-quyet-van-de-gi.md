---
id: nat-la-gi-no-giai-quyet-van-de-gi
position: backend
technology: tầng-mạng
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
NAT là gì? Nó giải quyết vấn đề gì?

## Question (EN)
What is NAT? What problem does it solve?

## Đáp án chi tiết (VI)
NAT (Network Address Translation) dịch địa chỉ IP private bên trong LAN thành một IP public khi ra Internet, và dịch ngược lại khi phản hồi về. Router giữ một bảng NAT map cặp (private IP:port ↔ public IP:port).\
\
Vấn đề nó giải: IPv4 chỉ có ~4 tỉ địa chỉ, không đủ cho mọi thiết bị. NAT (dạng PAT/overload) cho phép hàng trăm thiết bị trong nhà hay công ty chia sẻ một IP public duy nhất, phân biệt nhau qua port. Hệ quả phụ: thiết bị sau NAT không thể bị kết nối vào trực tiếp từ ngoài (một lớp che chắn), nhưng gây khó cho P2P/VoIP — cần kỹ thuật NAT traversal (STUN/TURN). IPv6 với không gian địa chỉ khổng lồ làm giảm nhu cầu NAT.

## Detailed Answer (EN)
NAT (Network Address Translation) rewrites private IP addresses inside a LAN into a public IP when traffic leaves for the Internet, and back again on the reply. The router keeps a NAT table mapping (private IP:port ↔ public IP:port).\
\
The problem it solves: IPv4 has only ~4 billion addresses, far too few for every device. NAT (in its PAT/overload form) lets hundreds of devices in a home or office share a single public IP, distinguished by port. A side effect: devices behind NAT cannot be reached directly from outside (a shielding layer), but this complicates P2P/VoIP and requires NAT traversal techniques (STUN/TURN). IPv6, with its vast address space, reduces the need for NAT.
