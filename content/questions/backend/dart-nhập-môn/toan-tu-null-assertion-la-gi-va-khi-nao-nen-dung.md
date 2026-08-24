---
id: toan-tu-null-assertion-la-gi-va-khi-nao-nen-dung
position: backend
technology: dart-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toán tử null assertion (`!`) là gì và khi nào nên dùng?

## Question (EN)
What is the null assertion operator (`!`) and when should you use it?

## Đáp án chi tiết (VI)
Toán tử `!` yêu cầu Dart xử lý biến nullable như non-nullable mà không kiểm tra. \
\
**Ví dụ:** `String name = nullableName!` — điều này khẳng định `nullableName` không phải null. Chỉ dùng khi bạn chắc chắn 100% biến không null; nếu sai sẽ ném lỗi runtime. Lạm dụng `!` thường cho thấy thiết kế chưa tốt.

## Detailed Answer (EN)
The `!` operator tells Dart to treat a nullable variable as non-nullable without checking. Use it only when you're 100% certain a variable won't be null; if wrong, it throws a runtime exception. Overuse indicates poor design and should be avoided.
