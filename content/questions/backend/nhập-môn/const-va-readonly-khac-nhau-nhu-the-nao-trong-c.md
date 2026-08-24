---
id: const-va-readonly-khac-nhau-nhu-the-nao-trong-c
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`const` và `readonly` khác nhau như thế nào trong C#?

## Question (EN)
What is the difference between `const` and `readonly` in C#?

## Đáp án chi tiết (VI)
`const` khai báo hằng số tại compile-time, giá trị được nhúng trực tiếp vào bytecode và luôn là `static`. `readonly` cho phép gán một lần duy nhất lúc khai báo hoặc trong constructor, có thể là per-instance. Dùng `const` cho các giá trị thực sự là hằng số không bao giờ thay đổi; dùng `readonly` cho các giá trị được tính toán lúc runtime hoặc cần biến thể theo instance.

## Detailed Answer (EN)
`const` declares compile-time constants with values embedded directly into bytecode and is implicitly static. `readonly` allows a single assignment at declaration or inside a constructor, and can be per-instance. Use `const` for true never-changing constants; use `readonly` for values computed at runtime or needing per-instance variation.
