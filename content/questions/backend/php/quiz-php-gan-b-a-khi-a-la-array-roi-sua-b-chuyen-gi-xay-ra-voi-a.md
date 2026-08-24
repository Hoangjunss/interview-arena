---
id: quiz-php-gan-b-a-khi-a-la-array-roi-sua-b-chuyen-gi-xay-ra-voi-a
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gán $b = $a khi $a là array, rồi sửa $b. Chuyện gì xảy ra với $a?

## Đáp án trắc nghiệm
- [ ] $a thay đổi theo nếu array chứa hơn một phần tử
- [ ] PHP báo warning vì gán array phải dùng clone
- [ ] $a thay đổi theo vì hai biến cùng trỏ tới một array
- [x] $a không đổi — array được copy khi gán

## Giải thích (VI)
$a không đổi . Array trong PHP là value type: phép gán (và truyền vào hàm) tạo bản sao. Ngược lại, object được gán theo handle — $b = $obj cho hai biến cùng trỏ một instance, sửa qua $b thì $obj thấy ngay. Đây là khác biệt array/object hay bị hỏi nhất.

### Giải thích các phương án:
- **$a thay đổi theo nếu array chứa hơn một phần tử** (Sai): Kích thước array không ảnh hưởng tới ngữ nghĩa gán.
- **PHP báo warning vì gán array phải dùng clone** (Sai): clone dành cho object; array gán trực tiếp là hợp lệ và tạo bản sao.
- **$a thay đổi theo vì hai biến cùng trỏ tới một array** (Sai): Đó là hành vi của object; array được gán theo giá trị, không theo handle.
- **$a không đổi — array được copy khi gán** (Đúng): Array trong PHP là value type: gán tạo bản sao (copy-on-write), sửa bản này không ảnh hưởng bản kia.
