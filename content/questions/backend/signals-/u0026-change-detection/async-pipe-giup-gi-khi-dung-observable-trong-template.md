---
id: async-pipe-giup-gi-khi-dung-observable-trong-template
position: backend
technology: signals-\u0026-change-detection
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`async` pipe giúp gì khi dùng Observable trong template?

## Question (EN)
How does the `async` pipe help when using Observables in templates?

## Đáp án chi tiết (VI)
`async` pipe subscribe Observable/Promise, render latest value và tự unsubscribe khi view bị destroy.\
\
Nó giảm memory leak so với subscribe thủ công trong component. Với OnPush, mỗi lần Observable emit, async pipe cũng mark component để update. Nếu cần transform nhiều stream phức tạp, xử lý trong component/service bằng RxJS rồi expose stream đã sẵn sàng cho template.

## Detailed Answer (EN)
The `async` pipe subscribes to an Observable/Promise, renders the latest value and automatically unsubscribes when the view is destroyed.\
\
It reduces memory leaks compared with manual subscriptions in a component. With OnPush, each Observable emission also marks the component for update. For complex stream transformations, handle them in a component/service with RxJS and expose a ready-to-render stream to the template.
