---
id: fizzbuzz-coding-challenge-viet-code-optimize-handle-edge-case
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FizzBuzz coding challenge. Viết code, optimize, handle edge case.

## Question (EN)
FizzBuzz coding challenge. Write the code, optimize it, and handle edge cases.

## Đáp án chi tiết (VI)
FizzBuzz là bài toán kinh điển: lặp từ 1 đến n, in 'Fizz' nếu chia hết cho 3, 'Buzz' nếu chia hết cho 5, 'FizzBuzz' nếu chia hết cho cả hai, còn lại in số đó.\
\
```js\
// Cách cơ bản — kiểm tra 15 trước\
function fizzBuzz(n) {\
  for (let i = 1; i \u003c= n; i++) {\
    if (i % 15 === 0) console.log('FizzBuzz');\
    else if (i % 3 === 0) console.log('Fizz');\
    else if (i % 5 === 0) console.log('Buzz');\
    else console.log(i);\
  }\
}\
\
// Cách nâng cao — nối chuỗi, không cần kiểm tra 15\
function fizzBuzzV2(n) {\
  for (let i = 1; i \u003c= n; i++) {\
    let result = '';\
    if (i % 3 === 0) result += 'Fizz';\
    if (i % 5 === 0) result += 'Buzz';\
    console.log(result || i);\
  }\
}\
```\
\
Trường hợp biên cần xử lý: n bằng 0, số âm, hoặc input không phải số.

## Detailed Answer (EN)
FizzBuzz iterates from 1 to n — print 'Fizz' if divisible by 3, 'Buzz' if divisible by 5, 'FizzBuzz' if divisible by both, otherwise print the number.\
\
```js\
// Basic — check 15 first\
function fizzBuzz(n) {\
  for (let i = 1; i \u003c= n; i++) {\
    if (i % 15 === 0) console.log('FizzBuzz');\
    else if (i % 3 === 0) console.log('Fizz');\
    else if (i % 5 === 0) console.log('Buzz');\
    else console.log(i);\
  }\
}\
\
// Advanced — string concatenation, no 15-check\
function fizzBuzzV2(n) {\
  for (let i = 1; i \u003c= n; i++) {\
    let result = '';\
    if (i % 3 === 0) result += 'Fizz';\
    if (i % 5 === 0) result += 'Buzz';\
    console.log(result || i);\
  }\
}\
```\
\
Edge cases to handle: n equals 0, negative numbers, or non-numeric input.
