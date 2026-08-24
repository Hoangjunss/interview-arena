---
id: message-ttl-la-gi-va-dung-khi-nao
position: backend
technology: reliability-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Message TTL là gì và dùng khi nào?

## Question (EN)
What is message TTL and how would you use it?

## Đáp án chi tiết (VI)
TTL (Time To Live) là thuộc tính message chỉ định thời gian message tồn tại trong queue trước khi hết hạn và bị discard (hoặc gửi đến dead-letter exchange). Dùng khi message trở nên stale — ví dụ: token \\"password reset\\" chỉ hợp lệ 1 giờ, notification \\"giờ cao điểm\\" chỉ relevant 30 phút. Khi TTL hết, message bị xóa, tiết kiệm storage và ngăn consumer xử lý dữ liệu lỗi thời. Cấu hình TTL per-message (linh hoạt hơn) hoặc per-queue (đơn giản hơn).

## Detailed Answer (EN)
TTL (Time To Live) specifies how long a message can exist in a queue before expiring and being discarded or sent to the dead-letter exchange. Use when messages become stale — e.g., a password reset token valid for 1 hour, or a peak-hours notification relevant for only 30 minutes. TTL can be configured per-message (flexible) or per-queue (simpler).
