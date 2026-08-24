---
id: quiz-ruby-on-rails-khai-bao-tai-nguyen-trong-tep-dinh-tuyen-cua-rails-tao-ra-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khai báo tài nguyên trong tệp định tuyến của Rails tạo ra gì?

## Đáp án trắc nghiệm
- [ ] Một tuyến duy nhất cho mọi phương thức HTTP
- [ ] Controller và model tương ứng
- [x] Bảy tuyến chuẩn cho các thao tác thường dùng
- [ ] Các quy tắc kiểm tra quyền cho từng đường dẫn

## Giải thích (VI)
Nó tạo ra bộ bảy tuyến chuẩn cho danh sách, xem chi tiết, biểu mẫu tạo, tạo, biểu mẫu sửa, cập nhật và xoá. Chúng khớp với các hành động cùng tên trong controller theo đúng quy ước đặt tên.

### Giải thích các phương án:
- **Một tuyến duy nhất cho mọi phương thức HTTP** (Sai): Nó tạo ra nhiều tuyến tách theo phương thức và đường dẫn.
- **Controller và model tương ứng** (Sai): Việc sinh mã là lệnh riêng, khai báo tuyến không tạo tệp nào.
- **Bảy tuyến chuẩn cho các thao tác thường dùng** (Đúng): Bộ tuyến chuẩn khớp với các hành động của bộ điều khiển theo quy ước.
- **Các quy tắc kiểm tra quyền cho từng đường dẫn** (Sai): Phân quyền được cài đặt trong bộ điều khiển hoặc lớp riêng.
