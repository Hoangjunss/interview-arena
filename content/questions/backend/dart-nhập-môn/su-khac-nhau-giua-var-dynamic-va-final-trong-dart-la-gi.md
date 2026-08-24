---
id: su-khac-nhau-giua-var-dynamic-va-final-trong-dart-la-gi
position: backend
technology: dart-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa `var`, `dynamic`, và `final` trong Dart là gì?

## Question (EN)
What is the difference between `var`, `dynamic`, and `final` in Dart?

## Đáp án chi tiết (VI)
`var` cho phép Dart tự suy luận kiểu dữ liệu một lần lúc khai báo và không thể thay đổi kiểu sau đó. `dynamic` cho phép kiểu thay đổi trong runtime, bỏ qua kiểm tra kiểu tĩnh. `final` tạo biến không thể gán lại sau khi khởi tạo.\
\
Dùng `var` cho biến cục bộ rõ ràng, hạn chế `dynamic` vì phá vỡ type safety, dùng `final` cho giá trị không đổi.

## Detailed Answer (EN)
`var` lets Dart infer the type once at declaration and it cannot change thereafter. `dynamic` allows the type to change at runtime, deferring type checking. `final` creates a variable that cannot be reassigned after initialization. Use `var` for local variables where type is obvious, `dynamic` sparingly, and `final` for values that won't change after assignment.
