---
id: vpc-la-gi-giai-thich-public-subnet-vs-private-subnet-va-tai-sao-can-phan-tach-ch
position: backend
technology: compute-\u0026-networking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
VPC là gì? Giải thích public subnet vs private subnet và tại sao cần phân tách chúng?

## Question (EN)
What is a VPC? Explain public subnets vs private subnets and why you need to separate them.

## Đáp án chi tiết (VI)
Amazon VPC (Virtual Private Cloud) là mạng ảo riêng biệt, cô lập trong AWS cloud, cho phép bạn kiểm soát hoàn toàn môi trường mạng: chọn IP range (CIDR), tạo subnet, cấu hình route table, gateway.\
\
Public subnet là subnet có route đến Internet Gateway (IGW), các resource trong đó (EC2 với public IP) có thể nhận kết nối từ internet trực tiếp — thường dùng cho load balancer, bastion host, NAT Gateway. Private subnet không có route trực tiếp ra internet; resource muốn ra internet phải đi qua NAT Gateway (một chiều, ra ngoài được nhưng không nhận được kết nối từ ngoài) — thường dùng cho app server, database, Lambda.\
\
Phân tách giúp giảm attack surface: database không bao giờ expose trực tiếp ra internet, chỉ app server trong private subnet mới kết nối được tới DB. Best practice: mỗi AZ có 1 public + 1 private subnet; dùng VPC Flow Logs để audit traffic; dùng VPC Endpoint (PrivateLink) để kết nối AWS services (S3, DynamoDB) mà không cần ra internet.

## Detailed Answer (EN)
$7c
