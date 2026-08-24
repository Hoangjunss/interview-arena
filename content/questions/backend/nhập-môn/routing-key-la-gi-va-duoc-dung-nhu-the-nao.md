---
id: routing-key-la-gi-va-duoc-dung-nhu-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Routing key là gì và được dùng như thế nào?

## Question (EN)
What is a routing key and how is it used?

## Đáp án chi tiết (VI)
`routing_key` là nhãn string gắn vào message, exchange dùng nó để quyết định queue nào nhận message. Producer chỉ định routing_key khi publish (ví dụ \\"user.created.vn\\"), exchange so khớp với các binding rule và chỉ giao đến queue nào có rule phù hợp. Các loại exchange khác nhau diễn giải routing_key theo cách khác: direct exchange cần khớp chính xác, topic exchange hỗ trợ wildcard.

## Detailed Answer (EN)
A `routing_key` is a string label on messages that exchanges use to decide which queues receive them. Producers specify it when publishing (e.g., \\"user.created.us\\"), exchanges match against binding rules, and only queues with matching rules get the message. Different exchange types interpret routing keys differently — direct requires exact match, topic supports wildcards.
