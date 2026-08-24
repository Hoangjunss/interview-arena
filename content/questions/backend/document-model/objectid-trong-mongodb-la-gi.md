---
id: objectid-trong-mongodb-la-gi
position: backend
technology: document-model
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ObjectId` trong MongoDB là gì?

## Question (EN)
What is `ObjectId` in MongoDB?

## Đáp án chi tiết (VI)
`ObjectId` là kiểu dữ liệu mặc định cho field `_id` trong MongoDB. Nó dài 12 byte, được sinh sao cho gần như duy nhất kể cả trên nhiều máy, và **chứa sẵn phần timestamp** nên có thể suy ra thời điểm tạo gần đúng (đỡ cần thêm cột `createdAt` nếu chỉ cần tương đối).\
\
*Lưu ý:* đừng nhầm `ObjectId(\\"...\\")` với string thường. Nếu app lưu id dạng string nhưng query bằng `ObjectId` (hoặc ngược lại), query sẽ không khớp và index cũng không phát huy tác dụng.

## Detailed Answer (EN)
`ObjectId` is the default type for the `_id` field in MongoDB. It is 12 bytes, generated to be nearly unique even across many machines, and **embeds a timestamp**, so you can derive an approximate creation time (often saving a separate `createdAt` column if you only need it roughly).\
\
*Note:* don't confuse `ObjectId(\\"...\\")` with a plain string. If the app stores an id as a string but queries with `ObjectId` (or vice versa), the query won't match and the index won't help.
