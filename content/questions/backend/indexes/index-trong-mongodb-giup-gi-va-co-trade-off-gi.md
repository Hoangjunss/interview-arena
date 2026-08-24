---
id: index-trong-mongodb-giup-gi-va-co-trade-off-gi
position: backend
technology: indexes
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Index trong MongoDB giúp gì và có trade-off gì?

## Question (EN)
What do indexes help with in MongoDB and what are the trade-offs?

## Đáp án chi tiết (VI)
Giống mục lục sách: index giúp MongoDB tìm thẳng tới document cần thay vì lật cả collection.\
\
**Lợi ích:**\
- Tìm kiếm nhanh hơn (tránh collection scan).\
- Hỗ trợ sắp xếp (`sort`) hiệu quả.\
\
**Đánh đổi:**\
- Tốn thêm dung lượng (disk và RAM).\
- Ghi chậm hơn, vì mỗi `insert`/`update`/`delete` đều phải cập nhật cả index.\
\
**Ví dụ:**\
```javascript\
db.users.createIndex({ email: 1 }, { unique: true })\
```\
*Lưu ý:* đừng index tràn lan mọi field. Hãy dựa vào **query shape thực tế** (hình dạng truy vấn), độ chọn lọc, kiểu sort, và phân tích bằng `explain(\\"executionStats\\")`.

## Detailed Answer (EN)
Like a book's index: it lets MongoDB jump straight to the documents it needs instead of scanning the whole collection.\
\
**Benefits:**\
- Faster lookups (avoids collection scans).\
- Efficient sorting (`sort`).\
\
**Trade-offs:**\
- Extra storage (disk and RAM).\
- Slower writes, since every `insert`/`update`/`delete` must update the index too.\
\
**Example:**\
```javascript\
db.users.createIndex({ email: 1 }, { unique: true })\
```\
*Note:* don't index every field blindly. Base it on real **query shapes**, selectivity, sort patterns, and analyze with `explain(\\"executionStats\\")`.
