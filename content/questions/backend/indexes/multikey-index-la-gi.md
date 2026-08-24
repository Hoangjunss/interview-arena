---
id: multikey-index-la-gi
position: backend
technology: indexes
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Multikey index là gì?

## Question (EN)
What is a multikey index?

## Đáp án chi tiết (VI)
Khi bạn index một field chứa **mảng**, MongoDB tự tạo *multikey index*: nó index **từng phần tử** trong mảng thay vì cả mảng, nên tìm document chứa một phần tử nào đó rất nhanh.\
\
**Ví dụ:**\
```javascript\
db.posts.createIndex({ tags: 1 })\
db.posts.find({ tags: \\"mongodb\\" })\
```\
\
*Lưu ý:* cẩn thận với **compound multikey index**. Nếu index nhiều field mảng cùng lúc (hoặc mảng lồng nhau), số lượng entry index có thể bùng nổ theo kiểu tích Descartes — phình storage và làm chậm ghi. (MongoDB cũng không cho index hai field mảng trong cùng một compound index.)

## Detailed Answer (EN)
When you index a field containing an **array**, MongoDB automatically creates a *multikey index*: it indexes **each element** of the array rather than the whole array, so finding documents containing a given element is fast.\
\
**Example:**\
```javascript\
db.posts.createIndex({ tags: 1 })\
db.posts.find({ tags: \\"mongodb\\" })\
```\
\
*Note:* be careful with **compound multikey indexes**. Indexing multiple array fields at once (or nested arrays) can blow up the number of index entries like a Cartesian product — bloating storage and slowing writes. (MongoDB also won't let you index two array fields in the same compound index.)
