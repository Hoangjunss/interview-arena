---
id: normalized-cache-o-client-graphql-hoat-dong-the-nao-va-can-dieu-kien-gi
position: backend
technology: cache
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Normalized cache ở client GraphQL hoạt động thế nào và cần điều kiện gì?

## Question (EN)
How does a normalized GraphQL client cache work and what does it require?

## Đáp án chi tiết (VI)
Nó nhận diện object bằng **`__typename` + `id`** của record. Nhờ vậy cùng một object xuất hiện trong nhiều truy vấn chỉ được lưu một bản, và cập nhật nó ở một nơi tự phản ánh ở mọi màn hình đang hiển thị.\
\
```js\
// the store is flat, keyed by __typename + id\
{\
  \\"Post:42\\": { id: \\"42\\

## Detailed Answer (EN)
It identifies objects by **type name plus record identifier**. The same object appearing in several queries is stored once, so updating it in one place is reflected on every visible screen.\
\
```js\
// the store is flat, keyed by __typename + id\
{\
  \\"Post:42\\": { id: \\"42\\
