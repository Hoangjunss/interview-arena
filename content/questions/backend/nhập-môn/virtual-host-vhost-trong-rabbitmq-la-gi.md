---
id: virtual-host-vhost-trong-rabbitmq-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Virtual host (vhost) trong RabbitMQ là gì?

## Question (EN)
What is a virtual host (vhost) in RabbitMQ?

## Đáp án chi tiết (VI)
Virtual host là một nhóm logic bên trong một RabbitMQ broker, cung cấp sự cách ly hoàn toàn — mỗi vhost có users, permissions, exchanges, queues, và policies riêng. Giống như có nhiều RabbitMQ broker độc lập trên cùng một máy chủ, rất hữu ích cho ứng dụng multi-tenant. Một user chỉ có quyền truy cập vào các vhost được cấp phép, ngăn chặn các team can thiệp vào nhau.

## Detailed Answer (EN)
A virtual host is a logical grouping within a single broker providing complete isolation — separate users, permissions, exchanges, queues, and policies per vhost. It's like having multiple independent brokers in one server, useful for multi-tenant applications. Users have permissions only in specific vhosts, preventing cross-team interference.
