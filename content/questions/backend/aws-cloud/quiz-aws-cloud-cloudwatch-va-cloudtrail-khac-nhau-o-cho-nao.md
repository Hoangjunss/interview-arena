---
id: quiz-aws-cloud-cloudwatch-va-cloudtrail-khac-nhau-o-cho-nao
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CloudWatch và CloudTrail khác nhau ở chỗ nào?

## Đáp án trắc nghiệm
- [x] CloudWatch đo vận hành, CloudTrail ghi API
- [ ] CloudWatch dùng cho EC2, CloudTrail dùng cho Lambda
- [ ] CloudWatch ghi lời gọi API, CloudTrail đo hiệu năng
- [ ] Hai dịch vụ này trùng chức năng, chỉ khác giao diện

## Giải thích (VI)
CloudWatch trả lời "hệ thống đang chạy thế nào" — chỉ số, nhật ký ứng dụng, cảnh báo. CloudTrail trả lời "ai đã làm gì" — nhật ký mọi lời gọi API tới tài khoản, dùng cho kiểm toán và điều tra sự cố bảo mật.

### Giải thích các phương án:
- **CloudWatch đo vận hành, CloudTrail ghi API** (Đúng): Một bên là giám sát vận hành, một bên là nhật ký kiểm toán.
- **CloudWatch dùng cho EC2, CloudTrail dùng cho Lambda** (Sai): Cả hai áp dụng cho nhiều dịch vụ, không chia theo loại tài nguyên.
- **CloudWatch ghi lời gọi API, CloudTrail đo hiệu năng** (Sai): Đảo ngược vai trò của hai dịch vụ.
- **Hai dịch vụ này trùng chức năng, chỉ khác giao diện** (Sai): Chúng trả lời hai câu hỏi khác nhau.
