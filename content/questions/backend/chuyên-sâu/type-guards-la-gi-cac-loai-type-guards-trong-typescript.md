---
id: type-guards-la-gi-cac-loai-type-guards-trong-typescript
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Type guards là gì? Các loại type guards trong TypeScript?

## Question (EN)
What are type guards? What types of type guards exist in TypeScript?

## Đáp án chi tiết (VI)
Type guards thu hẹp type trong code branch. Loại: 1) typeof, 2) instanceof, 3) in operator, 4) equality, 5) user-defined (function với return type is Type), 6) assertion functions.\
\
```typescript\
function process(val: string | number | null) {\
  if (typeof val === 'string') return val.toUpperCase();\
  if (typeof val === 'number') return val.toFixed(2);\
  return 'null';\
}\
\
// User-defined guard (most powerful)\
function isUser(obj: unknown): obj is { id: string; name: string } {\
  return typeof obj === 'object' \u0026\u0026 obj !== null \u0026\u0026 'id' in obj;\
}\
```

## Detailed Answer (EN)
Type guards narrow a type within a code branch. Types: 1) typeof, 2) instanceof, 3) in operator, 4) equality, 5) user-defined (function with return type `is Type`), 6) assertion functions.\
\
```typescript\
function process(val: string | number | null) {\
  if (typeof val === 'string') return val.toUpperCase();\
  if (typeof val === 'number') return val.toFixed(2);\
  return 'null';\
}\
\
// User-defined guard (most powerful)\
function isUser(obj: unknown): obj is { id: string; name: string } {\
  return typeof obj === 'object' \u0026\u0026 obj !== null \u0026\u0026 'id' in obj;\
}\
```
