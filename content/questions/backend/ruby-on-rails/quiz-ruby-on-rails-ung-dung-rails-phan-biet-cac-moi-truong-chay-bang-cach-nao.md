---
id: quiz-ruby-on-rails-ung-dung-rails-phan-biet-cac-moi-truong-chay-bang-cach-nao
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ứng dụng Rails phân biệt các môi trường chạy bằng cách nào?

## Đáp án trắc nghiệm
- [x] Qua biến môi trường chọn tệp cấu hình tương ứng
- [ ] Qua cơ sở dữ liệu mà ứng dụng kết nối tới
- [ ] Qua tham số truyền vào khi khởi động server web
- [ ] Qua tên server mà ứng dụng đang chạy trên đó

## Giải thích (VI)
Qua biến môi trường chỉ định môi trường đang chạy, và Rails nạp tệp cấu hình tương ứng. Nhờ đó bản phát triển bật báo lỗi chi tiết và tải lại mã, còn bản sản phẩm bật cache và ẩn chi tiết lỗi.

### Giải thích các phương án:
- **Qua biến môi trường chọn tệp cấu hình tương ứng** (Đúng): Mỗi môi trường có tệp cấu hình riêng nên bật tắt được bộ nhớ đệm, nhật ký và báo lỗi chi tiết.
- **Qua cơ sở dữ liệu mà ứng dụng kết nối tới** (Sai): Cơ sở dữ liệu được chọn theo môi trường chứ không quyết định môi trường.
- **Qua tham số truyền vào khi khởi động server web** (Sai): Cách chuẩn là biến môi trường chứ không phải tham số dòng lệnh.
- **Qua tên server mà ứng dụng đang chạy trên đó** (Sai): Tên máy không quyết định môi trường.
