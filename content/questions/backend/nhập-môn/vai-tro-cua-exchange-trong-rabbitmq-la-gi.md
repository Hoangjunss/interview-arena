---
id: vai-tro-cua-exchange-trong-rabbitmq-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vai trò của exchange trong RabbitMQ là gì?

## Question (EN)
What is the role of exchanges in RabbitMQ?

## Đáp án chi tiết (VI)
Exchange là \\"bộ não\\" phân phối message: nhận message từ producer và định tuyến đến các queue phù hợp dựa trên binding và routing_key. Producer không bao giờ gửi trực tiếp vào queue — luôn publish lên exchange, sau đó exchange quyết định message đi đâu. Các loại exchange khác nhau (direct, topic, fanout, headers) thực hiện logic định tuyến khác nhau để hỗ trợ các pattern giao tiếp đa dạng.

## Detailed Answer (EN)
Exchanges are the routing intelligence — they receive messages from producers and route them to appropriate queues based on bindings and routing keys. Producers never publish directly to queues; they always go through exchanges. Different exchange types (direct, topic, fanout, headers) implement different routing logic for various communication patterns.
