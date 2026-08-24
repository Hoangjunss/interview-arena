---
id: lookup-trong-mongodb-la-gi-va-co-rui-ro-gi
position: backend
technology: aggregation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`$lookup` trong MongoDB là gì và có rủi ro gì?

## Question (EN)
What is `$lookup` in MongoDB and what are its risks?

## Đáp án chi tiết (VI)
`$lookup` làm việc giống **LEFT OUTER JOIN** trong SQL: kéo dữ liệu từ một collection khác vào trong lúc aggregate.\
\
**Rủi ro:** MongoDB không phải DB quan hệ, nên `$lookup` thường chậm hơn nhiều khi collection lớn và điều kiện join *không có index*. Nếu bạn thấy mình phải `$lookup` liên tục, nhiều khả năng schema đang bị thiết kế ngược với tinh thần document DB — cân nhắc embed lại hoặc denormalize dữ liệu hay đọc cùng nhau.

## Detailed Answer (EN)
`$lookup` works like a **LEFT OUTER JOIN** in SQL: it pulls data from another collection during aggregation.\
\
**Risk:** MongoDB is not a relational DB, so `$lookup` is usually much slower when the collection is large and the join condition has *no index*. If you find yourself doing `$lookup` constantly, the schema is probably fighting the document-DB model — consider embedding or denormalizing data that is read together.
