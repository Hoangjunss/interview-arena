---
id: mongodb-document-size-limit-anh-huong-schema-design-the-nao
position: backend
technology: document-model
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MongoDB document size limit ảnh hưởng schema design thế nào?

## Question (EN)
How does MongoDB document size limit affect schema design?

## Đáp án chi tiết (VI)
Mỗi document MongoDB tối đa **16MB**. Hệ quả lên thiết kế:\
\
- **Đừng embed vô hạn**: các mảng có thể phình mãi như comments, events, logs, transactions thì không nên cứ nhồi vào document cha — sớm muộn sẽ chạm trần 16MB.\
- **Dùng Reference hoặc Bucket pattern**: nếu dữ liệu con có thể tăng không giới hạn, hãy tách ra. Ví dụ: một đơn hàng có số dòng hàng giới hạn thì embed được; nhưng một user có hàng triệu event thì event nên ở collection riêng, đánh index theo `userId` và `createdAt`.

## Detailed Answer (EN)
Each MongoDB document is capped at **16MB**. Design consequences:\
\
- **Don't embed indefinitely**: arrays that can grow forever — comments, events, logs, transactions — should not keep piling into a parent document; you will eventually hit the 16MB ceiling.\
- **Use References or the Bucket pattern**: if child data can grow without bound, split it out. Example: an order with a bounded number of line items can be embedded; but a user with millions of events should store events in a separate collection, indexed by `userId` and `createdAt`.
