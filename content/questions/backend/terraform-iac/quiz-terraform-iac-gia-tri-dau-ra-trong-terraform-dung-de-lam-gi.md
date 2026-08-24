---
id: quiz-terraform-iac-gia-tri-dau-ra-trong-terraform-dung-de-lam-gi
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giá trị đầu ra trong Terraform dùng để làm gì?

## Đáp án trắc nghiệm
- [x] Phơi thông tin hạ tầng cho nơi khác dùng
- [ ] Ghi nhật ký các bước Terraform đã thực hiện
- [ ] Lưu giá trị biến để lần chạy sau dùng lại
- [ ] Định nghĩa các tham số đầu vào cho module

## Giải thích (VI)
Đầu ra phơi thông tin của hạ tầng vừa tạo như địa chỉ server hay tên kho lưu trữ, để hiển thị cho người dùng, cho module cha, hoặc cho cấu hình khác đọc qua trạng thái từ xa.

### Giải thích các phương án:
- **Phơi thông tin hạ tầng cho nơi khác dùng** (Đúng): Ví dụ địa chỉ máy chủ hoặc chuỗi kết nối, để mô đun cha hay công cụ khác dùng lại.
- **Ghi nhật ký các bước Terraform đã thực hiện** (Sai): Nhật ký là phần riêng của công cụ.
- **Lưu giá trị biến để lần chạy sau dùng lại** (Sai): Biến được cấp giá trị ở mỗi lần chạy, không lưu theo cách này.
- **Định nghĩa các tham số đầu vào cho module** (Sai): Đầu vào là biến, còn đây là đầu ra.
