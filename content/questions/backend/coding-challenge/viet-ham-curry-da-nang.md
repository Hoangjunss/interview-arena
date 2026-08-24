---
id: viet-ham-curry-da-nang
position: backend
technology: coding-challenge
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết hàm curry đa năng?

## Question (EN)
Implement a general-purpose curry function.

## Đáp án chi tiết (VI)
Currying là kỹ thuật biến một hàm nhận nhiều tham số thành chuỗi các hàm mỗi hàm nhận một hoặc vài tham số. Cách implement: `function curry(fn) { return function curried(...args) { if (args.length \u003e= fn.length) return fn(...args); return (...more) =\u003e curried(...args, ...more); }; }` — hàm kiểm tra nếu đủ số tham số thì gọi hàm gốc, chưa đủ thì trả về hàm mới chờ nhận thêm. \
\
**Ví dụ:** `const add = curry((a, b, c) =\u003e a + b + c)` cho phép gọi linh hoạt `add(1)(2)(3)`, `add(1, 2)(3)`, hay `add(1, 2, 3)` đều trả về 6. Đây là câu hỏi phỏng vấn kiểm tra kiến thức functional programming, closures, và khả năng xử lý arguments linh hoạt.

## Detailed Answer (EN)
Currying transforms a function that takes multiple arguments into a chain of functions each taking one or more arguments. Implementation: `function curry(fn) { return function curried(...args) { if (args.length \u003e= fn.length) return fn(...args); return (...more) =\u003e curried(...args, ...more); }; }` — if enough arguments have been collected, call the original function; otherwise return a new function waiting for more. \
\
**Example:** `const add = curry((a, b, c) =\u003e a + b + c)` allows flexible calling: `add(1)(2)(3)`, `add(1, 2)(3)`, or `add(1, 2, 3)` all return 6. This interview question tests functional programming knowledge, closures, and flexible argument handling.
