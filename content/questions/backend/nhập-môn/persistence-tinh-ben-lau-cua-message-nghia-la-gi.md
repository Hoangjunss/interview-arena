---
id: persistence-tinh-ben-lau-cua-message-nghia-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
\\"Persistence\\" (tính bền lâu) của message nghĩa là gì?

## Question (EN)
What does \\"persistence\\" mean for messages?

## Đáp án chi tiết (VI)
Message persistence nghĩa là RabbitMQ ghi message xuống disk thay vì chỉ giữ trong RAM. Khi publish với \\"delivery mode: persistent\\

## Detailed Answer (EN)
Message persistence means RabbitMQ writes the message to disk, not just RAM. Publishing with \\"delivery mode: persistent\\" guarantees survival even if the broker crashes before the consumer processes it. Non-persistent messages (default) live only in RAM for speed but are lost on crash. Use persistent for critical data like payments; non-persistent for disposable notifications.
