---
id: reactor-pattern-trong-node-js-la-gi-va-no-la-nen-tang-cho-event-loop-ra-sao
position: backend
technology: node.js-core
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reactor pattern trong Node.js là gì và nó là nền tảng cho event loop ra sao?

## Question (EN)
What is the reactor pattern in Node.js, and how does it underpin the event loop?

## Đáp án chi tiết (VI)
**Reactor pattern** là mô hình xử lý I/O bất đồng bộ: mỗi thao tác I/O gắn kèm một **handler** (callback), và các handler chỉ được gọi khi thao tác tương ứng hoàn tất. Hình dung dòng chảy trong Node:\
\
1. App phát yêu cầu I/O **non-blocking**, mỗi yêu cầu kèm handler.\
2. **Event Demultiplexer** (libuv bọc epoll/kqueue/IOCP của OS) theo dõi các resource đó mà không chặn luồng.\
3. Khi một thao tác xong, demultiplexer đẩy một **event** vào **Event Queue**.\
4. **Event Loop** duyệt hàng đợi, lần lượt gọi handler ứng với từng event; handler có thể phát thêm yêu cầu I/O mới.\
5. Lặp lại đến khi không còn thao tác nào chờ → tiến trình thoát.\
\
Đây chính là lõi giúp Node đơn luồng vẫn xử lý được lượng lớn kết nối đồng thời: thay vì mỗi request một thread, một luồng điều phối event và giao I/O nặng cho kernel.

## Detailed Answer (EN)
The **reactor pattern** is a model for async I/O: each I/O operation is paired with a **handler** (callback), and handlers fire only when their operation completes. Picture the flow in Node:\
\
1. The app issues **non-blocking** I/O requests, each with a handler.\
2. The **Event Demultiplexer** (libuv wrapping the OS epoll/kqueue/IOCP) watches those resources without blocking the thread.\
3. When an operation finishes, the demultiplexer pushes an **event** onto the **Event Queue**.\
4. The **Event Loop** walks the queue, invoking the handler for each event; a handler may issue further I/O requests.\
5. Repeat until no pending operations remain → the process exits.\
\
This is the core that lets single-threaded Node serve many concurrent connections: instead of one thread per request, one thread dispatches events and hands heavy I/O to the kernel.
