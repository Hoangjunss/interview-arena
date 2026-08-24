---
id: this-trong-class-javascript-la-gi
position: backend
technology: this-\u0026-binding
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
this trong class JavaScript là gì?

## Question (EN)
What is this in a JavaScript class?

## Đáp án chi tiết (VI)
Trong class, this trong constructor và methods trỏ đến instance được tạo. Tuy nhiên, khi truyền method như callback, mất this binding.\
\
```javascript\
class Counter {\
  count = 0;\
\
  // Class field arrow: auto-binds this\
  increment = () =\u003e { this.count++; };\
}\
\
const c = new Counter();\
const { increment } = c; // destructure method\
increment(); // OK — this vẫn là Counter instance\
console.log(c.count); // 1\
```\
\
Giải pháp: dùng arrow function trong class fields (tự bind), bind trong constructor, hoặc .bind() khi truyền callback.

## Detailed Answer (EN)
In a class, this inside the constructor and methods points to the created instance. However, when passing a method as a callback, the this binding is lost.\
\
```javascript\
class Counter {\
  count = 0;\
\
  // Class field arrow: auto-binds this\
  increment = () =\u003e { this.count++; };\
}\
\
const c = new Counter();\
const { increment } = c; // destructure method\
increment(); // OK — this still refers to Counter instance\
console.log(c.count); // 1\
```\
\
Solutions: use arrow functions in class fields (auto-bind), bind in the constructor, or use .bind() when passing callbacks.
