---
id: private-ip-va-public-ip-khac-nhau-the-nao-cac-dai-private-la-gi
position: backend
technology: tầng-mạng
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Private IP và public IP khác nhau thế nào? Các dải private là gì?

## Question (EN)
How do private and public IP addresses differ? What are the private ranges?

## Đáp án chi tiết (VI)
Public IP là địa chỉ định tuyến được trên Internet toàn cầu, duy nhất, do ISP/RIR cấp. Private IP chỉ dùng nội bộ trong LAN, không định tuyến ra Internet, và có thể trùng nhau giữa các mạng khác nhau.\
\
Ba dải private (RFC 1918):\
- 10.0.0.0/8 (10.0.0.0 – 10.255.255.255)\
- 172.16.0.0/12 (172.16.0.0 – 172.31.255.255)\
- 192.168.0.0/16 (192.168.0.0 – 192.168.255.255)\
Thiết bị dùng private IP phải qua NAT để ra Internet. Ngoài ra còn dải loopback 127.0.0.0/8 (localhost) và link-local 169.254.0.0/16 (APIPA, tự gán khi DHCP lỗi).

## Detailed Answer (EN)
A public IP is globally routable on the Internet, unique, and assigned by an ISP/RIR. A private IP is used only inside a LAN, is not routed on the Internet, and can be reused across different networks.\
\
The three private ranges (RFC 1918):\
- 10.0.0.0/8 (10.0.0.0 – 10.255.255.255)\
- 172.16.0.0/12 (172.16.0.0 – 172.31.255.255)\
- 192.168.0.0/16 (192.168.0.0 – 192.168.255.255)\
Devices using private IPs must go through NAT to reach the Internet. Related special ranges include loopback 127.0.0.0/8 (localhost) and link-local 169.254.0.0/16 (APIPA, self-assigned when DHCP fails).
