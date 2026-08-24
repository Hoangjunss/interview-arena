---
id: quiz-csharp-tinh-nang-nullable-reference-types-c-8-lam-gi-khi-duoc-bat
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tính năng nullable reference types (C# 8) làm gì khi được bật?

## Đáp án trắc nghiệm
- [ ] Tự động khởi tạo mọi reference type non-nullable bằng một object mặc định thay vì null
- [ ] Cho phép value type như int nhận giá trị null (giống Nullable<int>)
- [ ] Khiến CLR ném exception ngay lúc runtime nếu gán null vào một biến string không có ?
- [x] Phân biệt string? với string và bật cảnh báo tĩnh của compiler

## Giải thích (VI)
Nullable reference types (C# 8) là tính năng compile-time. Khi bật, string nghĩa là "không nên null" còn string? là "có thể null"; compiler dùng flow analysis để cảnh báo khi bạn có nguy cơ dereference một giá trị có thể null hoặc gán null vào biến non-nullable. Nó không thêm kiểm tra runtime — chỉ giúp phát hiện lỗi NullReferenceException sớm ngay khi biên dịch.

### Giải thích các phương án:
- **Tự động khởi tạo mọi reference type non-nullable bằng một object mặc định thay vì null** (Sai): NRT không tự khởi tạo gì; nó chỉ cảnh báo tĩnh khi một biến non-nullable có thể còn là null.
- **Cho phép value type như int nhận giá trị null (giống Nullable<int>)** (Sai): Đó là nullable value types (int?, có từ C# 2). NRT nói về reference types.
- **Khiến CLR ném exception ngay lúc runtime nếu gán null vào một biến string không có ?** (Sai): Không có kiểm tra runtime nào được thêm. Nếu bỏ qua cảnh báo, gán null vào string không-nullable vẫn chạy và có thể gây NullReferenceException như trước.
- **Phân biệt string? với string và bật cảnh báo tĩnh của compiler** (Đúng): Đây là tính năng compile-time: annotation ? + flow analysis sinh cảnh báo. Runtime vẫn cho phép null như cũ, không ép buộc. Cảnh báo xuất hiện khi có nguy cơ dereference null; runtime không đổi.
