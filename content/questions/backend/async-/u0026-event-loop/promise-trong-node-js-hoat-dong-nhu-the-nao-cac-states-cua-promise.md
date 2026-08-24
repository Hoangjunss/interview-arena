---
id: promise-trong-node-js-hoat-dong-nhu-the-nao-cac-states-cua-promise
position: backend
technology: async-\u0026-event-loop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Promise trong Node.js hoạt động như thế nào? Các states của Promise?

## Question (EN)
How do Promises work in Node.js? What are the states of a Promise?

## Đáp án chi tiết (VI)
Promise là object đại diện cho async operation, có 3 states không thể revert: pending → fulfilled/rejected. Microtask queue: `.then()` callbacks được đặt vào microtask queue (ưu tiên cao hơn setTimeout), chạy sau synchronous code nhưng trước event loop phases. Static methods quan trọng: `Promise.all([p1,p2])` — chờ tất cả resolve, reject ngay khi 1 cái reject (fail-fast); `Promise.allSettled([p1,p2])` — chờ tất cả settle bất kể kết quả, trả về `[{status, value/reason}]` — dùng khi muốn biết kết quả từng cái; `Promise.race([p1,p2])` — resolve/reject theo cái đầu tiên settle (dùng cho timeout pattern); `Promise.any([p1,p2])` — resolve khi 1 cái fulfilled, reject chỉ khi tất cả reject. Error handling chain: nếu không có `.catch()`, unhandled rejection — Node.js 15+ crash process mặc định. `Promise.resolve(value)` tạo fulfilled promise ngay, hữu ích để normalize sync/async APIs. Lưu ý: error swallowing trong `.then(onFulfilled)` không có `.catch()` — luôn chain `.catch()` hoặc dùng try/catch với await.

## Detailed Answer (EN)
$89
