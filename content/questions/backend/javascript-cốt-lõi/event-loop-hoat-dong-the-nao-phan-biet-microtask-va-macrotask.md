---
id: event-loop-hoat-dong-the-nao-phan-biet-microtask-va-macrotask
position: backend
technology: javascript-cốt-lõi
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event loop hoạt động thế nào? Phân biệt microtask và macrotask.

## Question (EN)
How does the event loop work? Microtasks vs macrotasks?

## Đáp án chi tiết (VI)
JS chạy **đơn luồng**: một **call stack** thực thi code đồng bộ. Tác vụ bất đồng bộ (timer, network, event) được Web API xử lý bên ngoài rồi đẩy callback vào hàng đợi. **Event loop** lặp: khi call stack rỗng thì lấy tác vụ tiếp theo ra chạy.\
\
Có hai loại hàng đợi, khác độ ưu tiên:\
- **Microtask**: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`.\
- **Macrotask (task)**: `setTimeout`, `setInterval`, sự kiện I/O, sự kiện UI (click, message).\
\
**Quy tắc**: sau mỗi tác vụ, engine **rút cạn toàn bộ microtask** trước khi lấy macrotask kế tiếp. Vì vậy `Promise.then` luôn chạy trước `setTimeout(…, 0)`. Việc render trang **không phải** một macrotask — trình duyệt có thể chèn bước vẽ lại giữa các task, sau khi microtask đã rút cạn.\
\
Minh họa:\
\
```js\
console.log('A')\
setTimeout(() =\u003e console.log('B'), 0)\
Promise.resolve().then(() =\u003e console.log('C'))\
console.log('D')\
// → A D C B\
```

## Detailed Answer (EN)
JS is **single-threaded**: one **call stack** runs synchronous code. Async work (timers, network, events) is handled outside by Web APIs, which then push callbacks into queues. The **event loop** repeats: when the call stack is empty, it takes the next task and runs it.\
\
There are two queues with different priority:\
- **Microtasks**: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`.\
- **Macrotasks (tasks)**: `setTimeout`, `setInterval`, I/O events, UI events (click, message).\
\
**Rule**: after each task the engine **drains the entire microtask queue** before taking the next macrotask. So `Promise.then` always runs before `setTimeout(…, 0)`. Page rendering is **not** a macrotask — the browser may insert a repaint between tasks, after the microtask queue has drained.\
\
Illustration:\
\
```js\
console.log('A')\
setTimeout(() =\u003e console.log('B'), 0)\
Promise.resolve().then(() =\u003e console.log('C'))\
console.log('D')\
// → A D C B\
```
