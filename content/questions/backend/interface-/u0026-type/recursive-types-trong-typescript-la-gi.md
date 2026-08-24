---
id: recursive-types-trong-typescript-la-gi
position: backend
technology: interface-\u0026-type
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Recursive types trong TypeScript là gì?

## Question (EN)
What are recursive types in TypeScript?

## Đáp án chi tiết (VI)
TypeScript hỗ trợ recursive type aliases. Hữu ích cho tree structures, nested JSON, linked lists.\
\
```typescript\
type TreeNode\u003cT\u003e = {\
  value: T;\
  children: TreeNode\u003cT\u003e[]; // tự tham chiếu\
};\
\
// JSON có thể dùng JSON type chuẩn:\
type Json = string | number | boolean | null\
  | Json[] | { [key: string]: Json };\
```\
\
Interface luôn hỗ trợ recursive (vì là named type), type alias cũng hỗ trợ từ TS 3.7.

## Detailed Answer (EN)
TypeScript supports recursive type aliases. Useful for tree structures, nested JSON, and linked lists.\
\
```typescript\
type TreeNode\u003cT\u003e = {\
  value: T;\
  children: TreeNode\u003cT\u003e[]; // self-reference\
};\
\
// JSON type example:\
type Json = string | number | boolean | null\
  | Json[] | { [key: string]: Json };\
```\
\
Interfaces have always supported recursion (as named types); type aliases also support it since TS 3.7.
