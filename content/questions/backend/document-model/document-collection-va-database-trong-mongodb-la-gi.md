---
id: document-collection-va-database-trong-mongodb-la-gi
position: backend
technology: document-model
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Document, collection và database trong MongoDB là gì?

## Question (EN)
What are documents, collections and databases in MongoDB?

## Đáp án chi tiết (VI)
- **Document**: đơn vị dữ liệu, lưu dạng BSON, giống một object JSON (gồm các cặp key-value).\
- **Collection**: một nhóm các document, tương tự \\"bảng\\" (table) trong RDBMS — nhưng *không* bắt buộc mọi document cùng cấu trúc.\
- **Database**: một namespace chứa nhiều collection.\
\
Xếp theo độ lớn: database ⊃ collection ⊃ document.\
\
*Lưu ý:* schema linh hoạt không có nghĩa là \\"vô kỷ luật\\". Lên production vẫn nên quy ước schema rõ ở tầng app hoặc dùng **JSON Schema validation**, nếu không dữ liệu sẽ loạn và rất khó query về sau.

## Detailed Answer (EN)
- **Document**: a data unit stored as BSON, like a JSON object (key-value pairs).\
- **Collection**: a group of documents, similar to a \\"table\\" in RDBMS — but it does *not* require every document to share the same shape.\
- **Database**: a namespace holding many collections.\
\
By size: database ⊃ collection ⊃ document.\
\
*Note:* flexible schema does not mean \\"no discipline\\". In production you still want clear schema conventions in the app layer or **JSON Schema validation**; otherwise data gets messy and very hard to query later.
