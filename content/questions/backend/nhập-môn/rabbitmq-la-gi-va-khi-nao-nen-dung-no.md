---
id: rabbitmq-la-gi-va-khi-nao-nen-dung-no
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RabbitMQ là gì và khi nào nên dùng nó?

## Question (EN)
What is RabbitMQ and why would you use it?

## Đáp án chi tiết (VI)
RabbitMQ là message broker mã nguồn mở, cho phép các ứng dụng giao tiếp bất đồng bộ thông qua một broker trung gian thay vì gọi trực tiếp lẫn nhau. Dùng khi cần tách ghép (decouple) các service, xử lý tác vụ nền như gửi email, resize ảnh, và tăng độ tin cậy của hệ thống khi có lỗi xảy ra. Điểm khác biệt so với gọi API trực tiếp: nếu một service bị down, messages sẽ nằm đợi trong RabbitMQ cho đến khi service đó khôi phục.

## Detailed Answer (EN)
RabbitMQ is an open-source message broker that enables applications to communicate asynchronously by sending messages through a central broker rather than calling each other directly. You use it to decouple services, handle async tasks (email, image processing), and improve reliability during failures. Unlike direct REST calls, if a service goes down, messages wait in RabbitMQ until it recovers.
