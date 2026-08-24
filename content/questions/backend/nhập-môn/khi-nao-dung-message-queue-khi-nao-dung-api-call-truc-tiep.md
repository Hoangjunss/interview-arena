---
id: khi-nao-dung-message-queue-khi-nao-dung-api-call-truc-tiep
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng message queue, khi nào dùng API call trực tiếp?

## Question (EN)
When should you use message queuing vs direct API calls?

## Đáp án chi tiết (VI)
Dùng message queue cho các tác vụ bất đồng bộ không cần response ngay (gửi email, xử lý ảnh, ghi log analytics) hoặc khi cần buffer để hấp thụ traffic spike. Dùng API call trực tiếp cho các thao tác đồng bộ cần phản hồi ngay lập tức (đăng nhập, validate thanh toán, truy vấn dữ liệu). Thực tế hầu hết hệ thống dùng cả hai: REST cho critical path đồng bộ, RabbitMQ cho background task và event giữa các service. Message queue đánh đổi latency để lấy reliability và decoupling.

## Detailed Answer (EN)
Use message queuing for async, fire-and-forget operations (sending emails, processing images, analytics) or where buffering for load spikes is needed. Use direct API calls for synchronous operations requiring immediate response (login, payment validation, data retrieval). In practice, use both: REST for synchronous critical paths, RabbitMQ for background tasks and inter-service events.
