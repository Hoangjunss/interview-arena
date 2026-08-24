---
id: event-loop-trong-javascript-hoat-dong-nhu-the-nao
position: backend
technology: promise-\u0026-async
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event loop trong JavaScript hoạt động như thế nào?

## Question (EN)
How does the JavaScript event loop work?

## Đáp án chi tiết (VI)
JS single-threaded nhưng xử lý async nhờ event loop. Quy trình: (1) Chạy hết sync code trên Call Stack. (2) Xử lý hết Microtask queue. (3) Browser có thể render. (4) Lấy 1 Macrotask. (5) Quay lại bước 2.\
```javascript\
console.log('1 sync');\
\
setTimeout(() =\u003e console.log('4 macrotask'), 0);\
\
Promise.resolve()\
  .then(() =\u003e console.log('2 microtask'))\
  .then(() =\u003e console.log('3 microtask 2'));\
\
console.log('1b sync');\
// Output: 1 sync → 1b sync → 2 microtask → 3 microtask 2 → 4 macrotask\
```\
Microtasks luôn ưu tiên hơn macrotasks — `Promise.resolve().then()` chạy trước `setTimeout(fn, 0)`.

## Detailed Answer (EN)
JS is single-threaded but handles async via the event loop. The process: (1) Run all sync code on the Call Stack. (2) Process all Microtask queue entries. (3) Browser may render. (4) Take 1 Macrotask. (5) Go back to step 2.\
```javascript\
console.log('1 sync');\
\
setTimeout(() =\u003e console.log('4 macrotask'), 0);\
\
Promise.resolve()\
  .then(() =\u003e console.log('2 microtask'))\
  .then(() =\u003e console.log('3 microtask 2'));\
\
console.log('1b sync');\
// Output: 1 sync → 1b sync → 2 microtask → 3 microtask 2 → 4 macrotask\
```\
Microtasks always have priority over macrotasks — `Promise.resolve().then()` runs before `setTimeout(fn, 0)`.
