---
id: doan-code-sau-in-ra-thu-tu-nao-giai-thich-js-settimeout-console-log-timeout-0-se
position: backend
technology: microtask
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn code sau in ra thứ tự nào? Giải thích.\
\
```js\
setTimeout(() =\u003e console.log('timeout'), 0)\
setImmediate(() =\u003e console.log('immediate'))\
Promise.resolve().then(() =\u003e console.log('promise'))\
process.nextTick(() =\u003e console.log('nextTick'))\
console.log('sync')\
```

## Question (EN)
What order does this code print? Explain.\
\
```js\
setTimeout(() =\u003e console.log('timeout'), 0)\
setImmediate(() =\u003e console.log('immediate'))\
Promise.resolve().then(() =\u003e console.log('promise'))\
process.nextTick(() =\u003e console.log('nextTick'))\
console.log('sync')\
```

## Đáp án chi tiết (VI)
Thứ tự: `sync` → `nextTick` → `promise` → sau đó `timeout` và `immediate` theo **thứ tự không cố định**.\
\
**Vì sao:**\
1. `console.log('sync')` chạy đồng bộ trước hết.\
2. Sau khi stack đồng bộ rỗng, Node xử lý **nextTick queue trước**, rồi mới tới **microtask queue của Promise**. `process.nextTick` không thuộc event loop — nó chạy xen giữa các thao tác, ưu tiên cao hơn `.then`.\
3. `setTimeout` chạy ở phase **timers**, `setImmediate` chạy ở phase **check**. Khi cả hai được đăng ký ở **main module**, thứ tự phụ thuộc thời gian khởi động tiến trình: nếu vòng lặp bắt đầu sau hơn 1ms thì `timeout` trước, ngược lại `immediate` trước. Chạy nhiều lần sẽ thấy đổi thứ tự.\
\
Điểm cần nhớ: **nextTick \u003e Promise microtask \u003e timers/check**, và cặp timeout/immediate ở top-level là không xác định.

## Detailed Answer (EN)
Order: `sync` → `nextTick` → `promise` → then `timeout` and `immediate` in a **non-deterministic** order.\
\
**Why:**\
1. `console.log('sync')` runs synchronously first.\
2. Once the synchronous stack drains, Node processes the **nextTick queue first**, then the **Promise microtask queue**. `process.nextTick` is not part of the event loop proper — it runs between operations and outranks `.then`.\
3. `setTimeout` fires in the **timers** phase, `setImmediate` in the **check** phase. When both are scheduled from the **main module**, the order depends on process startup time: if the loop enters after more than 1ms, `timeout` wins; otherwise `immediate` does. Run it repeatedly and the order flips.\
\
Key takeaway: **nextTick \u003e Promise microtasks \u003e timers/check**, and the timeout/immediate pair at top level is unpredictable.
