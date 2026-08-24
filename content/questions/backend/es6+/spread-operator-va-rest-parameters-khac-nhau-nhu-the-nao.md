---
id: spread-operator-va-rest-parameters-khac-nhau-nhu-the-nao
position: backend
technology: es6+
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spread operator (...) và rest parameters (...) khác nhau như thế nào?

## Question (EN)
How do the spread operator (...) and rest parameters (...) differ?

## Đáp án chi tiết (VI)
Spread mở rộng iterable thành từng phần tử (dùng trong function calls, array literals, object literals). Rest thu thập nhiều phần tử thành array (dùng trong function parameters). Cú pháp giống nhau nhưng ngữ cảnh ngược nhau.\
\
```javascript\
// Spread: \\"mở ra\\"\
const arr = [1, 2, 3];\
console.log(Math.max(...arr)); // 3\
const merged = [...arr1, ...arr2];\
const copy = { ...obj, extra: true };\
\
// Rest: \\"thu lại\\"\
function sum(first, ...rest) { // rest là mảng\
  return first + rest.reduce((a, b) =\u003e a + b, 0);\
}\
```

## Detailed Answer (EN)
Spread expands an iterable into individual elements (used in function calls, array literals, object literals). Rest collects multiple elements into an array (used in function parameters). Same syntax, opposite purpose.\
\
```javascript\
// Spread: \\"expand\\"\
const arr = [1, 2, 3];\
console.log(Math.max(...arr)); // 3\
const merged = [...arr1, ...arr2];\
const copy = { ...obj, extra: true };\
\
// Rest: \\"gather\\"\
function sum(first, ...rest) { // rest is an array\
  return first + rest.reduce((a, b) =\u003e a + b, 0);\
}\
```
