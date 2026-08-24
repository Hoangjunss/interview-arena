---
id: implement-deep-clone-object-khong-dung-structuredclone
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement deep clone object (không dùng structuredClone)?

## Question (EN)
Implement a deep clone function (without using structuredClone).

## Đáp án chi tiết (VI)
Deep clone sao chép đệ quy toàn bộ nested values mà không giữ reference gốc.\
\
```js\
function deepClone(obj) {\
  if (obj === null || typeof obj !== 'object') return obj;\
  const clone = Array.isArray(obj) ? [] : {};\
  for (const key in obj) {\
    if (obj.hasOwnProperty(key)) clone[key] = deepClone(obj[key]);\
  }\
  return clone;\
}\
```\
\
**Lưu ý:** không handle Date, RegExp, Map, Set, circular refs. Production dùng `structuredClone()` hoặc lodash.

## Detailed Answer (EN)
Recursive approach: `function deepClone(obj) { if (obj === null || typeof obj !== 'object') return obj; const clone = Array.isArray(obj) ? [] : {}; for (const key in obj) { if (obj.hasOwnProperty(key)) clone[key] = deepClone(obj[key]); } return clone; }` \
\
**Note:** does not handle Date, RegExp, Map, Set, or circular references. In production, use `structuredClone()` or lodash.
