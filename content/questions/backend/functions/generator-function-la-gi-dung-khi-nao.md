---
id: generator-function-la-gi-dung-khi-nao
position: backend
technology: functions
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generator function là gì? Dùng khi nào?

## Question (EN)
What is a generator function? When should you use one?

## Đáp án chi tiết (VI)
Generator function dùng `function*` và `yield`, trả về iterator có thể pause và resume. Mỗi lần gọi `next()` thực thi đến yield tiếp theo và trả về `{value, done}`.\
```javascript\
function* counter() {\
  let n = 0;\
  while (true) {\
    yield n++;\
  }\
}\
const gen = counter();\
gen.next(); // { value: 0, done: false }\
gen.next(); // { value: 1, done: false }\
```\
Dùng để tạo infinite sequences, lazy evaluation, hoặc kiểm soát luồng bất đồng bộ (trước khi có async/await).

## Detailed Answer (EN)
Generator functions use `function*` and `yield`, returning an iterator that can be paused and resumed. Each call to `next()` executes to the next yield and returns `{value, done}`.\
```javascript\
function* counter() {\
  let n = 0;\
  while (true) {\
    yield n++;\
  }\
}\
const gen = counter();\
gen.next(); // { value: 0, done: false }\
gen.next(); // { value: 1, done: false }\
```\
Used to create infinite sequences, lazy evaluation, or control asynchronous flow (before async/await existed).
