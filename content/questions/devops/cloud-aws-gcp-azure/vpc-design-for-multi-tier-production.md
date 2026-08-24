---
id: vpc-design-for-multi-tier-production
position: devops
technology: cloud-aws-gcp-azure
level: senior
tags: [vpc, networking, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế một VPC production cho hệ thống 3-tier (web/app/database) với yêu cầu bảo mật cao và khả năng mở rộng. Trình bày các quyết định thiết kế quan trọng.

## Question (EN)
Design a production VPC for a 3-tier system (web/app/database) with high security and scalability requirements. Walk through the key design decisions.

## Đáp án chi tiết (VI)
**Kiến trúc tổng quan:**
```
VPC: 10.0.0.0/16 (65,536 IP — đủ room mở rộng dài hạn)
├── AZ-a                          ├── AZ-b                          ├── AZ-c
│   ├── Public subnet (ALB)       │   ├── Public subnet (ALB)       │   ├── Public subnet (ALB)
│   │   10.0.0.0/24               │   │   10.0.1.0/24               │   │   10.0.2.0/24
│   ├── App subnet (private)      │   ├── App subnet (private)      │   ├── App subnet (private)
│   │   10.0.10.0/24              │   │   10.0.11.0/24              │   │   10.0.12.0/24
│   └── DB subnet (isolated)      │   └── DB subnet (isolated)      │   └── DB subnet (isolated)
│       10.0.20.0/24              │       10.0.21.0/24              │       10.0.22.0/24
```

**Quyết định thiết kế quan trọng:**

**1. Phân tầng subnet theo chức năng, không chỉ public/private:**
- **Public subnet**: chỉ chứa ALB/NAT Gateway — không đặt EC2 app trực tiếp ở đây kể cả khi "không có gì nhạy cảm", giảm attack surface.
- **App subnet (private)**: EC2/container xử lý logic, ra internet qua NAT Gateway (gọi API bên thứ 3), nhận traffic từ ALB.
- **DB subnet (isolated/private, không route ra internet)**: RDS/ElastiCache — không cần và không nên có route ra internet dù qua NAT, giảm bề mặt tấn công tối đa (dùng VPC Endpoint nếu DB cần gọi AWS service như KMS, Secrets Manager).

**2. CIDR sizing phải tính trước cho tăng trưởng:**
- `/16` cho VPC, `/24` cho mỗi subnet — đủ cho hàng trăm instance/subnet, tránh phải re-architect VPC sau này (đổi CIDR VPC đang chạy production cực kỳ rủi ro và phức tạp).
- Chừa sẵn CIDR range cho **VPC peering/TGW** với hệ thống khác trong tương lai — tránh CIDR overlap.

**3. Security layering (defense in depth) qua Security Group theo tầng:**
```
SG-alb:  inbound 443 từ 0.0.0.0/0
SG-app:  inbound 8080 chỉ từ SG-alb  (không allow từ CIDR trực tiếp)
SG-db:   inbound 5432 chỉ từ SG-app  (không allow từ CIDR, không allow từ SG-alb)
```
Referencing SG-to-SG (thay vì CIDR) giúp rule tự động đúng khi scale thêm instance mới trong cùng SG, không cần sửa rule thủ công.

**4. NAT Gateway HA — 1 NAT Gateway/AZ:**
Đặt NAT Gateway riêng cho mỗi AZ (không dùng chung 1 NAT cho cả VPC) để tránh single point of failure cross-AZ, dù tốn thêm chi phí — đánh đổi hợp lý cho production.

**5. VPC Flow Logs bật mặc định:**
Ghi log mọi traffic (accept/reject) ở mức ENI/subnet/VPC, gửi vào CloudWatch Logs hoặc S3 — cần thiết cho audit bảo mật, điều tra sự cố, và phát hiện traffic bất thường (ví dụ port scanning nội bộ).

**6. Tách VPC theo môi trường (prod/staging/dev) thay vì chung 1 VPC nhiều subnet:**
Prod và non-prod nên ở **VPC riêng biệt** (hoặc account riêng biệt theo AWS multi-account strategy/Organizations) — tránh rủi ro nhân viên/CI job của staging vô tình ảnh hưởng tới production do lỗi routing/permission.

**7. Private connectivity tới AWS services qua VPC Endpoint:**
Thêm Gateway Endpoint (S3, DynamoDB — miễn phí) và Interface Endpoint (Secrets Manager, KMS, ECR — có phí nhưng traffic không qua internet) để giảm phụ thuộc NAT Gateway và tăng bảo mật (traffic không rời AWS backbone).

**Trade-off cần thảo luận khi phỏng vấn:** thiết kế "chuẩn" này tốn nhiều NAT Gateway + VPC Endpoint hơn kiến trúc đơn giản — với startup giai đoạn đầu (MVP, ít traffic, ngân sách hạn chế), có thể chấp nhận rút gọn (1 NAT Gateway chung, gộp app+db subnet) và refactor dần khi scale, miễn là **tách được DB khỏi public subnet** — đây là ranh giới bảo mật tối thiểu không nên thỏa hiệp.

## Detailed Answer (EN)
**Overall architecture:**
```
VPC: 10.0.0.0/16 (65,536 IPs — enough room for long-term growth)
├── AZ-a                          ├── AZ-b                          ├── AZ-c
│   ├── Public subnet (ALB)       │   ├── Public subnet (ALB)       │   ├── Public subnet (ALB)
│   │   10.0.0.0/24               │   │   10.0.1.0/24               │   │   10.0.2.0/24
│   ├── App subnet (private)      │   ├── App subnet (private)      │   ├── App subnet (private)
│   │   10.0.10.0/24              │   │   10.0.11.0/24              │   │   10.0.12.0/24
│   └── DB subnet (isolated)      │   └── DB subnet (isolated)      │   └── DB subnet (isolated)
│       10.0.20.0/24              │       10.0.21.0/24              │       10.0.22.0/24
```

**Key design decisions:**

**1. Layer subnets by function, not just public/private:**
- **Public subnet**: only holds ALB/NAT Gateway — never place app EC2 instances here directly, even if "nothing sensitive" is exposed, to reduce attack surface.
- **App subnet (private)**: EC2/containers running business logic, reaching the internet via NAT Gateway (calling third-party APIs), receiving traffic from the ALB.
- **DB subnet (isolated/private, no internet route)**: RDS/ElastiCache — should have no internet route at all, not even via NAT, to minimize attack surface (use VPC Endpoints if the DB needs to call AWS services like KMS or Secrets Manager).

**2. Size CIDRs for future growth:**
- `/16` for the VPC, `/24` per subnet — enough for hundreds of instances/subnets, avoiding a VPC re-architecture later (re-CIDRing a running production VPC is extremely risky and complex).
- Reserve CIDR space for future **VPC peering/TGW** connections to other systems — avoiding CIDR overlap.

**3. Security layering (defense in depth) via Security Groups per tier:**
```
SG-alb:  inbound 443 from 0.0.0.0/0
SG-app:  inbound 8080 only from SG-alb  (not directly from any CIDR)
SG-db:   inbound 5432 only from SG-app  (not from a CIDR, not from SG-alb)
```
Referencing SG-to-SG (instead of CIDR) keeps rules correct automatically as new instances scale into the same SG, with no manual rule changes.

**4. NAT Gateway HA — one NAT Gateway per AZ:**
Deploy a dedicated NAT Gateway per AZ (not one shared across the whole VPC) to avoid a cross-AZ single point of failure, despite the extra cost — a reasonable trade-off for production.

**5. Enable VPC Flow Logs by default:**
Log all traffic (accept/reject) at the ENI/subnet/VPC level, sending to CloudWatch Logs or S3 — needed for security audits, incident investigation, and detecting unusual traffic (e.g. internal port scanning).

**6. Separate VPCs per environment (prod/staging/dev) rather than one VPC with many subnets:**
Prod and non-prod should live in **separate VPCs** (or separate accounts under an AWS multi-account/Organizations strategy) — avoiding the risk of a staging employee/CI job accidentally affecting production due to a routing/permission mistake.

**7. Private connectivity to AWS services via VPC Endpoints:**
Add Gateway Endpoints (S3, DynamoDB — free) and Interface Endpoints (Secrets Manager, KMS, ECR — billed but traffic stays off the internet) to reduce NAT Gateway dependency and improve security (traffic never leaves the AWS backbone).

**Trade-off worth discussing in an interview:** this "textbook" design uses more NAT Gateways and VPC Endpoints than a simpler architecture — for an early-stage startup (MVP, low traffic, tight budget), a simplified version (a single shared NAT Gateway, merged app+db subnets) may be acceptable, refactoring later as scale demands, as long as the **DB is kept out of the public subnet** — that is the minimum security boundary that should never be compromised.
