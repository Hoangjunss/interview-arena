---
id: vong-lap-for-var-i-0-i-3-i-settimeout-console-log-i-in-ra-gi-doi-var-thanh-let-t
position: backend
technology: closure
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vòng lặp `for (var i = 0; i \u003c 3; i++) setTimeout(() =\u003e console.log(i))` in ra gì? Đổi `var` thành `let` thì sao?

## Question (EN)
What does `for (var i = 0; i \u003c 3; i++) setTimeout(() =\u003e console.log(i))` print? What changes with `let`?

## Đáp án chi tiết (VI)
Với `var` in ra **`3 3 3`**. Với `let` in ra **`0 1 2`**.\
\
`var` có phạm vi **function**, nên cả ba callback đóng gói (closure) trên **cùng một biến `i`**. Khi timer chạy (sau khi vòng lặp kết thúc), `i` đã là `3`.\
\
`let` có phạm vi **block**, và spec quy định mỗi vòng lặp tạo một **binding mới** rồi copy giá trị của vòng trước sang. Ba callback đóng gói trên ba biến khác nhau.\
\
```js\
for (var i = 0; i \u003c 3; i++) setTimeout(() =\u003e console.log(i)); // 3 3 3\
for (let j = 0; j \u003c 3; j++) setTimeout(() =\u003e console.log(j)); // 0 1 2\
```\
\
**Cách sửa khi buộc phải dùng `var`** — tạo scope riêng bằng IIFE hoặc tham số:\
\
```js\
for (var k = 0; k \u003c 3; k++) {\
  (function (captured) {\
    setTimeout(() =\u003e console.log(captured));\
  })(k);\
}\
```\
\
Lỗi này hay xuất hiện thật khi gắn handler trong vòng lặp (`buttons[i].onclick = () =\u003e open(items[i])`) — mọi nút cùng mở phần tử cuối.

## Detailed Answer (EN)
With `var` it prints **`3 3 3`**. With `let` it prints **`0 1 2`**.\
\
`var` is **function-scoped**, so all three callbacks close over **the same `i`**. By the time the timers run (after the loop finishes), `i` is `3`.\
\
`let` is **block-scoped**, and the spec creates a **fresh binding per iteration**, copying the previous iteration's value into it. The three callbacks close over three distinct variables.\
\
```js\
for (var i = 0; i \u003c 3; i++) setTimeout(() =\u003e console.log(i)); // 3 3 3\
for (let j = 0; j \u003c 3; j++) setTimeout(() =\u003e console.log(j)); // 0 1 2\
```\
\
**Fix when stuck with `var`** — create a scope via an IIFE or a parameter:\
\
```js\
for (var k = 0; k \u003c 3; k++) {\
  (function (captured) {\
    setTimeout(() =\u003e console.log(captured));\
  })(k);\
}\
```\
\
This bug shows up for real when attaching handlers in a loop (`buttons[i].onclick = () =\u003e open(items[i])`) — every button opens the last item.
