---
id: amazon-ec2-la-gi
position: backend
technology: compute
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Amazon EC2 là gì?

## Question (EN)
What is Amazon EC2?

## Đáp án chi tiết (VI)
EC2 (Elastic Compute Cloud) cung cấp **máy chủ ảo (instance)** theo yêu cầu — dạng **IaaS**: bạn quản lý OS và phần mềm, AWS lo phần cứng.\
\
- **Instance type**: chọn theo CPU/RAM/GPU cho workload (t/m general, c compute, r memory...).\
- **AMI**: image mẫu để khởi tạo instance (OS + cấu hình sẵn).\
- **EBS**: ổ đĩa block gắn vào instance (persistent).\
- **Security group**: firewall ảo kiểm soát traffic vào/ra.\
- **Pricing**: On-Demand (linh hoạt), Reserved/Savings Plan (cam kết, rẻ hơn), **Spot** (rất rẻ nhưng có thể bị thu hồi).\
\
Hay so với **Lambda** (serverless, không quản server) và **ECS/EKS** (container). EC2 cho toàn quyền kiểm soát máy.

## Detailed Answer (EN)
EC2 (Elastic Compute Cloud) provides on-demand **virtual servers (instances)** — an **IaaS** model: you manage the OS and software, AWS manages the hardware.\
\
- **Instance type**: chosen by CPU/RAM/GPU for the workload (t/m general, c compute, r memory...).\
- **AMI**: a template image to launch instances (OS + preconfigured setup).\
- **EBS**: block storage volumes attached to an instance (persistent).\
- **Security group**: a virtual firewall controlling inbound/outbound traffic.\
- **Pricing**: On-Demand (flexible), Reserved/Savings Plans (committed, cheaper), **Spot** (very cheap but reclaimable).\
\
Often compared with **Lambda** (serverless, no servers to manage) and **ECS/EKS** (containers). EC2 gives full control of the machine.
