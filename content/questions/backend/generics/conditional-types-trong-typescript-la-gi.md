---
id: conditional-types-trong-typescript-la-gi
position: backend
technology: generics
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Conditional types trong TypeScript là gì?

## Question (EN)
What are conditional types in TypeScript?

## Đáp án chi tiết (VI)
Conditional types: `T extends U ? X : Y`. Evaluate tại compile time dựa vào type relationship.\
```typescript\
// Cơ bản\
type IsString\u003cT\u003e = T extends string ? true : false;\
type A = IsString\u003cstring\u003e; // true\
type B = IsString\u003cnumber\u003e; // false\
\
// Distributive: tự động phân phối trên union\
type NonNullable\u003cT\u003e = T extends null | undefined ? never : T;\
type C = NonNullable\u003cstring | null | undefined\u003e; // string\
\
// Infer: extract type từ bên trong\
type ReturnType\u003cT\u003e = T extends (...args: any[]) =\u003e infer R ? R : never;\
type D = ReturnType\u003c() =\u003e number\u003e; // number\
\
// Thực tế: flatten array type\
type Flatten\u003cT\u003e = T extends Array\u003cinfer Item\u003e ? Item : T;\
type E = Flatten\u003cstring[]\u003e; // string\
type F = Flatten\u003cnumber\u003e;   // number\
```\
Nền tảng của Exclude, Extract, NonNullable, ReturnType, và nhiều utility types.

## Detailed Answer (EN)
Conditional types: `T extends U ? X : Y`. Evaluated at compile time based on the type relationship.\
```typescript\
// Basic\
type IsString\u003cT\u003e = T extends string ? true : false;\
type A = IsString\u003cstring\u003e; // true\
type B = IsString\u003cnumber\u003e; // false\
\
// Distributive: automatically distributes over unions\
type NonNullable\u003cT\u003e = T extends null | undefined ? never : T;\
type C = NonNullable\u003cstring | null | undefined\u003e; // string\
\
// Infer: extract a type from inside another\
type ReturnType\u003cT\u003e = T extends (...args: any[]) =\u003e infer R ? R : never;\
type D = ReturnType\u003c() =\u003e number\u003e; // number\
\
// Practical: flatten an array type\
type Flatten\u003cT\u003e = T extends Array\u003cinfer Item\u003e ? Item : T;\
type E = Flatten\u003cstring[]\u003e; // string\
type F = Flatten\u003cnumber\u003e;   // number\
```\
The foundation of Exclude, Extract, NonNullable, ReturnType, and many other utility types.
