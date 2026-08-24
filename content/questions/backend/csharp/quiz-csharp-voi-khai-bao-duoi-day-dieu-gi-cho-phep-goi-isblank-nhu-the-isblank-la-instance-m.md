---
id: quiz-csharp-voi-khai-bao-duoi-day-dieu-gi-cho-phep-goi-isblank-nhu-the-isblank-la-instance-m
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với khai báo dưới đây, điều gì cho phép gọi " ".IsBlank() như thể IsBlank là instance method của string?

## Đáp án trắc nghiệm
- [ ] C# dùng reflection để thêm IsBlank vào class String lúc runtime
- [x] Đây là extension method: static method trong static class với modifier this ở tham số đầu
- [ ] StringExtensions kế thừa String nên method của nó xuất hiện trên mọi chuỗi
- [ ] IsBlank trở thành member thật của System.String, mọi project tham chiếu đều tự thấy nó

## Giải thích (VI)
Đó là extension method (C# 3): static method nằm trong static class, tham số đầu mang modifier this chỉ ra kiểu được "mở rộng". Compiler cho phép gọi theo cú pháp instance nhưng thực chất dịch thành lời gọi static — kiểu gốc không bị sửa đổi. Muốn dùng phải using đúng namespace chứa static class. LINQ (Where, Select...) chính là bộ extension method cho IEnumerable<T>.

### Giải thích các phương án:
- **C# dùng reflection để thêm IsBlank vào class String lúc runtime** (Sai): Không có thao tác runtime nào lên kiểu String. Toàn bộ cơ chế diễn ra lúc biên dịch — compiler chỉ đổi cú pháp gọi, IL sinh ra là một lời gọi static thông thường.
- **Đây là extension method: static method trong static class với modifier this ở tham số đầu** (Đúng): Compiler dịch lời gọi thành lời gọi static bình thường, không hề sửa đổi kiểu string. Extension method là cú pháp compile-time: " ".IsBlank() được compiler viết lại thành StringExtensions.IsBlank(" "). Kiểu string không bị thay đổi.
- **StringExtensions kế thừa String nên method của nó xuất hiện trên mọi chuỗi** (Sai): static class không thể kế thừa kiểu khác, và String là sealed nên cũng không cho kế thừa. Extension method không liên quan tới kế thừa.
- **IsBlank trở thành member thật của System.String, mọi project tham chiếu đều tự thấy nó** (Sai): Kiểu String không đổi. Muốn dùng extension method, file gọi phải import namespace chứa static class (qua using); thiếu using thì compiler không tìm thấy method.
