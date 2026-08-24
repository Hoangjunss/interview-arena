---
id: van-de-classic-ve-closure-trong-vong-lap-with-var-la-gi
position: backend
technology: hoisting-\u0026-closure
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vấn đề classic về closure trong vòng lặp with var là gì?

## Question (EN)
What is the classic closure-in-loop problem with var?

## Đáp án chi tiết (VI)
Khi dùng `var` trong vòng lặp for, tất cả callback chia sẻ cùng tham chiếu đến biến i — vì var là function scope, chỉ có một biến i duy nhất.\
```javascript\
// Bug: in ra 3 3 3\
for (var i = 0; i \u003c 3; i++) {\
  setTimeout(() =\u003e console.log(i), 0);\
}\
\
// Fix 1: dùng let (block scope)\
for (let i = 0; i \u003c 3; i++) {\
  setTimeout(() =\u003e console.log(i), 0); // 0 1 2\
}\
\
// Fix 2: IIFE capture giá trị\
for (var i = 0; i \u003c 3; i++) {\
  (function(j) {\
    setTimeout(() =\u003e console.log(j), 0);\
  })(i);\
}\
```\
Đây là câu hỏi phỏng vấn cổ điển về closure.

## Detailed Answer (EN)
When using `var` in a for loop, all callbacks share the same reference to variable i — because var is function-scoped, there is only one i.\
```javascript\
// Bug: prints 3 3 3\
for (var i = 0; i \u003c 3; i++) {\
  setTimeout(() =\u003e console.log(i), 0);\
}\
\
// Fix 1: use let (block scope)\
for (let i = 0; i \u003c 3; i++) {\
  setTimeout(() =\u003e console.log(i), 0); // 0 1 2\
}\
\
// Fix 2: IIFE to capture the value\
for (var i = 0; i \u003c 3; i++) {\
  (function(j) {\
    setTimeout(() =\u003e console.log(j), 0);\
  })(i);\
}\
```\
This is a classic interview question about closures.
