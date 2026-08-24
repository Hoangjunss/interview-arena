---
id: idempotency-key-la-gi-va-giai-quyet-van-de-gi-khi-retry
position: backend
technology: reliability
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Idempotency key là gì và giải quyết vấn đề gì khi retry?

## Question (EN)
What is an idempotency key and what retry problem does it solve?

## Đáp án chi tiết (VI)
Vấn đề: `POST` **không idempotent** — nếu client gửi tạo đơn/thanh toán rồi mạng timeout, nó không biết server đã nhận chưa. Retry khi chưa biết kết quả → **tạo trùng** (đơn hàng lặp, trừ tiền hai lần).\
\
**Idempotency key** là một chuỗi duy nhất (thường UUID) client sinh cho mỗi thao tác và gửi kèm (vd header `Idempotency-Key`). Server:\
1. Lần đầu thấy key → xử lý và **lưu kết quả gắn với key**.\
2. Lần sau thấy **cùng key** → không làm lại, trả **kết quả đã lưu**.\
\
Nhờ đó retry an toàn dù request thực chất là `POST`. Cần lưu key + kết quả trong một cửa sổ thời gian (TTL) và xử lý race (khóa/`INSERT` unique). Đây là cơ chế Stripe/PayPal dùng cho API thanh toán.

## Detailed Answer (EN)
The problem: `POST` is **not idempotent** — if a client submits a create-order/payment and the network times out, it cannot tell whether the server received it. A blind retry → **duplicates** (double order, double charge).\
\
An **idempotency key** is a unique string (usually a UUID) the client generates per operation and sends along (e.g. an `Idempotency-Key` header). The server:\
1. First time it sees the key → processes and **stores the result against the key**.\
2. Next time it sees the **same key** → does not redo the work and returns the **stored result**.\
\
This makes retries safe even though the request is really a `POST`. You must store the key + result within a time window (TTL) and handle races (a lock or unique `INSERT`). This is the mechanism Stripe/PayPal use for payment APIs.
