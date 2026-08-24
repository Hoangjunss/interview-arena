---
id: quiz-cpp-template-trong-c-duoc-xu-ly-o-thoi-diem-nao
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Template trong C++ được xử lý ở thời điểm nào?

## Đáp án trắc nghiệm
- [ ] Lúc liên kết, khi các tệp đối tượng được ghép lại
- [x] Lúc biên dịch, sinh mã cho từng kiểu
- [ ] Lúc chạy, kiểu được truyền vào như một tham số
- [ ] Lúc tải chương trình vào bộ nhớ

## Giải thích (VI)
Template được xử lý lúc biên dịch : trình biên dịch sinh một bản mã riêng cho mỗi kiểu được dùng. Vì thế không có chi phí lúc chạy, đổi lại thời gian biên dịch và kích thước mã tăng theo số kiểu khác nhau.

### Giải thích các phương án:
- **Lúc liên kết, khi các tệp đối tượng được ghép lại** (Sai): Bước liên kết chỉ ghép mã đã sinh ra.
- **Lúc biên dịch, sinh mã cho từng kiểu** (Đúng): Vì thế không có chi phí lúc chạy nhưng thời gian biên dịch và kích thước mã tăng theo số kiểu.
- **Lúc chạy, kiểu được truyền vào như một tham số** (Sai): Không có tham số kiểu lúc chạy, mọi thứ được quyết định khi biên dịch.
- **Lúc tải chương trình vào bộ nhớ** (Sai): Không có bước xử lý template khi tải.
