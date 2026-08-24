---
id: quiz-ruby-on-rails-nguyen-tac-quy-uoc-hon-cau-hinh-trong-rails-nghia-la-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên tắc quy ước hơn cấu hình trong Rails nghĩa là gì?

## Đáp án trắc nghiệm
- [x] Đặt tên theo quy ước thì không phải khai báo thêm
- [ ] Mọi thứ đều được cấu hình trong một tệp duy nhất
- [ ] Cấu hình được sinh tự động từ cơ sở dữ liệu
- [ ] Không thể thay đổi hành vi mặc định của khung

## Giải thích (VI)
Đặt tên và tổ chức thư mục theo quy ước thì Rails tự nối các phần lại mà không cần khai báo: lớp model số ít khớp bảng số nhiều, tên tệp khớp tên lớp, thư mục khớp vai trò.

### Giải thích các phương án:
- **Đặt tên theo quy ước thì không phải khai báo thêm** (Đúng): Lớp và bảng khớp tên theo quy ước nên Rails tự nối chúng mà không cần tệp cấu hình.
- **Mọi thứ đều được cấu hình trong một tệp duy nhất** (Sai): Ngược lại, mục tiêu là giảm số thứ phải cấu hình.
- **Cấu hình được sinh tự động từ cơ sở dữ liệu** (Sai): Không có bước sinh cấu hình tự động như vậy.
- **Không thể thay đổi hành vi mặc định của khung** (Sai): Vẫn ghi đè được khi cần, chỉ là mặc định đã hợp lý.
