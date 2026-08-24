---
id: quiz-aws-cloud-nguyen-nhan-pho-bien-nhat-cua-cac-vu-lo-d-lieu-tu-s3-la-gi
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên nhân phổ biến nhất của các vụ lộ dữ liệu từ S3 là gì?

## Đáp án trắc nghiệm
- [ ] Lỗ hổng bảo mật trong chính dịch vụ S3
- [ ] Dữ liệu không được mã hóa khi lưu trữ
- [ ] Bucket đặt ở vùng địa lý không phù hợp
- [x] Cấu hình cho phép truy cập công khai

## Giải thích (VI)
Cấu hình cho phép truy cập công khai — bucket policy quá rộng, ACL mở, hoặc URL ký sẵn có thời hạn quá dài. Đây là lỗi phía khách hàng, đúng phần khách hàng chịu trách nhiệm trong mô hình trách nhiệm chung.

### Giải thích các phương án:
- **Lỗ hổng bảo mật trong chính dịch vụ S3** (Sai): Hạ tầng thuộc trách nhiệm nhà cung cấp và hiếm khi là nguyên nhân.
- **Dữ liệu không được mã hóa khi lưu trữ** (Sai): Thiếu mã hóa làm nặng thêm hậu quả nhưng không phải nguyên nhân truy cập được.
- **Bucket đặt ở vùng địa lý không phù hợp** (Sai): Vị trí vùng liên quan tới độ trễ và pháp lý, không tạo ra lộ dữ liệu.
- **Cấu hình cho phép truy cập công khai** (Đúng): Lỗi cấu hình phía khách hàng, không phải lỗ hổng của dịch vụ.
