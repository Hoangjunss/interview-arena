---
id: quiz-ruby-on-rails-co-che-loc-tham-so-trong-controller-rails-ngan-chan-dieu-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cơ chế lọc tham số trong controller Rails ngăn chặn điều gì?

## Đáp án trắc nghiệm
- [ ] Truy vấn chứa mã độc chèn vào câu lệnh
- [ ] Tham số có kiểu dữ liệu không hợp lệ
- [ ] Yêu cầu gửi từ tên miền khác
- [x] Người dùng gán giá trị cho cột không được phép sửa

## Giải thích (VI)
Nó ngăn gán hàng loạt vào cột không được phép : người dùng thêm một trường vào biểu mẫu và sửa được cả cột đánh dấu quyền quản trị. Controller phải liệt kê rõ những trường nào được nhận.

### Giải thích các phương án:
- **Truy vấn chứa mã độc chèn vào câu lệnh** (Sai): Chèn câu lệnh được ngăn bằng cách truyền tham số cho truy vấn.
- **Tham số có kiểu dữ liệu không hợp lệ** (Sai): Kiểm tra kiểu và giá trị là việc của lớp kiểm tra hợp lệ.
- **Yêu cầu gửi từ tên miền khác** (Sai): Đó là cơ chế chống giả mạo yêu cầu.
- **Người dùng gán giá trị cho cột không được phép sửa** (Đúng): Không lọc thì một trường thêm vào biểu mẫu có thể sửa cả cột quyền quản trị.
