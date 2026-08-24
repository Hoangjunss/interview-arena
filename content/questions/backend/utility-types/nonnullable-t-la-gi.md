---
id: nonnullable-t-la-gi
position: backend
technology: utility-types
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`NonNullable\u003cT\u003e` là gì?

## Question (EN)
What is `NonNullable\u003cT\u003e`?

## Đáp án chi tiết (VI)
`NonNullable\u003cT\u003e` loại bỏ `null` và `undefined` khỏi type T: `NonNullable\u003cstring | null | undefined\u003e` cho ra `string`. Tương đương với `Exclude\u003cT, null | undefined\u003e`. Hay dùng sau khi đã kiểm tra null ở runtime nhưng TypeScript vẫn chưa tự narrow được — ví dụ kết quả từ `Array.find()` có type `T | undefined`, sau khi guard check có thể cast về `NonNullable`. Với strictNullChecks bật, đây là utility cần thiết để làm việc với optional values an toàn.

## Detailed Answer (EN)
`NonNullable\u003cT\u003e` removes `null` and `undefined` from type T: `NonNullable\u003cstring | null | undefined\u003e` gives `string`. Equivalent to `Exclude\u003cT, null | undefined\u003e`. Often used after null checking at runtime when TypeScript has not automatically narrowed the type — for example, `Array.find()` returns `T | undefined`, and after a guard check you can cast it to `NonNullable`. With strictNullChecks enabled, this utility is essential for safely working with optional values.
