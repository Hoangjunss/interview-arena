---
id: quiz-flutter-toan-tu-trong-dart-null-safety-lam-gi
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toán tử ! trong Dart null safety làm gì?

## Đáp án trắc nghiệm
- [ ] Đổi biến nullable thành non-nullable vĩnh viễn
- [ ] Bỏ qua lời gọi phương thức nếu giá trị là null
- [x] Khẳng định giá trị khác null, ném lỗi nếu sai
- [ ] Gán giá trị mặc định khi biểu thức là null

## Giải thích (VI)
Toán tử ! là lời khẳng định giá trị khác null . Trình biên dịch tin và cho qua, nhưng lúc chạy nếu giá trị là null thì ném lỗi ngay. Dùng nhiều ! là dấu hiệu mô hình dữ liệu chưa chặt, không phải cách xử lý null.

### Giải thích các phương án:
- **Đổi biến nullable thành non-nullable vĩnh viễn** (Sai): Kiểu khai báo của biến không đổi, toán tử chỉ tác động lên biểu thức đó.
- **Bỏ qua lời gọi phương thức nếu giá trị là null** (Sai): Bỏ qua lời gọi là hành vi của ?., còn ! thì ném lỗi.
- **Khẳng định giá trị khác null, ném lỗi nếu sai** (Đúng): Đây là cam kết của lập trình viên với trình biên dịch, và nó được kiểm tra lúc chạy.
- **Gán giá trị mặc định khi biểu thức là null** (Sai): Gán mặc định là việc của toán tử ??.
