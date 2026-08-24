---
id: optimistic-concurrency-trong-mongodb-lam-the-nao
position: backend
technology: crud-\u0026-querying
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Optimistic concurrency trong MongoDB làm thế nào?

## Question (EN)
How do you implement optimistic concurrency in MongoDB?

## Đáp án chi tiết (VI)
Optimistic concurrency (khóa lạc quan) thường làm bằng cách đưa một field `version` (hoặc `updatedAt`) vào *điều kiện lọc* khi update.\
\
Cơ chế: đọc document lên (version=1). Khi update, gửi: `updateOne({_id: 1, version: 1}, {$set: {...}, $inc: {version: 1}})`. Nếu trong lúc đó người khác đã sửa (version đã thành 2), lệnh này khớp 0 dòng → `matchedCount === 0`. App hiểu là có xung đột, báo lỗi Conflict và mời user thử lại.\
\
Rất hợp cho form chỉnh sửa dài hoặc tồn kho nhẹ, mà không cần ôm transaction/khóa bi quan.

## Detailed Answer (EN)
Optimistic concurrency is usually done by putting a `version` (or `updatedAt`) field into the update's *filter*.\
\
Mechanism: read the document (version=1). To update, send: `updateOne({_id: 1, version: 1}, {$set: {...}, $inc: {version: 1}})`. If someone else changed it meanwhile (version is now 2), this matches 0 rows → `matchedCount === 0`. The app treats that as a conflict, returns a Conflict error, and asks the user to retry.\
\
Great for long edit forms or lightweight inventory, without holding a transaction/pessimistic lock.
