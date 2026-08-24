---
id: quiz-aws-cloud-khi-nao-nen-chon-network-load-balancer-thay-vi-application-load-balancer
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên chọn Network Load Balancer thay vì Application Load Balancer?

## Đáp án trắc nghiệm
- [ ] Khi cần xác thực người dùng ngay tại load balancer
- [ ] Khi cần chấm dứt kết nối HTTPS tại load balancer
- [ ] Khi cần định tuyến theo đường dẫn URL
- [x] Khi cần tầng 4 hoặc địa chỉ IP tĩnh

## Giải thích (VI)
Chọn NLB khi làm việc ở tầng 4 (TCP/UDP), cần độ trễ rất thấp, cần địa chỉ IP tĩnh , hoặc giao thức không phải HTTP. Chọn ALB cho ứng dụng web cần định tuyến theo đường dẫn, theo tên miền, hoặc dùng WebSocket và gRPC.

### Giải thích các phương án:
- **Khi cần xác thực người dùng ngay tại load balancer** (Sai): Tích hợp xác thực là tính năng ở tầng ứng dụng.
- **Khi cần chấm dứt kết nối HTTPS tại load balancer** (Sai): ALB xử lý phần này thuận tiện hơn cho ứng dụng web.
- **Khi cần định tuyến theo đường dẫn URL** (Sai): Định tuyến theo path hoặc host là tính năng của ALB.
- **Khi cần tầng 4 hoặc địa chỉ IP tĩnh** (Đúng): NLB làm việc ở tầng TCP/UDP nên nhanh hơn và hỗ trợ IP tĩnh.
