---
id: bulk-operations-trong-mongodb-dung-khi-nao
position: backend
technology: sharding-\u0026-scale
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bulk operations trong MongoDB dùng khi nào?

## Question (EN)
When should you use bulk operations in MongoDB?

## Đáp án chi tiết (VI)
Dùng `bulkWrite` khi cần thực hiện nhiều thao tác ghi (`insert`/`update`/`delete`) cùng lúc để tối ưu hiệu năng.\
\
Thay vì gọi 1000 lần `updateOne` (tức 1000 lần đi-về mạng tới DB), `bulkWrite` gom lại thành một (hoặc vài) request lớn, tiết kiệm rất nhiều thời gian network round-trip. Hợp cho import, migrate dữ liệu, hay update hàng loạt từ background job.

## Detailed Answer (EN)
Use `bulkWrite` when you need many write operations (`insert`/`update`/`delete`) at once to optimize performance.\
\
Instead of calling `updateOne` 1000 times (1000 network round trips to the DB), `bulkWrite` batches them into one (or a few) large requests, saving a lot of round-trip time. Ideal for imports, data migration, or batch updates from background jobs.
