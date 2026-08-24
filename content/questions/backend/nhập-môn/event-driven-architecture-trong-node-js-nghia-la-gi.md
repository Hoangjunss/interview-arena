---
id: event-driven-architecture-trong-node-js-nghia-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event-driven architecture trong Node.js nghĩa là gì?

## Question (EN)
What does event-driven architecture mean in Node.js?

## Đáp án chi tiết (VI)
Node.js phản ứng với events thay vì chạy tuần tự — đăng ký callback, tiếp tục xử lý việc khác, callback được gọi khi I/O hoàn thành; block khi chạy heavy sync computation. Event-driven architecture nghĩa là code phản ứng với events thay vì chạy tuần tự từ trên xuống. Trong Node.js, thay vì blocking chờ đợi I/O xong, bạn đăng ký callback và Node.js tiếp tục xử lý việc khác — khi I/O hoàn thành, event được emit và callback được gọi. Ví dụ cụ thể: `server.on('request', (req, res) =\u003e {...})` — server không blocking chờ từng request mà lắng nghe event 'request' liên tục. Điều này cho phép một thread đơn xử lý hàng nghìn connections đồng thời vì hầu hết thời gian Node.js không làm gì cả, chỉ chờ I/O. Lưu ý: nếu bạn chạy heavy computation đồng bộ (vòng lặp triệu lần), event loop bị block và mọi requests khác phải chờ — đây là lý do Node.js không phù hợp cho CPU-intensive work.

## Detailed Answer (EN)
Node.js reacts to events instead of sequential execution — register callback, continue other work, callback fires when I/O completes; blocks when running heavy synchronous computation. Event-driven architecture means code reacts to events rather than executing top-to-bottom sequentially. In Node.js, instead of blocking while waiting for I/O to complete, you register a callback and Node.js continues processing other work — when the I/O finishes, an event is emitted and the callback is invoked. Concrete example: `server.on('request', (req, res) =\u003e {...})` — the server doesn't block waiting for each request; it continuously listens for 'request' events. This allows a single thread to handle thousands of concurrent connections because most of the time Node.js is doing nothing — just waiting on I/O. Pitfall: running heavy synchronous computation (a loop with millions of iterations) blocks the event loop and all other requests must wait — this is why Node.js is not suited for CPU-intensive work.
