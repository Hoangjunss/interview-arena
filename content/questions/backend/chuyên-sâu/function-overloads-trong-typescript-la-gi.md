---
id: function-overloads-trong-typescript-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Function overloads trong TypeScript là gì?

## Question (EN)
What are function overloads in TypeScript?

## Đáp án chi tiết (VI)
Function overloads khai báo nhiều function signatures trước implementation. Implementation phải compatible với tất cả overloads. Dùng khi return type khác nhau tùy input type.\
\
```typescript\
function parse(x: string): number;\
function parse(x: number): string;\
function parse(x: any): any {\
  if (typeof x === 'string') return parseInt(x, 10);\
  return String(x);\
}\
\
const n = parse('42');  // n: number\
const s = parse(42);   // s: string\
```

## Detailed Answer (EN)
Function overloads declare multiple function signatures before the implementation. The implementation must be compatible with all overloads. Used when the return type differs depending on the input type.\
\
```typescript\
function parse(x: string): number;\
function parse(x: number): string;\
function parse(x: any): any {\
  if (typeof x === 'string') return parseInt(x, 10);\
  return String(x);\
}\
\
const n = parse('42');  // n: number\
const s = parse(42);   // s: string\
```
