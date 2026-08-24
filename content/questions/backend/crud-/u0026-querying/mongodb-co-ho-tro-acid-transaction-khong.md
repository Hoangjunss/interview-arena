---
id: mongodb-co-ho-tro-acid-transaction-khong
position: backend
technology: crud-\u0026-querying
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MongoDB có hỗ trợ ACID transaction không?

## Question (EN)
Does MongoDB support ACID transactions?

## Đáp án chi tiết (VI)
Có. Từ bản **4.0**, MongoDB hỗ trợ **transaction ACID trên nhiều document** (trên replica set), và từ **4.2** mở rộng cho sharded cluster.\
\
**Nhưng nên nhớ:**\
- MongoDB không sinh ra để lạm dụng transaction như RDBMS.\
- Chạy transaction làm giảm hiệu năng và giữ khóa tài nguyên.\
- Nếu bạn *liên tục* phải transaction qua nhiều collection, hãy xem lại schema: có khi nên embed dữ liệu vào cùng một document để update atomic một phát, thay vì chẻ nhỏ rồi phải gói transaction.

## Detailed Answer (EN)
Yes. Since version **4.0**, MongoDB supports **multi-document ACID transactions** (on replica sets), extended to sharded clusters since **4.2**.\
\
**But keep in mind:**\
- MongoDB is not built to overuse transactions like an RDBMS.\
- Running transactions hurts performance and holds resource locks.\
- If you *constantly* need transactions across collections, revisit your schema: often you should embed data into one document for a single atomic update instead of splitting it and wrapping a transaction.
