---
id: doan-code-sau-in-ra-thu-tu-nao-giai-thich-tai-sao
position: backend
technology: output-order
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn code sau in ra thứ tự nào? Giải thích tại sao.

## Question (EN)
What order does the following code print, and why?

## Đáp án chi tiết (VI)
```js\
console.log('1')\
setTimeout(() =\u003e console.log('2'), 0)\
Promise.resolve().then(() =\u003e console.log('3'))\
console.log('4')\
```\
\
Kết quả: **1, 4, 3, 2**.\
\
- `1` và `4` là code **đồng bộ**, chạy hết trước mọi thứ khác.\
- `3` nằm trong **microtask queue** (callback của Promise). Microtask được rút cạn **ngay sau khi call stack rỗng**, trước khi event loop nhận task mới.\
- `2` là callback của `setTimeout` — một **macrotask (task)**. Dù đặt delay `0`, nó phải đợi lượt task kế tiếp của event loop, tức là sau toàn bộ microtask.\
\
Quy tắc để trả lời mọi câu dạng này:\
1. Chạy hết code đồng bộ.\
2. Rút cạn microtask queue (`.then`, `await` phần sau, `queueMicrotask`, `MutationObserver`).\
3. Lấy **một** macrotask (`setTimeout`, `setInterval`, event handler, I/O) rồi lặp lại từ bước 2.\
\
Hệ quả cần nhớ: một microtask sinh ra microtask khác thì vẫn được xử lý trong cùng vòng — nếu tạo microtask vô hạn, trình duyệt sẽ không bao giờ render lại.

## Detailed Answer (EN)
```js\
console.log('1')\
setTimeout(() =\u003e console.log('2'), 0)\
Promise.resolve().then(() =\u003e console.log('3'))\
console.log('4')\
```\
\
Output: **1, 4, 3, 2**.\
\
- `1` and `4` are **synchronous** code and run to completion first.\
- `3` sits in the **microtask queue** (a promise callback). Microtasks are drained **as soon as the call stack empties**, before the event loop picks up a new task.\
- `2` is a `setTimeout` callback — a **macrotask (task)**. Even with a `0` delay it must wait for the next event-loop turn, i.e. after all microtasks.\
\
A rule that answers every question of this shape:\
1. Run all synchronous code.\
2. Drain the microtask queue (`.then`, the continuation after `await`, `queueMicrotask`, `MutationObserver`).\
3. Take **one** macrotask (`setTimeout`, `setInterval`, event handlers, I/O), then repeat from step 2.\
\
Key consequence: a microtask that schedules another microtask is still handled in the same turn — an infinite microtask chain starves rendering entirely.
