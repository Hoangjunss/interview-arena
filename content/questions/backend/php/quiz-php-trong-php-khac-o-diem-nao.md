---
id: quiz-php-trong-php-khac-o-diem-nao
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong PHP, == khác === ở điểm nào?

## Đáp án trắc nghiệm
- [x] === so sánh cả kiểu lẫn giá trị, không ép kiểu
- [ ] === chậm hơn == vì phải so sánh thêm kiểu dữ liệu
- [ ] == chỉ dùng được cho số, === dùng được cho mọi kiểu dữ liệu
- [ ] == so sánh giá trị, === so sánh địa chỉ vùng nhớ của biến

## Giải thích (VI)
== ép kiểu hai vế về cùng kiểu rồi mới so sánh (type juggling), nên '1' == '01' là true. === yêu cầu cùng kiểu và cùng giá trị , không ép kiểu — '1' === '01' là false. Mặc định nên dùng === để tránh kết quả bất ngờ.

### Giải thích các phương án:
- **=== so sánh cả kiểu lẫn giá trị, không ép kiểu** (Đúng): == ép kiểu trước khi so sánh (type juggling), còn === yêu cầu cùng kiểu và cùng giá trị.
- **=== chậm hơn == vì phải so sánh thêm kiểu dữ liệu** (Sai): Thực tế === thường nhanh hơn vì kiểu khác nhau thì trả về false ngay, không cần ép kiểu.
- **== chỉ dùng được cho số, === dùng được cho mọi kiểu dữ liệu** (Sai): Cả hai toán tử đều dùng được cho mọi kiểu; khác nhau ở cách so sánh.
- **== so sánh giá trị, === so sánh địa chỉ vùng nhớ của biến** (Sai): PHP không so sánh địa chỉ vùng nhớ; với object thì === so sánh cùng instance, nhưng với scalar là so giá trị + kiểu.
