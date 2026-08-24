---
id: quiz-aws-cloud-ung-dung-chay-tren-ec2-can-doc-d-lieu-tu-s3-cach-cap-quyen-dung-la-gi
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ứng dụng chạy trên EC2 cần đọc dữ liệu từ S3. Cách cấp quyền đúng là gì?

## Đáp án trắc nghiệm
- [ ] Ghi khóa truy cập vào tệp cấu hình trong mã nguồn
- [ ] Mở quyền truy cập công khai cho bucket đó
- [x] Gán IAM role cho EC2 instance
- [ ] Đặt access key và secret key vào biến môi trường

## Giải thích (VI)
Gán IAM role cho EC2 instance. Ứng dụng lấy thông tin xác thực tạm thời qua metadata của máy, tự xoay vòng, và không có khóa dài hạn nào nằm trong code hay biến môi trường.

### Giải thích các phương án:
- **Ghi khóa truy cập vào tệp cấu hình trong mã nguồn** (Sai): Cách nguy hiểm nhất — khóa sẽ theo repository đi khắp nơi.
- **Mở quyền truy cập công khai cho bucket đó** (Sai): Mở bucket ra internet là nguyên nhân của rất nhiều vụ lộ dữ liệu.
- **Gán IAM role cho EC2 instance** (Đúng): Thông tin xác thực được cấp tạm thời và tự xoay vòng, không nằm trong code.
- **Đặt access key và secret key vào biến môi trường** (Sai): Khóa dài hạn dễ bị lộ và phải tự xoay vòng thủ công.
