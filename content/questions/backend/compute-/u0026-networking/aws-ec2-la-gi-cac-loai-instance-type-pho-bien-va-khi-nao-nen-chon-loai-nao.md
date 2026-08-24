---
id: aws-ec2-la-gi-cac-loai-instance-type-pho-bien-va-khi-nao-nen-chon-loai-nao
position: backend
technology: compute-\u0026-networking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
AWS EC2 là gì? Các loại instance type phổ biến và khi nào nên chọn loại nào?

## Question (EN)
What is AWS EC2? What are the common instance types and when should you choose each?

## Đáp án chi tiết (VI)
Amazon EC2 (Elastic Compute Cloud) là dịch vụ cung cấp máy chủ ảo (virtual machines) trên AWS, cho phép khởi chạy, cấu hình và quản lý server với nhiều OS và cấu hình phần cứng khác nhau.\
\
Instance type được nhóm theo họ: T-series (t3, t4g) là burstable general-purpose, phù hợp workload nhẹ, chi phí thấp nhất; M-series (m6i, m7g) là general-purpose cân bằng CPU/RAM, dùng cho web server, app server; C-series (c6i, c7g) tối ưu compute, dùng cho xử lý batch, encoding video; R-series (r6i) tối ưu memory, phù hợp database in-memory, Redis; P/G-series dùng cho GPU workload như ML training.\
\
Pricing model gồm On-Demand (tính theo giây, tối thiểu 60 giây — linh hoạt nhất), Reserved Instances (cam kết 1-3 năm, giảm 30-60%), Spot Instances (dùng capacity dư, giảm đến 90% nhưng có thể bị terminate), và Savings Plans. Best practice: dùng Spot cho batch jobs, Reserved cho production baseline, On-Demand cho traffic spike.

## Detailed Answer (EN)
Amazon EC2 (Elastic Compute Cloud) is a service that provides virtual machines on AWS, allowing you to launch, configure, and manage servers with various operating systems and hardware configurations.\
\
Instance types are grouped by family: T-series (t3, t4g) are burstable general-purpose instances suited for light workloads at the lowest cost; M-series (m6i, m7g) are balanced general-purpose instances used for web servers and app servers; C-series (c6i, c7g) are compute-optimized for batch processing and video encoding; R-series (r6i) are memory-optimized for in-memory databases and Redis; P/G-series are for GPU workloads such as ML training.\
\
Pricing models include On-Demand (billed per-second, 60-second minimum — most flexible), Reserved Instances (1-3 year commitment, 30-60% savings), Spot Instances (use spare capacity, up to 90% cheaper but can be terminated), and Savings Plans. Best practice: use Spot for batch jobs, Reserved for production baseline, and On-Demand for traffic spikes.
