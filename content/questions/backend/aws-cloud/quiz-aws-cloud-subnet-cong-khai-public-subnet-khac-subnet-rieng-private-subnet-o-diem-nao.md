---
id: quiz-aws-cloud-subnet-cong-khai-public-subnet-khac-subnet-rieng-private-subnet-o-diem-nao
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Subnet công khai (public subnet) khác subnet riêng (private subnet) ở điểm nào?

## Đáp án trắc nghiệm
- [x] Có đường định tuyến ra internet gateway
- [ ] Được đặt tên là public khi tạo subnet
- [ ] Dùng dải địa chỉ IP công khai thay vì dải riêng
- [ ] Cho phép mọi security group mở cổng ra ngoài

## Giải thích (VI)
Chỉ khác nhau ở bảng định tuyến : subnet công khai có đường đi tới internet gateway , subnet riêng thì không. Tài nguyên trong subnet riêng muốn gọi ra internet phải đi qua NAT gateway đặt ở subnet công khai.

### Giải thích các phương án:
- **Có đường định tuyến ra internet gateway** (Đúng): Bảng định tuyến quyết định, không phải tên gọi hay dải địa chỉ.
- **Được đặt tên là public khi tạo subnet** (Sai): Tên gọi chỉ là nhãn, không quyết định hành vi.
- **Dùng dải địa chỉ IP công khai thay vì dải riêng** (Sai): Cả hai đều dùng dải riêng bên trong VPC.
- **Cho phép mọi security group mở cổng ra ngoài** (Sai): Security group là lớp kiểm soát riêng, độc lập với định tuyến.
