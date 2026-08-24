---
id: idempotency-quan-trong-the-nao-trong-he-phan-tan-lam-sao-dam-bao
position: system-design
technology: reliability
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Idempotency quan trọng thế nào trong hệ phân tán? Làm sao đảm bảo?

## Question (EN)
Why does idempotency matter in distributed systems, and how do you ensure it?

## Đáp án chi tiết (VI)
Trong hệ phân tán, **retry là bắt buộc** (timeout, mất mạng, at-least-once delivery) → cùng một thao tác có thể tới **nhiều lần**. Một thao tác **idempotent** cho **cùng kết quả** dù chạy 1 hay N lần → retry an toàn, không tạo trùng.\
\
Ví dụ nguy hiểm nếu không idempotent: một lệnh \\"trừ tiền/tạo đơn\\" retry → **trừ tiền hai lần**.\
\
Cách đảm bảo:\
- **Idempotency key**: client gửi khóa duy nhất cho mỗi thao tác; server lưu kết quả theo khóa, lần retry cùng khóa → trả lại kết quả cũ, không thực thi lại.\
- **Thiết kế thao tác tự nhiên idempotent**: dùng `PUT` (set giá trị) thay vì cộng dồn; `INSERT ... ON CONFLICT`; dedupe theo message id.\
- Kết hợp cho consumer queue để xử lý message trùng.

## Detailed Answer (EN)
In distributed systems, **retries are inevitable** (timeouts, network loss, at-least-once delivery) → the same operation may arrive **multiple times**. An **idempotent** operation yields the **same result** whether run once or N times → retries are safe and create no duplicates.\
\
Dangerous non-idempotent example: a \\"charge/create order\\" command retried → **charged twice**.\
\
How to ensure it:\
- **Idempotency key**: the client sends a unique key per operation; the server stores the result by key, and a retry with the same key returns the stored result without re-executing.\
- **Design naturally idempotent operations**: use `PUT` (set a value) instead of increment; `INSERT ... ON CONFLICT`; dedupe by message id.\
- Combine these on queue consumers to handle duplicate messages.
