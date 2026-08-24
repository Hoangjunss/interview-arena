---
id: quiz-ruby-on-rails-viet-dieu-kien-truy-van-bang-cach-ghep-chuoi-voi-d-lieu-nguoi-dung-gay-rui-ro-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết điều kiện truy vấn bằng cách ghép chuỗi với dữ liệu người dùng gây rủi ro gì?

## Đáp án trắc nghiệm
- [ ] Kết quả trả về sai kiểu dữ liệu
- [x] Kẻ tấn công chèn được câu lệnh vào truy vấn
- [ ] Truy vấn chạy chậm hơn do không dùng được chỉ mục
- [ ] Truy vấn không hoạt động với dữ liệu tiếng Việt

## Giải thích (VI)
Dữ liệu người dùng trở thành một phần của câu lệnh nên có thể đổi hoàn toàn ý nghĩa truy vấn, đọc dữ liệu ngoài phạm vi hoặc xoá dữ liệu. Cách đúng là truyền tham số để giá trị luôn được coi là dữ liệu.

### Giải thích các phương án:
- **Kết quả trả về sai kiểu dữ liệu** (Sai): Kiểu dữ liệu không phải vấn đề cốt lõi.
- **Kẻ tấn công chèn được câu lệnh vào truy vấn** (Đúng): Dữ liệu trở thành một phần câu lệnh nên có thể đổi hoàn toàn ý nghĩa truy vấn.
- **Truy vấn chạy chậm hơn do không dùng được chỉ mục** (Sai): Hiệu năng không phải rủi ro chính ở đây.
- **Truy vấn không hoạt động với dữ liệu tiếng Việt** (Sai): Mã hoá ký tự là chuyện khác.
