---
id: infrastructure-as-code-iac-la-gi-terraform-giai-quyet-gi
position: backend
technology: iac
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Infrastructure as Code (IaC) là gì? Terraform giải quyết gì?

## Question (EN)
What is Infrastructure as Code (IaC), and what does Terraform solve?

## Đáp án chi tiết (VI)
IaC là **quản lý hạ tầng bằng file cấu hình có version** thay vì thao tác thủ công trên console — hạ tầng được mô tả bằng code, review qua Git, tái tạo nhất quán.\
\
Lợi ích: **lặp lại được** (tạo lại y hệt môi trường), **version + review**, giảm lỗi thủ công (config drift), tự động hóa, tài liệu sống.\
\
**Terraform** (HashiCorp) là công cụ IaC phổ biến:\
- **Declarative**: bạn mô tả **trạng thái mong muốn** (HCL), Terraform tự tính các bước để đạt được.\
- **Provider**: hỗ trợ đa cloud (AWS, GCP, Azure...) qua cùng một cú pháp.\
- **State file**: ghi lại trạng thái thực đang quản lý để so sánh và cập nhật.\
- Quy trình: `plan` (xem trước thay đổi) → `apply` (thực thi) → `destroy`.\
\
Phân biệt: Terraform lo **provisioning hạ tầng** (tạo VPC, EC2...); Ansible/Chef nghiêng về **config management** (cài đặt bên trong máy). Terraform declarative, khác kiểu imperative script.

## Detailed Answer (EN)
IaC means **managing infrastructure through versioned config files** instead of clicking in a console — infrastructure is described as code, reviewed via Git, and reproduced consistently.\
\
Benefits: **reproducibility** (recreate identical environments), **versioning + review**, fewer manual errors (config drift), automation, and living documentation.\
\
**Terraform** (HashiCorp) is a popular IaC tool:\
- **Declarative**: you describe the **desired state** (HCL), and Terraform computes the steps to reach it.\
- **Providers**: multi-cloud (AWS, GCP, Azure...) through one syntax.\
- **State file**: records the managed real state to diff and update.\
- Workflow: `plan` (preview changes) → `apply` (execute) → `destroy`.\
\
Distinction: Terraform handles **infrastructure provisioning** (create VPC, EC2...); Ansible/Chef lean toward **configuration management** (setup inside machines). Terraform is declarative, unlike imperative scripts.
