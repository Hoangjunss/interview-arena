---
id: exchange-va-queue-khac-nhau-nhu-the-nao
position: backend
technology: exchange-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Exchange và queue khác nhau như thế nào?

## Question (EN)
What is the difference between an exchange and a queue?

## Đáp án chi tiết (VI)
Exchange là router message — nhận từ producer và quyết định message đi đâu dựa trên routing logic. Queue là buffer message — lưu trữ và chờ consumer lấy. Exchange không lưu trữ gì cả; queue mới lưu. Luồng message: Producer → Exchange → Queue → Consumer. Bạn bind queue vào exchange để tạo routing rule. Không có queue, exchange không có chỗ nào để gửi message.

## Detailed Answer (EN)
An exchange is a message router — it receives messages from producers and decides where they go based on routing logic. A queue is a message buffer — it stores messages and waits for consumers. Exchanges store nothing; queues do. Flow: Producers → Exchanges → Queues → Consumers. Without queues, exchanges have nowhere to deliver messages.
