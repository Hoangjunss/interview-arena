---
id: findone-find-insertone-updateone-trong-mongodb-dung-the-nao
position: backend
technology: crud-\u0026-querying
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`findOne`, `find`, `insertOne`, `updateOne` trong MongoDB dùng thế nào?

## Question (EN)
How do `findOne`, `find`, `insertOne`, and `updateOne` work in MongoDB?

## Đáp án chi tiết (VI)
Bốn thao tác CRUD cơ bản trên một collection:\
- **`findOne`**: lấy đúng một document khớp điều kiện (hoặc `null`).\
- **`find`**: trả về một *cursor* (con trỏ) tới nhiều document khớp.\
- **`insertOne`**: thêm một document mới.\
- **`updateOne`**: cập nhật document *đầu tiên* khớp filter.\
\
**Ví dụ:**\
```javascript\
await users.insertOne({ email: \\"a@example.com\\

## Detailed Answer (EN)
Four basic CRUD operations on a collection:\
- **`findOne`**: returns exactly one matching document (or `null`).\
- **`find`**: returns a *cursor* (a pointer) to many matching documents.\
- **`insertOne`**: inserts a new document.\
- **`updateOne`**: updates the *first* document matching the filter.\
\
**Example:**\
```javascript\
await users.insertOne({ email: \\"a@example.com\\
