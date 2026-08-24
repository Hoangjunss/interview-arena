---
id: webhook-la-gi-can-luu-y-gi-khi-nhan-webhook
position: backend
technology: integration
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Webhook là gì? Cần lưu ý gì khi nhận webhook?

## Question (EN)
What is a webhook and what should you watch for when receiving one?

## Đáp án chi tiết (VI)
Webhook là cách hệ ngoài **chủ động gọi tới URL của bạn** khi có sự kiện, thay vì bạn phải liên tục hỏi (polling). Còn gọi là \\"reverse API\\" / \\"push callback\\" — vd SePay báo thanh toán thành công, GitHub báo có push.\
\
Khi **nhận** webhook cần:\
- **Verify chữ ký**: kiểm HMAC/secret trong header để chắc request đến từ nguồn thật, không phải kẻ giả mạo.\
- **Idempotent**: nhà cung cấp có thể gửi lặp cùng một event → xử lý theo `event_id` để không tính hai lần.\
- **Trả `2xx` nhanh**: nhận rồi đẩy việc nặng vào queue xử lý sau; chậm quá bên gửi sẽ coi là lỗi và retry.\
- **Chịu được retry \u0026 sai thứ tự**: event có thể đến trùng hoặc lệch thứ tự.

## Detailed Answer (EN)
A webhook lets an external system **call your URL** when an event happens, instead of you continuously polling. Think \\"reverse API\\" / \\"push callback\\" — e.g. SePay signaling a successful payment, GitHub signaling a push.\
\
When **receiving** a webhook you should:\
- **Verify the signature**: check the HMAC/secret in the header so the request truly came from the sender, not a spoofer.\
- **Be idempotent**: providers may redeliver the same event → process by `event_id` so you never count it twice.\
- **Return `2xx` fast**: accept, then push heavy work onto a queue; if you are slow the sender treats it as failure and retries.\
- **Tolerate retries \u0026 out-of-order delivery**: events may arrive duplicated or out of sequence.
