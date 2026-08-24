---
id: topic-exchange-hoat-dong-nhu-the-nao-va-khi-nao-nen-dung
position: backend
technology: exchange-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Topic exchange hoạt động như thế nào và khi nào nên dùng?

## Question (EN)
How does a topic exchange work and when would you use it?

## Đáp án chi tiết (VI)
Topic exchange định tuyến message dùng wildcard pattern: `*` khớp đúng một từ, `#` khớp không hoặc nhiều từ. \
\
**Ví dụ:** pattern \\"user.*\\" khớp \\"user.created\\" và \\"user.deleted\\" nhưng không khớp \\"user.profile.updated\\"; trong khi \\"user.#\\" khớp cả ba. Topic exchange hợp với hệ thống event phân cấp — subscribe \\"orders.#\\" để nhận mọi order event, hoặc \\"orders.payment.*\\" chỉ cho payment events. Tính linh hoạt này cho phép consumer subscribe có chọn lọc mà không cần tạo queue riêng cho từng loại.

## Detailed Answer (EN)
A topic exchange uses wildcard pattern matching: `*` matches exactly one word, `#` matches zero or more. Pattern \\"user.*\\" matches \\"user.created\\" and \\"user.deleted\\" but not \\"user.profile.updated\\
