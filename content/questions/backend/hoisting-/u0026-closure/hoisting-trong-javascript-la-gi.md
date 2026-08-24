---
id: hoisting-trong-javascript-la-gi
position: backend
technology: hoisting-\u0026-closure
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hoisting trong JavaScript là gì?

## Question (EN)
What is hoisting in JavaScript?

## Đáp án chi tiết (VI)
Hoisting nghĩa là JavaScript xử lý phần khai báo trước khi chạy code theo dòng.\
\
Hiểu theo hành vi:\
- `var`: được hoist và khởi tạo `undefined`.\
- `function declaration`: hoist cả thân hàm, gọi trước vẫn được.\
- `let/const`: cũng hoist nhưng chưa khởi tạo, truy cập sớm sẽ lỗi (TDZ).\
\
```javascript\
console.log(a); // undefined (var hoisted)\
console.log(b); // ReferenceError (let TDZ)\
var a = 1;\
let b = 2;\
\
fn(); // hoạt động bình thường\
function fn() { return \\"hoisted\\"; }\
```\
\
Vì vậy `var` có thể trông như chạy được nhưng dễ gây bug khó debug.

## Detailed Answer (EN)
Hoisting means JavaScript processes declarations before executing line by line.\
\
Behavior to remember:\
- `var`: hoisted and initialized as `undefined`.\
- `function declaration`: fully hoisted, so it can be called before definition.\
- `let/const`: also hoisted but uninitialized, so early access throws (TDZ).\
\
That is why `var` may seem to work but often causes hard-to-debug bugs.
