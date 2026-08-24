---
id: cursor-trong-mongodb-la-gi-va-vi-sao-can-pagination
position: backend
technology: sharding-\u0026-scale
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Cursor` trong MongoDB là gì và vì sao cần pagination?

## Question (EN)
What is a `Cursor` in MongoDB and why is pagination needed?

## Đáp án chi tiết (VI)
Hàm `find()` không nạp hết kết quả vào RAM ngay, mà trả về một **cursor** — con trỏ tới tập kết quả. Khi bạn duyệt cursor, MongoDB lấy dữ liệu theo từng batch nhỏ.\
\
Vì vậy khi làm API trả danh sách, **đừng** `toArray()` trên collection lớn (dễ nổ RAM). Hãy phân trang: `limit()` + `skip()` cho dữ liệu nhỏ, hoặc **keyset/cursor pagination** (lọc theo `_id`/timestamp của trang trước) cho dữ liệu lớn — vì `skip()` càng về sau càng chậm.

## Detailed Answer (EN)
The `find()` method does not load all results into RAM at once; it returns a **cursor** — a pointer to the result set. As you iterate, MongoDB fetches data in small batches.\
\
So when building a list API, **don't** `toArray()` on a large collection (you can blow up RAM). Paginate instead: `limit()` + `skip()` for small data, or **keyset/cursor pagination** (filter by the previous page's `_id`/timestamp) for large data — because `skip()` gets slower the deeper you go.
