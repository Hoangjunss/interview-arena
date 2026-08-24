---
id: type-narrowing-la-gi-cac-cach-narrow-type-trong-typescript
position: backend
technology: types-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Type narrowing là gì? Các cách narrow type trong TypeScript?

## Question (EN)
What is type narrowing? What are the ways to narrow a type in TypeScript?

## Đáp án chi tiết (VI)
Type narrowing là thu hẹp type trong code branch dựa trên kiểm tra. TypeScript tự động narrow trong if/else, switch, ternary.\
\
```typescript\
function process(val: string | number | Date) {\
  if (typeof val === 'string') return val.toUpperCase(); // typeof\
  if (val instanceof Date) return val.toISOString();    // instanceof\
  return val.toFixed(2);                                 // number\
}\
\
// User-defined type guard\
function isUser(obj: unknown): obj is User {\
  return typeof obj === 'object' \u0026\u0026 obj !== null \u0026\u0026 'id' in obj;\
}\
```

## Detailed Answer (EN)
Type narrowing refines a type within a code branch based on checks. TypeScript automatically narrows within if/else, switch, and ternary expressions.\
\
```typescript\
function process(val: string | number | Date) {\
  if (typeof val === 'string') return val.toUpperCase(); // typeof\
  if (val instanceof Date) return val.toISOString();    // instanceof\
  return val.toFixed(2);                                 // number\
}\
\
// User-defined type guard\
function isUser(obj: unknown): obj is User {\
  return typeof obj === 'object' \u0026\u0026 obj !== null \u0026\u0026 'id' in obj;\
}\
```
