---
id: flatten-nested-array-khong-dung-array-flat
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flatten nested array (không dùng Array.flat)?

## Question (EN)
Flatten a nested array (without using Array.flat).

## Đáp án chi tiết (VI)
Flatten nested array bằng đệ quy reduce hoặc iterative spread.\
\
```js\
// Recursive\
function flatten(arr) {\
  return arr.reduce((acc, item) =\u003e\
    acc.concat(Array.isArray(item) ? flatten(item) : item), []);\
}\
// Iterative\
while (arr.some(Array.isArray)) arr = [].concat(...arr);\
```\
\
Phỏng vấn thường hỏi để test hiểu recursion và Array methods.

## Detailed Answer (EN)
Recursive: `function flatten(arr) { return arr.reduce((acc, item) =\u003e acc.concat(Array.isArray(item) ? flatten(item) : item), []); }` Or iterative with spread: `while (arr.some(Array.isArray)) arr = [].concat(...arr);` Interviewers ask this to test understanding of recursion and array methods.
