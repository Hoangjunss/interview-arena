---
id: vertical-scaling-va-horizontal-scaling-la-gi-uu-nhuoc-diem-cua-tung-loai
position: system-design
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vertical Scaling và Horizontal Scaling là gì? Ưu nhược điểm của từng loại?

## Question (EN)
What are Vertical and Horizontal Scaling? What are the pros and cons of each?

## Đáp án chi tiết (VI)
Vertical Scaling (scale up) là nâng cấp phần cứng của một máy chủ duy nhất: tăng CPU, RAM, SSD – đơn giản, không cần thay đổi code, nhưng bị giới hạn bởi phần cứng tối đa và tạo ra single point of failure.\
\
Horizontal Scaling (scale out) là thêm nhiều máy chủ vào hệ thống, phân phối tải qua load balancer – không giới hạn lý thuyết, fault-tolerant hơn, nhưng phức tạp hơn vì cần xử lý distributed state, session management, và data consistency.\
\
Vertical scaling phù hợp khi muốn giải pháp nhanh cho hệ thống nhỏ/trung bình, hoặc cho database (dễ scale hơn application). Horizontal scaling là lựa chọn dài hạn cho hệ thống lớn như Netflix, Google – stateless services dễ scale ngang, trong khi database cần sharding hoặc replica để scale ngang hiệu quả.

## Detailed Answer (EN)
Vertical Scaling (scale up) means upgrading the hardware of a single server — more CPU, RAM, or storage. Simple and requires no code changes, but limited by hardware maximums and creates a single point of failure.\
\
Horizontal Scaling (scale out) means adding more servers and distributing load through a load balancer — theoretically unlimited, more fault-tolerant, but more complex due to distributed state, session management, and data consistency challenges.\
\
Vertical scaling works well for quick solutions on small or medium systems, or for databases (harder to scale horizontally). Horizontal scaling is the long-term choice for large systems like Netflix and Google — stateless services scale out easily, while databases need sharding or replication.
