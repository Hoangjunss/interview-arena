---
id: quiz-php-khi-nao-chon-trait-thay-vi-abstract-class-trong-php
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào chọn trait thay vì abstract class trong PHP?

## Đáp án trắc nghiệm
- [ ] Khi cần khai báo hằng số dùng chung cho nhiều class
- [ ] Khi cần buộc các class con implement một danh sách method bắt buộc
- [ ] Khi cần constructor dùng chung cho toàn bộ cây kế thừa
- [x] Khi cần tái sử dụng code ở nhiều class không cùng cây kế thừa

## Giải thích (VI)
Chọn trait khi cần tái sử dụng code ngang hàng ở các class không cùng cây kế thừa — PHP đơn kế thừa nhưng use được nhiều trait. Interface = hợp đồng thuần (chỉ chữ ký). Abstract class = khung chung cho một họ class thật sự cùng bản chất, có state + một phần cài đặt.

### Giải thích các phương án:
- **Khi cần khai báo hằng số dùng chung cho nhiều class** (Sai): Hằng số chia sẻ đặt được ở interface hoặc class thường; không phải lý do chính để dùng trait.
- **Khi cần buộc các class con implement một danh sách method bắt buộc** (Sai): Đó là vai trò của interface (hoặc abstract method); trait chủ yếu để tái sử dụng code.
- **Khi cần constructor dùng chung cho toàn bộ cây kế thừa** (Sai): Constructor chung cho một cây kế thừa là việc của base class, không cần tới trait.
- **Khi cần tái sử dụng code ở nhiều class không cùng cây kế thừa** (Đúng): PHP đơn kế thừa — một class chỉ extends được một class, nhưng use được nhiều trait.
