---
id: viet-function-so-sanh-2-objects-deep-equal
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết function so sánh 2 objects deep equal?

## Question (EN)
Write a function to deep-compare two objects for equality.

## Đáp án chi tiết (VI)
Deep equal so sánh đệ quy toàn bộ nested values — không dùng được `===` cho objects.\
\
```js\
function deepEqual(a, b) {\
  if (a === b) return true;\
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;\
  const keysA = Object.keys(a), keysB = Object.keys(b);\
  if (keysA.length !== keysB.length) return false;\
  return keysA.every(key =\u003e deepEqual(a[key], b[key]));\
}\
```\
\
Phỏng vấn thường hỏi để test recursion và edge cases (null, arrays).

## Detailed Answer (EN)
`function deepEqual(a, b) { if (a === b) return true; if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false; const keysA = Object.keys(a), keysB = Object.keys(b); if (keysA.length !== keysB.length) return false; return keysA.every(key =\u003e deepEqual(a[key], b[key])); }` Interviewers ask this to test recursion and edge case handling (null, arrays).
