---
id: file-anh-video-nen-luu-o-object-storage-hay-trong-database
position: system-design
technology: storage
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File/ảnh/video nên lưu ở object storage hay trong database?

## Question (EN)
Should files/images/videos be stored in object storage or in a database?

## Đáp án chi tiết (VI)
Lưu **blob lớn** (ảnh, video, file) **trong database** là phản mẫu: làm tăng nhanh dung lượng DB, backup nặng, cache kém, tốn băng thông — DB nên dành cho dữ liệu có cấu trúc và truy vấn.\
\
Cách chuẩn: đưa file vào **object storage** (S3, GCS, R2) và **chỉ lưu URL/metadata trong DB**.\
\
Vì sao object storage hợp:\
- Thiết kế cho object bất biến, **dung lượng gần như vô hạn**, chi phí thấp, độ bền cao (nhiều bản sao).\
- Phục vụ trực tiếp qua **CDN** → giảm tải app server.\
- **Presigned URL**: client upload/download thẳng tới storage mà không đi qua app server → tiết kiệm băng thông và tài nguyên.\
\
Dùng DB chỉ cho blob **rất nhỏ và cần giao dịch chung** (hiếm). Metadata (tên, kích thước, owner, content-type) thì để trong DB để truy vấn.

## Detailed Answer (EN)
Storing **large blobs** (images, video, files) **in the database** is an anti-pattern: it bloats the DB, makes backups heavy, caches poorly, and wastes bandwidth — the DB should hold structured, queryable data.\
\
The standard approach: put files in **object storage** (S3, GCS, R2) and **store only the URL/metadata in the DB**.\
\
Why object storage fits:\
- Designed for immutable objects, **near-unlimited capacity**, low cost, high durability (many replicas).\
- Served directly via a **CDN** → offloads app servers.\
- **Presigned URLs**: clients upload/download straight to storage without going through the app server → saves bandwidth and resources.\
\
Use the DB only for **very small blobs that need to share a transaction** (rare). Keep metadata (name, size, owner, content-type) in the DB for querying.
