---
id: vpc-la-gi-gom-nhung-thanh-phan-nao
position: backend
technology: networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
VPC là gì? Gồm những thành phần nào?

## Question (EN)
What is a VPC and what are its components?

## Đáp án chi tiết (VI)
VPC (Virtual Private Cloud) là **mạng ảo riêng** của bạn trong AWS, cô lập về mặt logic, nơi bạn đặt các tài nguyên (EC2, RDS...) và tự kiểm soát mạng.\
\
Thành phần chính:\
- **Subnet**: chia dải IP của VPC theo AZ. **Public subnet** (có route ra internet) vs **private subnet** (không trực tiếp ra ngoài).\
- **Route table**: quyết định traffic đi đâu.\
- **Internet Gateway (IGW)**: cho public subnet ra/vào internet.\
- **NAT Gateway**: cho private subnet **ra** internet (update, gọi API) mà không nhận kết nối vào.\
- **Security group** (stateful, mức instance) và **NACL** (stateless, mức subnet): lớp kiểm soát traffic.\
\
Mẫu phổ biến: web ở public subnet, DB ở private subnet — DB không lộ ra internet.

## Detailed Answer (EN)
A VPC (Virtual Private Cloud) is your **private virtual network** in AWS, logically isolated, where you place resources (EC2, RDS...) and control networking.\
\
Key components:\
- **Subnet**: divides the VPC IP range per AZ. **Public subnet** (route to the internet) vs **private subnet** (no direct external access).\
- **Route table**: decides where traffic goes.\
- **Internet Gateway (IGW)**: lets public subnets reach the internet.\
- **NAT Gateway**: lets private subnets reach **out** to the internet (updates, API calls) without accepting inbound connections.\
- **Security group** (stateful, instance-level) and **NACL** (stateless, subnet-level): traffic control layers.\
\
Common pattern: web tier in a public subnet, DB in a private subnet — the DB is never exposed to the internet.
