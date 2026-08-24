---
id: connection-va-channel-trong-rabbitmq-khac-nhau-nhu-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Connection và channel trong RabbitMQ khác nhau như thế nào?

## Question (EN)
Explain connections and channels in RabbitMQ.

## Đáp án chi tiết (VI)
Connection là một TCP socket giữa ứng dụng và RabbitMQ broker. Channel là \\"kết nối ảo\\" nhẹ, chạy multiplexed trên một TCP connection — bạn mở một connection duy nhất nhưng tạo nhiều channel trên đó để tránh overhead của nhiều TCP connection. Mỗi channel hoạt động độc lập, gửi/nhận trên các queue khác nhau, rất hiệu quả cho ứng dụng multi-threaded. Best practice: dùng lại một connection với nhiều channel thay vì liên tục tạo connection mới.

## Detailed Answer (EN)
A connection is a TCP socket between your app and the broker. A channel is a lightweight virtual connection multiplexed over one TCP connection — open one connection, create multiple channels to avoid TCP overhead. Each channel operates independently on different queues, making them efficient for multi-threaded apps. Best practice: one connection with multiple channels rather than many connections.
