---
id: collection-expression-trong-c-12-la-gi-va-co-loi-the-gi-ve-hieu-nang
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Collection expression trong C# 12 là gì và có lợi thế gì về hiệu năng?

## Question (EN)
What are collection expressions in C# 12 and what are their performance advantages?

## Đáp án chi tiết (VI)
Collection expression dùng cú pháp ngoặc vuông `[1, 2, 3]` để khởi tạo array, list và span thay cho `new List\u003cint\u003e { 1, 2, 3 }` truyền thống. Hỗ trợ spread operator để ghép collection: `int[] combined = [..array1, ..array2]`. Code ngắn gọn hơn; compiler tối ưu hóa initialization, tránh cấp phát trung gian không cần thiết. Đây là chuẩn code hiện đại trong C#, tương đồng cú pháp với Python/JavaScript.

## Detailed Answer (EN)
Collection expressions use bracket syntax `[1, 2, 3]` to initialize arrays, lists, and spans instead of `new List\u003cint\u003e { 1, 2, 3 }`. They support the spread operator to merge collections: `int[] combined = [..array1, ..array2]`. The compiler optimizes initialization to avoid intermediate allocations. This is the modern C# standard, aligning with Python/JS syntax familiarity.
