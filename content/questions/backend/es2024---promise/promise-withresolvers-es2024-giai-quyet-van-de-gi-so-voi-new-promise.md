---
id: promise-withresolvers-es2024-giai-quyet-van-de-gi-so-voi-new-promise
position: backend
technology: es2024---promise
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Promise.withResolvers() (ES2024) giải quyết vấn đề gì so với new Promise()?

## Question (EN)
What problem does Promise.withResolvers() (ES2024) solve compared to new Promise()?

## Đáp án chi tiết (VI)
`Promise.withResolvers()` trả về một object gồm **promise, resolve và reject** cùng lúc, đưa hai hàm điều khiển ra **ngoài** phạm vi executor.\
\
Vấn đề với `new Promise(executor)`: muốn resolve promise từ chỗ khác (event handler, callback của thư viện, hàng đợi message) bạn phải khai báo biến rỗng rồi gán `resolve` từ trong executor — rườm rà và dễ sai.\
\
```js\
// Cũ\
let resolve, reject;\
const p = new Promise((res, rej) =\u003e { resolve = res; reject = rej; });\
\
// ES2024\
const { promise, resolve, reject } = Promise.withResolvers();\
socket.on('message', (msg) =\u003e resolve(msg));\
socket.on('error', (err) =\u003e reject(err));\
await promise;\
```\
\
**Hình dung:** như nhận sẵn cả \\"công tắc bật\\" và \\"công tắc tắt\\" của promise, dùng ở bất kỳ đâu.\
\
**Lưu ý:** vẫn là một promise duy nhất — gọi `resolve`/`reject` lần thứ hai sẽ bị bỏ qua. Hợp cho việc bọc API event-based hoặc tạo deferred queue.

## Detailed Answer (EN)
`Promise.withResolvers()` returns an object with **promise, resolve, and reject** together, exposing the two control functions **outside** the executor.\
\
The pain with `new Promise(executor)`: to resolve a promise from elsewhere (an event handler, a library callback, a message queue) you declare empty variables and assign `resolve` from inside the executor — verbose and error-prone.\
\
```js\
// Old\
let resolve, reject;\
const p = new Promise((res, rej) =\u003e { resolve = res; reject = rej; });\
\
// ES2024\
const { promise, resolve, reject } = Promise.withResolvers();\
socket.on('message', (msg) =\u003e resolve(msg));\
socket.on('error', (err) =\u003e reject(err));\
await promise;\
```\
\
**Picture it:** you're handed both the on-switch and off-switch of the promise to use anywhere.\
\
**Note:** still one promise — a second `resolve`/`reject` is ignored. Great for wrapping event-based APIs or building a deferred queue.
