---
id: vi-sao-khong-nen-de-mot-mang-trong-document-tang-khong-gioi-han
position: backend
technology: schema-design
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không nên để một mảng trong document tăng không giới hạn?

## Question (EN)
Why should you avoid letting an array inside a document grow without bound?

## Đáp án chi tiết (VI)
Vì mảng không giới hạn dẫn tới ba hệ quả xấu cùng lúc:\
\
1. **Chạm trần 16MB.** Một document tối đa 16MB. Mảng `comments` của bài viết viral sẽ đụng trần và mọi lệnh ghi tiếp theo báo lỗi.\
2. **Ghi chậm dần.** Document lớn lên thì WiredTiger phải cấp lại chỗ và ghi lại toàn bộ document mỗi lần `$push`, kể cả khi chỉ thêm một phần tử.\
3. **Đọc tốn băng thông.** Chỉ cần tiêu đề bài viết nhưng vẫn kéo về cả nghìn comment, trừ khi luôn nhớ `$slice`/projection.\
\
Hai cách xử lý:\
\
```js\
// A. giữ mảng có trần: chỉ lưu 20 comment mới nhất để hiển thị nhanh\
db.posts.updateOne(\
  { _id: postId },\
  { $push: { recentComments: { $each: [comment], $slice: -20 } } }\
)\
// B. tách comments ra collection riêng, tham chiếu postId + index theo postId\
```\
\
Nguyên tắc: mảng chỉ nên embed khi số phần tử **có giới hạn tự nhiên và biết trước** (địa chỉ giao hàng, biến thể sản phẩm). Còn thứ tăng theo thời gian không giới hạn thì tách ra.

## Detailed Answer (EN)
Because an unbounded array causes three problems at once:\
\
1. **Hitting the 16MB ceiling.** A document maxes out at 16MB. The `comments` array of a viral post will hit it and every later write fails.\
2. **Writes get slower.** As the document grows, WiredTiger must relocate and rewrite the whole document on each `$push`, even for a single new element.\
3. **Reads waste bandwidth.** You only need the post title but pull back a thousand comments, unless you remember `$slice`/projection every time.\
\
Two ways to handle it:\
\
```js\
// A. cap the array: keep only the 20 newest comments for fast display\
db.posts.updateOne(\
  { _id: postId },\
  { $push: { recentComments: { $each: [comment], $slice: -20 } } }\
)\
// B. move comments to their own collection, referencing postId with an index on it\
```\
\
Rule of thumb: embed an array only when the element count has a **natural, known bound** (shipping addresses, product variants). Anything that grows over time without limit belongs in a separate collection.
