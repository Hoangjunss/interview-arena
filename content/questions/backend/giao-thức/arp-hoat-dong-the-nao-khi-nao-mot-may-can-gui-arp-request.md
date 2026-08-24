---
id: arp-hoat-dong-the-nao-khi-nao-mot-may-can-gui-arp-request
position: backend
technology: giao-thức
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ARP hoạt động thế nào? Khi nào một máy cần gửi ARP request?

## Question (EN)
How does ARP work? When does a host need to send an ARP request?

## Đáp án chi tiết (VI)
ARP (Address Resolution Protocol) ánh xạ IP address (tầng 3) sang MAC address (tầng 2) trong cùng một LAN. Khi máy A muốn gửi gói tới một IP đích cùng subnet nhưng chưa biết MAC của nó, A broadcast một ARP request (\\"Ai đang giữ IP 192.168.1.5?\\") ra toàn LAN. Máy sở hữu IP đó trả lời bằng ARP reply (unicast) chứa MAC của mình. A lưu cặp IP↔MAC vào ARP cache (có TTL) để lần sau khỏi hỏi lại.\
\
Nếu đích nằm khác subnet, A không ARP đích trực tiếp mà ARP để lấy MAC của default gateway rồi gửi frame tới router. ARP spoofing (giả mạo reply) là một vector tấn công MITM phổ biến bên trong LAN.

## Detailed Answer (EN)
ARP (Address Resolution Protocol) maps an IP address (layer 3) to a MAC address (layer 2) within the same LAN. When host A wants to send a packet to a destination IP on the same subnet but does not yet know its MAC, it broadcasts an ARP request (\\"Who has 192.168.1.5?\\") to the whole LAN. The host owning that IP replies with a unicast ARP reply carrying its MAC. A stores the IP↔MAC pair in its ARP cache (with a TTL) to avoid asking again.\
\
If the destination is on a different subnet, A does not ARP the destination directly; it ARPs for the MAC of the default gateway and sends the frame to the router. ARP spoofing (forging replies) is a common MITM attack vector inside a LAN.
