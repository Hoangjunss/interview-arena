---
id: user-defined-type-guards-type-predicates-la-gi
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
User-defined type guards (type predicates) là gì?

## Question (EN)
What are user-defined type guards (type predicates)?

## Đáp án chi tiết (VI)
Function type với return type `param is Type`. Khi function return true, TS narrow type của param.\
```typescript\
// Type predicate\
function isString(val: unknown): val is string {\
  return typeof val === 'string';\
}\
\
// Sử dụng\
function process(val: string | number) {\
  if (isString(val)) {\
    val.toUpperCase(); // val: string\
  } else {\
    val.toFixed(2);   // val: number\
  }\
}\
\
// Thực tế: kiểm tra object shape\
interface Cat { meow(): void }\
interface Dog { bark(): void }\
\
function isCat(animal: Cat | Dog): animal is Cat {\
  return 'meow' in animal;\
}\
\
// Array filter với type guard\
const items: (string | null)[] = ['a', null, 'b'];\
const strings = items.filter((x): x is string =\u003e x !== null);\
// strings: string[]\
```\
Nguy hiểm: TS tin type predicate hoàn toàn, implementation sai sẽ gây runtime bug mà không có compile error.

## Detailed Answer (EN)
A function with a return type of `param is Type`. When the function returns true, TS narrows the type of the param.\
```typescript\
// Type predicate\
function isString(val: unknown): val is string {\
  return typeof val === 'string';\
}\
\
// Usage\
function process(val: string | number) {\
  if (isString(val)) {\
    val.toUpperCase(); // val: string\
  } else {\
    val.toFixed(2);   // val: number\
  }\
}\
\
// Practical: check object shape\
interface Cat { meow(): void }\
interface Dog { bark(): void }\
\
function isCat(animal: Cat | Dog): animal is Cat {\
  return 'meow' in animal;\
}\
\
// Array filter with type guard\
const items: (string | null)[] = ['a', null, 'b'];\
const strings = items.filter((x): x is string =\u003e x !== null);\
// strings: string[]\
```\
Dangerous: TS fully trusts the type predicate; a wrong implementation causes runtime bugs without compile errors.
