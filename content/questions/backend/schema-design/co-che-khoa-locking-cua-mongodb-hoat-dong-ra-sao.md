---
id: co-che-khoa-locking-cua-mongodb-hoat-dong-ra-sao
position: backend
technology: schema-design
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cơ chế khoá (Locking) của MongoDB hoạt động ra sao?

## Question (EN)
How does locking work in MongoDB?

## Đáp án chi tiết (VI)
MongoDB dùng cơ chế **multi-granularity locking** (khóa nhiều cấp), và với storage engine mặc định WiredTiger, nó khóa ở mức **document** (document-level concurrency control).\
\
Nghĩa là hai luồng cùng ghi vào *hai document khác nhau* trong cùng collection thì **không chặn nhau**. Khóa chỉ xảy ra khi chúng cố cùng sửa *đúng một document*. Nhờ đó throughput ghi của MongoDB rất cao. (Các bản cũ trước đây từng khóa ở mức database/collection, chậm hơn nhiều.)

## Detailed Answer (EN)
MongoDB uses a **multi-granularity locking** mechanism, and with the default WiredTiger storage engine it locks at the **document** level (document-level concurrency control).\
\
This means two threads writing to *two different documents* in the same collection **do not block each other**. Locking only happens when they try to modify the *exact same document*. This gives MongoDB very high write throughput. (Older versions used to lock at the database/collection level, which was much slower.)
