---
id: generic-constraints-extends-trong-typescript-la-gi
position: backend
technology: generics
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generic constraints (extends) trong TypeScript là gì?

## Question (EN)
What are generic constraints (extends) in TypeScript?

## Đáp án chi tiết (VI)
Constraints giới hạn type parameter phải extend một type cụ thể, ngăn dùng với types không compatible.\
```typescript\
// Không có constraint — không access được .length\
function getLength\u003cT\u003e(arg: T): number {\
  return arg.length; // Error!\
}\
\
// Có constraint\
function getLength\u003cT extends { length: number }\u003e(arg: T): number {\
  return arg.length; // OK\
}\
\
// keyof constraint — type-safe property access\
function getProperty\u003cT, K extends keyof T\u003e(obj: T, key: K): T[K] {\
  return obj[key];\
}\
const name = getProperty({ name: 'An', age: 25 }, 'name'); // string\
\
// Multiple constraints\
function merge\u003cT extends object, U extends object\u003e(a: T, b: U): T \u0026 U {\
  return { ...a, ...b };\
}\
```

## Detailed Answer (EN)
Constraints limit a type parameter to extend a specific type, preventing use with incompatible types.\
```typescript\
// Without constraint — cannot access .length\
function getLength\u003cT\u003e(arg: T): number {\
  return arg.length; // Error!\
}\
\
// With constraint\
function getLength\u003cT extends { length: number }\u003e(arg: T): number {\
  return arg.length; // OK\
}\
\
// keyof constraint — type-safe property access\
function getProperty\u003cT, K extends keyof T\u003e(obj: T, key: K): T[K] {\
  return obj[key];\
}\
const name = getProperty({ name: 'An', age: 25 }, 'name'); // string\
\
// Multiple constraints\
function merge\u003cT extends object, U extends object\u003e(a: T, b: U): T \u0026 U {\
  return { ...a, ...b };\
}\
```
