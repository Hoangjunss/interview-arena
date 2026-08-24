---
id: gridfs-la-gi-khi-nao-nen-dung
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GridFS là gì? Khi nào nên dùng?

## Question (EN)
What is GridFS and when should you use it?

## Đáp án chi tiết (VI)
GridFS là một đặc tả của MongoDB để lưu và truy xuất file *lớn hơn* giới hạn 16MB của một document.\
\
Nó chẻ file thành nhiều mảnh nhỏ (chunk, mặc định 255KB) và lưu vào hai collection: `fs.files` (metadata) và `fs.chunks` (dữ liệu nhị phân).\
\
**Nên dùng khi:** phải lưu file (audio, video, ảnh lớn) mà kiến trúc không cho dùng object storage (như S3); hoặc muốn file cũng được backup/replicate cùng DB.\
**Không nên dùng khi:** có thể dùng S3/Cloud Storage — chúng rẻ hơn, nhanh hơn và sinh ra để chứa file, tốt hơn nhét file vào database.

## Detailed Answer (EN)
GridFS is a MongoDB specification for storing and retrieving files *larger* than the 16MB document limit.\
\
It splits a file into small chunks (default 255KB) stored in two collections: `fs.files` (metadata) and `fs.chunks` (binary data).\
\
**Use when:** you must store files (audio, video, large images) in an architecture that can't use object storage (like S3); or you want files backed up/replicated alongside the DB.\
**Avoid when:** you can use S3/Cloud Storage — it's cheaper, faster and purpose-built for files, better than stuffing files into a database.
