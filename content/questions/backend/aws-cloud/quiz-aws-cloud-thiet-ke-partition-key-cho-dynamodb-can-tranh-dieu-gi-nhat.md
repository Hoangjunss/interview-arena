---
id: quiz-aws-cloud-thiet-ke-partition-key-cho-dynamodb-can-tranh-dieu-gi-nhat
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế partition key cho DynamoDB cần tránh điều gì nhất?

## Đáp án trắc nghiệm
- [ ] Khóa trùng với tên thuộc tính khác trong bảng
- [ ] Khóa dùng kiểu chuỗi thay vì kiểu số
- [x] Khóa dồn lưu lượng vào một phân vùng
- [ ] Khóa có giá trị quá dài về số ký tự

## Giải thích (VI)
Tránh phân vùng nóng : khóa có ít giá trị hoặc lệch mạnh (ví dụ dùng ngày hiện tại, hoặc trạng thái đơn hàng) sẽ dồn phần lớn đọc ghi vào một phân vùng và bị chặn thông lượng dù cả bảng vẫn còn dư.

### Giải thích các phương án:
- **Khóa trùng với tên thuộc tính khác trong bảng** (Sai): Không phải ràng buộc thiết kế của DynamoDB.
- **Khóa dùng kiểu chuỗi thay vì kiểu số** (Sai): Kiểu dữ liệu không quyết định hiệu năng phân phối.
- **Khóa dồn lưu lượng vào một phân vùng** (Đúng): Phân vùng nóng làm giới hạn thông lượng dù bảng còn dư năng lực.
- **Khóa có giá trị quá dài về số ký tự** (Sai): Độ dài có giới hạn nhưng hiếm khi là vấn đề thực tế.
