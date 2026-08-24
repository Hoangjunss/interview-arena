---
id: kien-truc-cua-rabbitmq-gom-nhung-thanh-phan-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiến trúc của RabbitMQ gồm những thành phần nào?

## Question (EN)
What are the main components of RabbitMQ architecture?

## Đáp án chi tiết (VI)
Kiến trúc RabbitMQ gồm: Producer (ứng dụng gửi message), Exchange (nhận message từ producer và định tuyến chúng), Queue (lưu trữ message chờ được consume), Consumer (ứng dụng nhận và xử lý message), và Binding (quy tắc kết nối exchange với queue). Hình dung như bưu cục: producer bỏ thư (message) vào bưu cục (exchange), nhân viên phân loại (binding) gửi vào hộp thư (queue), và bưu tá (consumer) giao thư đến tay người nhận.

## Detailed Answer (EN)
RabbitMQ core components: Producers (send messages), Exchanges (route messages), Queues (store messages), Consumers (receive and process), and Bindings (routing rules connecting exchanges to queues). Think of it as a post office: producers drop letters at the exchange, bindings sort them into mailboxes (queues), and consumers deliver to recipients.
