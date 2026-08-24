---
id: quiz-csharp-vi-sao-dung-stringbuilder-thay-cho-noi-chuoi-bang-khi-ghep-nhieu-chuoi-trong-von
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao dùng StringBuilder thay cho nối chuỗi bằng + khi ghép nhiều chuỗi trong vòng lặp?

## Đáp án trắc nghiệm
- [ ] StringBuilder an toàn thread mặc định còn string thì không, đó là lý do chính
- [x] string là bất biến (immutable) nên mỗi phép + tạo một chuỗi mới, gây O(n²) cấp phát trong vòng lặp
- [ ] StringBuilder nhanh hơn vì nó nén chuỗi lại để tiết kiệm bộ nhớ khi lưu
- [ ] string không hỗ trợ toán tử +, nên bắt buộc phải dùng StringBuilder

## Giải thích (VI)
Trong C#, string là immutable: mỗi phép + tạo ra một chuỗi mới và copy toàn bộ nội dung cũ. Nối trong vòng lặp n lần vì thế sinh nhiều object trung gian, độ phức tạp tiến tới O(n²). StringBuilder giữ một buffer mutable và Append ghi thẳng vào đó, chỉ mở rộng buffer khi cần, nên nhanh và ít cấp phát hơn hẳn với số lần nối lớn.

### Giải thích các phương án:
- **StringBuilder an toàn thread mặc định còn string thì không, đó là lý do chính** (Sai): Ngược lại — string bất biến nên vốn thread-safe khi đọc; StringBuilder (một instance) không thread-safe. Lý do dùng nó là hiệu năng nối, không phải thread-safety.
- **string là bất biến (immutable) nên mỗi phép + tạo một chuỗi mới, gây O(n²) cấp phát trong vòng lặp** (Đúng): StringBuilder dùng buffer thay đổi được (mutable) nên nối hiệu quả hơn nhiều. Vì string immutable, nối trong loop sinh hàng loạt object trung gian và copy lặp lại; StringBuilder ghi vào buffer nội bộ, tránh phần lớn allocation.
- **StringBuilder nhanh hơn vì nó nén chuỗi lại để tiết kiệm bộ nhớ khi lưu** (Sai): StringBuilder không nén gì; lợi thế đến từ buffer mutable tránh tạo object mới mỗi lần nối.
- **string không hỗ trợ toán tử +, nên bắt buộc phải dùng StringBuilder** (Sai): string có hỗ trợ +; vấn đề là hiệu năng khi lặp nhiều lần, không phải thiếu toán tử.
