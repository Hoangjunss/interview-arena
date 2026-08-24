---
id: nullable-type-la-gi-va-khi-nao-nen-dung
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nullable type là gì và khi nào nên dùng?

## Question (EN)
What is a nullable type and when should you use it?

## Đáp án chi tiết (VI)
Nullable type cho phép value type nhận giá trị null: `int? age = null;`. Bên dưới nó sử dụng `Nullable\u003cT\u003e` để bọc value type lại. Dùng nullable type khi một giá trị có thể hợp lệ là vắng mặt, chẳng hạn trường tùy chọn hay dữ liệu null từ database. Kiểm tra null bằng thuộc tính `HasValue` hoặc toán tử `??` để cung cấp giá trị mặc định.

## Detailed Answer (EN)
Nullable types allow value types to hold null values: `int? age = null;`. They wrap value types in a `Nullable\u003cT\u003e` container. Use them when a value may legitimately be absent — optional fields or database nulls. Check nullability with the `HasValue` property or the null-coalescing operator `??` to provide defaults.
