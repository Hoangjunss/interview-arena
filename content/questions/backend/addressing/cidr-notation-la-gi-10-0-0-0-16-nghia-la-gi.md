---
id: cidr-notation-la-gi-10-0-0-0-16-nghia-la-gi
position: backend
technology: addressing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CIDR notation là gì? `10.0.0.0/16` nghĩa là gì?

## Question (EN)
What is CIDR notation, and what does `10.0.0.0/16` mean?

## Đáp án chi tiết (VI)
CIDR (Classless Inter-Domain Routing) là cách ký hiệu một **dải địa chỉ mạng** dạng `IP/prefix`, trong đó **prefix** là số **bit đầu dành cho phần mạng**, phần còn lại là **host**.\
\
- `10.0.0.0/16` → **16 bit** đầu là mạng, còn **16 bit** cho host → khoảng **65.536** địa chỉ (`10.0.0.0`–`10.0.255.255`).\
- `10.0.1.0/24` → 24 bit mạng, 8 bit host → **256** địa chỉ.\
- Công thức số địa chỉ: **2^(32 − prefix)** (với IPv4). **Prefix càng lớn → mạng càng nhỏ**.\
- `0.0.0.0/0` = **mọi địa chỉ** (default route, hay dùng trong bảng route/firewall rule).\
\
Ứng dụng DevOps: chia **subnet trong VPC**, viết **security group / route table**, giới hạn dải IP được phép truy cập. Lưu ý một vài địa chỉ trong dải bị dành riêng (network, broadcast, gateway).

## Detailed Answer (EN)
CIDR (Classless Inter-Domain Routing) notates a **network address range** as `IP/prefix`, where the **prefix** is the number of **leading bits for the network** part, the rest being **host** bits.\
\
- `10.0.0.0/16` → the first **16 bits** are the network, the other **16 bits** are host → about **65,536** addresses (`10.0.0.0`–`10.0.255.255`).\
- `10.0.1.0/24` → 24 network bits, 8 host bits → **256** addresses.\
- Address count formula: **2^(32 − prefix)** (for IPv4). A **larger prefix → a smaller network**.\
- `0.0.0.0/0` = **all addresses** (the default route, common in route tables/firewall rules).\
\
DevOps uses: carving **subnets in a VPC**, writing **security groups / route tables**, restricting allowed IP ranges. Note a few addresses in a range are reserved (network, broadcast, gateway).
