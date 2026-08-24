---
id: dieu-gi-xay-ra-khi-publish-message-len-exchange-khong-co-binding-nao
position: backend
technology: exchange-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điều gì xảy ra khi publish message lên exchange không có binding nào?

## Question (EN)
What happens if you publish a message to an exchange with no bindings?

## Đáp án chi tiết (VI)
Message bị âm thầm discard — RabbitMQ không có chỗ nào để route nó vì không có queue nào bound để nhận. Đây không hẳn là lỗi (có thể là chủ ý), nhưng thường là dấu hiệu misconfiguration hoặc consumer chưa start và chưa tạo binding. Mặc định bạn không nhận được error gì — message biến mất. Để phát hiện: dùng publisher confirms (nhận ack khi message được route thành công) hoặc monitor \\"messages dropped due to no routes\\".

## Detailed Answer (EN)
The message is silently discarded — RabbitMQ has nowhere to route it. This isn't necessarily an error but is often a misconfiguration sign or a consumer that failed to start and create bindings. By default you get no error — the message just vanishes. To catch this, use publisher confirms or monitor for \\"messages dropped due to no routes.\\"
