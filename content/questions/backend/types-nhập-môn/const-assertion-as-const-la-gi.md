---
id: const-assertion-as-const-la-gi
position: backend
technology: types-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
const assertion (as const) là gì?

## Question (EN)
What is a const assertion (as const)?

## Đáp án chi tiết (VI)
as const biến values thành readonly literal types cụ thể nhất. Array thành readonly tuple, object properties thành readonly literal types. \
\
**Ví dụ:** const dirs = ['left', 'right'] as const tạo type readonly ['left', 'right'] thay string[]. Hữu ích để tạo strongly-typed constants.

## Detailed Answer (EN)
as const transforms values into the most specific readonly literal types. Arrays become readonly tuples, object properties become readonly literal types. \
\
**Example:** `const dirs = ['left', 'right'] as const` creates type `readonly ['left', 'right']` instead of `string[]`. Useful for creating strongly-typed constants.
