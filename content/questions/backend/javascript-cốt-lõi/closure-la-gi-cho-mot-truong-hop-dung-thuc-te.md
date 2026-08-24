---
id: closure-la-gi-cho-mot-truong-hop-dung-thuc-te
position: backend
technology: javascript-cốt-lõi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Closure là gì? Cho một trường hợp dùng thực tế.

## Question (EN)
What is a closure? Give a practical use case.

## Đáp án chi tiết (VI)
Closure = một hàm **giữ tham chiếu tới scope nơi nó được khai báo**, nên vẫn đọc/ghi được biến của scope cha ngay cả khi hàm cha đã chạy xong. Nói cách khác, hàm \\"nhớ\\" môi trường tạo ra nó.\
\
- Nền tảng của closure là **lexical scoping** — phạm vi biến xác định lúc viết code, không phải lúc gọi.\
- Ứng dụng thường gặp:\
  - **Biến private / đóng gói trạng thái** (module pattern, counter, factory function).\
  - **Ghi nhớ giá trị** cho callback: `setTimeout`, event handler, `debounce`/`throttle`.\
  - **Currying / partial application**.\
\
```js\
function makeCounter() {\
  let count = 0 // private — only the returned fn can access it\
  return () =\u003e ++count\
}\
const next = makeCounter()\
next() // 1\
next() // 2 — count is still alive after makeCounter returned\
```\
\
Lỗi thường gặp: dùng `var` trong vòng lặp tạo callback → mọi callback cùng chia sẻ một biến. Sửa bằng `let` (tạo binding mới mỗi vòng) hoặc IIFE.

## Detailed Answer (EN)
A closure is a function that **keeps a reference to the scope where it was declared**, so it can still read/write the parent scope’s variables even after the parent function has returned. The function \\"remembers\\" the environment that created it.\
\
- It is built on **lexical scoping** — variable scope is fixed by where code is written, not where it is called.\
- Common uses:\
  - **Private variables / encapsulated state** (module pattern, counters, factory functions).\
  - **Capturing values** for callbacks: `setTimeout`, event handlers, `debounce`/`throttle`.\
  - **Currying / partial application**.\
\
```js\
function makeCounter() {\
  let count = 0 // private — only the returned fn can access it\
  return () =\u003e ++count\
}\
const next = makeCounter()\
next() // 1\
next() // 2 — count is still alive after makeCounter returned\
```\
\
Classic bug: `var` inside a loop that creates callbacks → every callback shares one variable. Fix with `let` (a fresh binding per iteration) or an IIFE.
