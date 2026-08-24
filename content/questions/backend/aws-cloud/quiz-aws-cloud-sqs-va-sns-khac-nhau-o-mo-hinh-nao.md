---
id: quiz-aws-cloud-sqs-va-sns-khac-nhau-o-mo-hinh-nao
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SQS và SNS khác nhau ở mô hình nào?

## Đáp án trắc nghiệm
- [ ] SQS đẩy tin nhắn, SNS để consumer tự kéo về
- [ ] SQS chỉ hoạt động trong một AZ, SNS thì đa vùng
- [ ] SQS dùng cho dữ liệu lớn, SNS cho dữ liệu nhỏ
- [x] SQS là hàng đợi kéo, SNS là phát tán

## Giải thích (VI)
SQS là hàng đợi: tin nhắn nằm chờ, consumer kéo về xử lý rồi xóa — mỗi tin thường chỉ một consumer xử lý. SNS là phát tán: một thông điệp đẩy tới mọi subscriber cùng lúc (nhiều hàng đợi, hàm, email, HTTP).

### Giải thích các phương án:
- **SQS đẩy tin nhắn, SNS để consumer tự kéo về** (Sai): Đảo ngược mô hình của hai dịch vụ.
- **SQS chỉ hoạt động trong một AZ, SNS thì đa vùng** (Sai): Cả hai đều là dịch vụ có quản lý ở phạm vi vùng.
- **SQS dùng cho dữ liệu lớn, SNS cho dữ liệu nhỏ** (Sai): Kích thước tin nhắn không phải tiêu chí phân biệt.
- **SQS là hàng đợi kéo, SNS là phát tán** (Đúng): Một bên có consumer lấy về xử lý, một bên đẩy tới mọi subscriber.
