---
id: subnetting-va-cidr-notation-la-gi-cach-tinh-subnet-trong-thuc-te
position: backend
technology: security-\u0026-tooling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Subnetting và CIDR notation là gì? Cách tính subnet trong thực tế?

## Question (EN)
What are subnetting and CIDR notation? How do you calculate subnets in practice?

## Đáp án chi tiết (VI)
CIDR (Classless Inter-Domain Routing) notation: `192.168.1.0/24` — 24 bit đầu là network prefix, 8 bit còn lại là host. `/24` = 256 địa chỉ (2^8), 254 usable (trừ network address và broadcast). Phổ biến: `/8` (class A, 16M hosts), `/16` (class B, 65K hosts), `/24` (class C, 254 hosts). Private ranges: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.\
\
**Tính subnet nhanh:** `/24` → subnet mask `255.255.255.0`; `/25` → 128 hosts, 2 subnet từ `/24`; `/26` → 64 hosts, 4 subnets.\
\
**Trong AWS VPC:** tạo VPC `/16`, chia thành subnets `/24` (1 per AZ) — public subnet (route to Internet Gateway) và private subnet (route to NAT Gateway)"])</script><script>self.__next_f.push([1,". Security Group và Network ACL hoạt động ở layer subnet/instance.\
\
**Thực tế lập trình:** khi Docker tạo container network `172.17.0.0/16`, Kubernetes pod CIDR thường `10.244.0.0/16`, node CIDR `10.0.0.0/24`. Hiểu CIDR giúp debug network connectivity issues giữa containers và services.

## Detailed Answer (EN)
$86
