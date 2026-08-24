---
id: phan-biet-ecs-va-eks-khi-nao-nen-chon-ecs-fargate-thay-vi-eks
position: backend
technology: compute-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt ECS và EKS. Khi nào nên chọn ECS Fargate thay vì EKS?

## Question (EN)
What is the difference between ECS and EKS? When should you choose ECS Fargate over EKS?

## Đáp án chi tiết (VI)
Amazon ECS (Elastic Container Service) là dịch vụ container orchestration native AWS, đơn giản hơn, tích hợp chặt với các dịch vụ AWS khác (IAM, ALB, CloudWatch), phù hợp team không có Kubernetes expertise. Amazon EKS (Elastic Kubernetes Service) là managed Kubernetes, phù hợp khi team đã có K8s knowledge, cần ecosystem K8s (Helm, custom controllers), hoặc cần portability giữa cloud providers.\
\
Fargate là serverless compute engine cho cả ECS và EKS, loại bỏ việc quản lý EC2 node — bạn chỉ định CPU/RAM per task, AWS tự scale; chi phí cao hơn EC2 mode nhưng không cần manage node lifecycle, security patching.\
\
Nên chọn ECS Fargate khi: team nhỏ, muốn đơn giản hóa operations, workload không cần K8s features đặc biệt, và cost không phải ưu tiên hàng đầu. Nên chọn EKS khi: đang migrate từ on-premise K8s, cần stateful workload phức tạp, hoặc cần advanced scheduling (GPU, spot). Với EKS Fargate, không có persistent storage local và không hỗ trợ DaemonSets.

## Detailed Answer (EN)
$87
