---
id: quiz-aws-cloud-khoan-nao-thuong-gay-bat-ngo-nhat-tren-hoa-don-aws-cua-mot-he-thong-web-quy-mo-n
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khoản nào thường gây bất ngờ nhất trên hóa đơn AWS của một hệ thống web quy mô nhỏ?

## Đáp án trắc nghiệm
- [ ] Chi phí tạo và xóa security group
- [x] Truyền dữ liệu ra internet và qua NAT
- [ ] Chi phí lưu trữ S3 cho tệp tĩnh
- [ ] Chi phí gọi API quản lý tài nguyên

## Giải thích (VI)
Truyền dữ liệu : dữ liệu ra internet, dữ liệu qua NAT gateway, và lưu lượng chéo giữa các AZ. Chúng tính theo gigabyte nên tăng âm thầm theo lưu lượng, trong khi lúc thiết kế người ta chỉ nhìn giá máy chủ.

### Giải thích các phương án:
- **Chi phí tạo và xóa security group** (Sai): Các đối tượng cấu hình mạng này không tính phí.
- **Truyền dữ liệu ra internet và qua NAT** (Đúng): Hai khoản này tính theo lượng dữ liệu và không hiện rõ khi thiết kế.
- **Chi phí lưu trữ S3 cho tệp tĩnh** (Sai): Giá lưu trữ object rất rẻ ở quy mô nhỏ.
- **Chi phí gọi API quản lý tài nguyên** (Sai): Phần lớn API quản lý không tính phí.
