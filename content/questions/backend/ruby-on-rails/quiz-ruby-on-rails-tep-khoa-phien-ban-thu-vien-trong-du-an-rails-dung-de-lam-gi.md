---
id: quiz-ruby-on-rails-tep-khoa-phien-ban-thu-vien-trong-du-an-rails-dung-de-lam-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tệp khoá phiên bản thư viện trong dự án Rails dùng để làm gì?

## Đáp án trắc nghiệm
- [x] Ghi phiên bản chính xác để mọi máy cài giống nhau
- [ ] Ngăn thư viện được cập nhật lên bản mới
- [ ] Nén thư viện lại để giảm dung lượng khi triển khai
- [ ] Liệt kê các thư viện được phép dùng trong dự án

## Giải thích (VI)
Nó ghi lại phiên bản chính xác của mọi thư viện đã giải , gồm cả phụ thuộc gián tiếp. Nhờ vậy máy cá nhân, hệ thống tích hợp và server cài đúng cùng một bộ, nên phải cam kết nó vào kho mã.

### Giải thích các phương án:
- **Ghi phiên bản chính xác để mọi máy cài giống nhau** (Đúng): Khai báo thường cho phép một khoảng phiên bản, còn tệp khoá chốt đúng bản đã giải.
- **Ngăn thư viện được cập nhật lên bản mới** (Sai): Vẫn cập nhật được bằng lệnh tương ứng.
- **Nén thư viện lại để giảm dung lượng khi triển khai** (Sai): Không có bước nén nào ở đây.
- **Liệt kê các thư viện được phép dùng trong dự án** (Sai): Danh sách khai báo nằm ở tệp khai báo phụ thuộc.
