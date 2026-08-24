---
id: quiz-php-viet-name-getname-guest-toan-tu-hoat-dong-the-nao
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết $name = $_GET['name'] ?? 'guest'; — toán tử ?? hoạt động thế nào?

## Đáp án trắc nghiệm
- [ ] Trả về vế phải khi vế trái là giá trị falsy bất kỳ, kể cả 0 và chuỗi rỗng
- [x] Trả vế phải khi vế trái null hoặc chưa tồn tại, không báo lỗi
- [ ] Tương đương gọi empty() — trả vế phải khi giá trị rỗng hoặc bằng 0
- [ ] Báo warning "undefined index" nếu key name chưa tồn tại rồi mới trả về vế phải

## Giải thích (VI)
?? (null coalescing) trả vế phải khi vế trái null hoặc chưa tồn tại , không sinh warning. '0' và '' vẫn được giữ nguyên — khác ?: và empty() vốn coi chúng là "rỗng". Phân biệt: isset() = tồn tại và khác null; empty() = falsy (gồm 0, '0', '', [], null).

### Giải thích các phương án:
- **Trả về vế phải khi vế trái là giá trị falsy bất kỳ, kể cả 0 và chuỗi rỗng** (Sai): Đó là hành vi của ?: (ngắn gọn của ternary); ?? chỉ quan tâm null/chưa tồn tại.
- **Trả vế phải khi vế trái null hoặc chưa tồn tại, không báo lỗi** (Đúng): ?? tương đương isset($x) ? $x : default — chỉ null và chưa khai báo mới rơi sang vế phải.
- **Tương đương gọi empty() — trả vế phải khi giá trị rỗng hoặc bằng 0** (Sai): empty('0') là true nhưng '0' ?? x vẫn trả về '0'; hai thứ khác nhau.
- **Báo warning "undefined index" nếu key name chưa tồn tại rồi mới trả về vế phải** (Sai): Điểm mạnh của ?? là im lặng với key chưa tồn tại, không sinh warning nào.
