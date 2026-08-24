---
id: thiet-ke-bai-viet-va-binh-luan-embed-comment-vao-post-hay-tach-collection-rieng
position: backend
technology: schema-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế bài viết và bình luận: embed comment vào post hay tách collection riêng? Quyết định dựa trên gì?

## Question (EN)
Posts and comments: embed comments in the post or use a separate collection? What drives the decision?

## Đáp án chi tiết (VI)
Quyết định theo **cách truy cập dữ liệu và giới hạn tăng trưởng**, không theo cảm tính \\"NoSQL thì embed\\".\
\
**Embed khi:** dữ liệu con luôn được đọc cùng cha, số lượng có trần, và ít cập nhật riêng lẻ.\
\
```js\
// đơn hàng: item luôn đọc cùng đơn, số dòng có trần, giá đã snapshot\
{ _id, userId, items: [{ sku, name, price, qty }], total, status }\
```\
\
**Tách reference khi:** dữ liệu con tăng không giới hạn, cần phân trang riêng, hoặc được truy vấn độc lập.\
\
```js\
// bình luận: tăng vô hạn, cần phân trang, cần query theo tác giả\
{ _id, postId, authorId, body, createdAt }   // index { postId: 1, createdAt: -1 }\
```\
\
Với bài viết + bình luận, cách thường dùng là **lai**: embed 3-5 comment mới nhất để render trang chi tiết trong một lần đọc, phần còn lại nằm ở collection `comments` và tải khi người dùng bấm \\"xem thêm\\".\
\
Câu hỏi tự kiểm tra: \\"Dữ liệu này có bao giờ được đọc mà không cần cha không?\\" Nếu có, khả năng cao nên tách.

## Detailed Answer (EN)
Decide based on **access pattern and growth bounds**, not on a reflex that \\"NoSQL means embed\\".\
\
**Embed when:** the child data is always read with the parent, its count is bounded, and it is rarely updated on its own.\
\
```js\
// order: line items are always read with the order, bounded, price snapshotted\
{ _id, userId, items: [{ sku, name, price, qty }], total, status }\
```\
\
**Reference when:** the child data grows without bound, needs its own pagination, or is queried independently.\
\
```js\
// comments: unbounded growth, need pagination, queried by author\
{ _id, postId, authorId, body, createdAt }   // index { postId: 1, createdAt: -1 }\
```\
\
For posts and comments the usual answer is a **hybrid**: embed the 3-5 newest comments so the detail page renders in one read, and keep the rest in a `comments` collection loaded on \\"show more\\".\
\
Self-check question: \\"Is this data ever read without its parent?\\" If yes, it most likely belongs in its own collection.
