---
id: infer-keyword-trong-conditional-types-la-gi
position: backend
technology: generics
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
infer keyword trong conditional types là gì?

## Question (EN)
What is the infer keyword in conditional types?

## Đáp án chi tiết (VI)
`infer` khai báo type variable trong conditional type để 'capture' type được infer. Chỉ dùng trong `extends` clause.\
```typescript\
// Extract return type của function\
type ReturnType\u003cT\u003e = T extends (...args: any[]) =\u003e infer R ? R : never;\
type R = ReturnType\u003c() =\u003e Promise\u003cstring\u003e\u003e; // Promise\u003cstring\u003e\
\
// Extract params\
type Parameters\u003cT\u003e = T extends (...args: infer P) =\u003e any ? P : never;\
type P = Parameters\u003c(a: string, b: number) =\u003e void\u003e; // [string, number]\
\
// Extract element type từ array\
type UnwrapArray\u003cT\u003e = T extends (infer U)[] ? U : T;\
type U = UnwrapArray\u003cstring[]\u003e; // string\
\
// Extract từ Promise\
type Awaited\u003cT\u003e = T extends Promise\u003cinfer V\u003e ? Awaited\u003cV\u003e : T;\
type V = Awaited\u003cPromise\u003cPromise\u003cnumber\u003e\u003e\u003e; // number\
```\
Cho phép extract nested types từ complex types một cách type-safe.

## Detailed Answer (EN)
`infer` declares a type variable inside a conditional type to capture an inferred type. It can only be used in the `extends` clause.\
```typescript\
// Extract the return type of a function\
type ReturnType\u003cT\u003e = T extends (...args: any[]) =\u003e infer R ? R : never;\
type R = ReturnType\u003c() =\u003e Promise\u003cstring\u003e\u003e; // Promise\u003cstring\u003e\
\
// Extract params\
type Parameters\u003cT\u003e = T extends (...args: infer P) =\u003e any ? P : never;\
type P = Parameters\u003c(a: string, b: number) =\u003e void\u003e; // [string, number]\
\
// Extract element type from array\
type UnwrapArray\u003cT\u003e = T extends (infer U)[] ? U : T;\
type U = UnwrapArray\u003cstring[]\u003e; // string\
\
// Extract from Promise\
type Awaited\u003cT\u003e = T extends Promise\u003cinfer V\u003e ? Awaited\u003cV\u003e : T;\
type V = Awaited\u003cPromise\u003cPromise\u003cnumber\u003e\u003e\u003e; // number\
```\
Allows extracting nested types from complex types in a type-safe way.
