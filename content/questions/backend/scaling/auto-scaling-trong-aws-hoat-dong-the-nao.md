---
id: auto-scaling-trong-aws-hoat-dong-the-nao
position: backend
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Auto Scaling trong AWS hoạt động thế nào?

## Question (EN)
How does AWS Auto Scaling work?

## Đáp án chi tiết (VI)
Auto Scaling **tự thêm/bớt EC2 instance** theo tải, giữ hiệu năng mà không trả tiền cho tài nguyên nhàn rỗi.\
\
- **Auto Scaling Group (ASG)**: nhóm instance được quản lý, đặt `min` / `desired` / `max`.\
- **Launch template**: khuôn để tạo instance mới (AMI, type, security group).\
- **Scaling policy**: trigger scale — theo **target tracking** (giữ CPU ~50%), **step/simple** (theo ngưỡng CloudWatch), hoặc **scheduled** (theo giờ dự đoán được).\
- **Health check**: instance hỏng bị thay tự động; kết hợp **ELB** để phân phối traffic tới instance khỏe.\
\
Đây là **horizontal scaling** (thêm máy), khác **vertical** (đổi sang instance to hơn). Trải instance qua nhiều **AZ** để vừa scale vừa tăng độ sẵn sàng.

## Detailed Answer (EN)
Auto Scaling **adds/removes EC2 instances** with load, keeping performance without paying for idle capacity.\
\
- **Auto Scaling Group (ASG)**: a managed set of instances with `min` / `desired` / `max`.\
- **Launch template**: the blueprint for new instances (AMI, type, security group).\
- **Scaling policy**: the scale trigger — **target tracking** (keep CPU ~50%), **step/simple** (CloudWatch thresholds), or **scheduled** (predictable time-based).\
- **Health checks**: unhealthy instances are auto-replaced; combined with an **ELB** to distribute traffic to healthy instances.\
\
This is **horizontal scaling** (more machines), unlike **vertical** (moving to a bigger instance). Spread instances across multiple **AZs** for both scale and availability.
