---
id: const-constructor-la-gi-va-tai-sao-quan-trong-cho-hieu-nang-flutter
position: backend
technology: widget-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`const` constructor là gì và tại sao quan trọng cho hiệu năng Flutter?

## Question (EN)
What is `const` constructor and why is it important for Flutter performance?

## Đáp án chi tiết (VI)
`const` constructor tạo hằng số compile-time, bất biến và có thể tái sử dụng. Widget `const` bỏ qua rebuild nếu tham số không đổi, cải thiện hiệu năng đáng kể. Flutter có thể gộp các đối tượng `const` giống nhau thành một instance, giảm bộ nhớ. Luôn dùng `const` cho widget với tham số cố định: `const Text(\\"Hello\\")`. Tránh tạo `UniqueKey` trong `const` vì sẽ mất lợi ích.

## Detailed Answer (EN)
A `const` constructor creates compile-time constants that are immutable and reusable. `const` widgets bypass rebuilds if their parameters don't change, significantly improving performance. Flutter can merge identical `const` objects into a single instance, reducing memory usage.
