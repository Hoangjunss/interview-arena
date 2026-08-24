---
id: covered-query-la-gi-va-lam-sao-de-query-cua-ban-duoc-covered
position: backend
technology: indexes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Covered query là gì và làm sao để query của bạn được \\"covered\\"?

## Question (EN)
What is a covered query and how do you make one?

## Đáp án chi tiết (VI)
**Covered query** là query mà MongoDB trả kết quả **chỉ bằng index**, không cần đọc document trong collection. Trong `explain` bạn thấy stage `IXSCAN` mà **không có `FETCH`** theo sau, và `totalDocsExamined` bằng 0.\
\
Điều kiện:\
1. Mọi field trong **điều kiện lọc** đều nằm trong index.\
2. Mọi field trong **kết quả trả về** cũng nằm trong index.\
3. Phải **loại `_id`** khỏi projection nếu `_id` không có trong index.\
4. Field truy vấn không phải mảng (multikey index không cover được).\
\
```js\
db.users.createIndex({ status: 1, email: 1 })\
\
// covered: lọc theo status, chỉ lấy email, tắt _id\
db.users.find({ status: 'active' }, { _id: 0, email: 1 })\
\
// không covered: lấy thêm name (không có trong index) → phải FETCH document\
db.users.find({ status: 'active' }, { _id: 0, email: 1, name: 1 })\
```\
\
Lợi ích rõ nhất ở các query danh sách/autocomplete tần suất cao: index thường nhỏ hơn dữ liệu nhiều lần nên khả năng nằm sẵn trong RAM cao hơn, tránh được một lần đọc ngẫu nhiên xuống đĩa cho mỗi kết quả.

## Detailed Answer (EN)
A **covered query** is one MongoDB answers **entirely from an index**, without reading documents from the collection. In `explain` you see an `IXSCAN` with **no `FETCH`** after it, and `totalDocsExamined` is 0.\
\
Conditions:\
1. Every field in the **filter** is in the index.\
2. Every field in the **returned result** is in the index.\
3. You must **exclude `_id`** in the projection unless `_id` is part of the index.\
4. The queried fields are not arrays (a multikey index cannot cover).\
\
```js\
db.users.createIndex({ status: 1, email: 1 })\
\
// covered: filter on status, return only email, drop _id\
db.users.find({ status: 'active' }, { _id: 0, email: 1 })\
\
// not covered: name is not in the index → requires a FETCH\
db.users.find({ status: 'active' }, { _id: 0, email: 1, name: 1 })\
```\
\
The gain shows up most on high-frequency list/autocomplete queries: an index is typically many times smaller than the data, so it is far more likely to be resident in RAM, saving one random disk read per result.
