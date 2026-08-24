---
id: quiz-php-nhng-phat-bieu-nao-dung-ve-match-php-8-so-voi-switch
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào đúng về match (PHP 8) so với switch?

## Đáp án trắc nghiệm
- [x] So sánh strict (===), không ép kiểu như switch
- [ ] Cho phép fall-through xuống nhánh dưới nếu bỏ trống nhánh trên
- [ ] Bắt buộc viết break ở cuối mỗi nhánh để tránh chạy lan

## Giải thích (VI)
match khác switch ở ba điểm chính: (1) so sánh strict === , không ép kiểu; (2) là expression — trả về giá trị, gán trực tiếp được, không cần break; (3) không khớp nhánh nào và thiếu default thì ném UnhandledMatchError thay vì im lặng bỏ qua. Không có fall-through — nhiều điều kiện chung kết quả thì liệt kê qua dấu phẩy.

### Giải thích các phương án:
- **So sánh strict (===), không ép kiểu như switch** (Đúng): switch so sánh lỏng (==) nên switch('1') khớp case 1; match yêu cầu đúng kiểu.
- **Cho phép fall-through xuống nhánh dưới nếu bỏ trống nhánh trên** (Sai): match không có fall-through; muốn nhiều điều kiện chung một kết quả thì liệt kê cách nhau dấu phẩy.
- **Bắt buộc viết break ở cuối mỗi nhánh để tránh chạy lan** (Sai): Mỗi nhánh match chỉ là một expression duy nhất, không có break và không chạy lan.
