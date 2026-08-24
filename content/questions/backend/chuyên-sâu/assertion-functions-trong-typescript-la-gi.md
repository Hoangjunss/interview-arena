---
id: assertion-functions-trong-typescript-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Assertion functions trong TypeScript là gì?

## Question (EN)
What are assertion functions in TypeScript?

## Đáp án chi tiết (VI)
Assertion functions có return type `asserts condition` hoặc `asserts param is Type`. Khi function return (không throw), TS assume assertion đúng và narrow type trong phần code tiếp theo.\
\
```typescript\
function assert(cond: unknown, msg = 'assertion failed'): asserts cond {\
  if (!cond) throw new Error(msg);\
}\
\
function assertIsString(val: unknown): asserts val is string {\
  if (typeof val !== 'string') throw new TypeError();\
}\
\
const val: string | undefined = getValue();\
assert(val !== undefined, 'val must exist');\
val.toUpperCase(); // OK — TS biết val là string (không còn undefined)\
```

## Detailed Answer (EN)
Assertion functions have a return type of `asserts condition` or `asserts param is Type`. When the function returns (without throwing), TS assumes the assertion holds and narrows the type in the following code.\
\
```typescript\
function assert(cond: unknown, msg = 'assertion failed'): asserts cond {\
  if (!cond) throw new Error(msg);\
}\
\
function assertIsString(val: unknown): asserts val is string {\
  if (typeof val !== 'string') throw new TypeError();\
}\
\
const val: string | undefined = getValue();\
assert(val !== undefined, 'val must exist');\
val.toUpperCase(); // OK — TS knows val is string (no longer undefined)\
```
