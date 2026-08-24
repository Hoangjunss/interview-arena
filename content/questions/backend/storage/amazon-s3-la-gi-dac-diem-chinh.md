---
id: amazon-s3-la-gi-dac-diem-chinh
position: backend
technology: storage
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Amazon S3 là gì? Đặc điểm chính?

## Question (EN)
What is Amazon S3 and its key characteristics?

## Đáp án chi tiết (VI)
S3 (Simple Storage Service) là **object storage** — lưu file dạng **object** trong **bucket**, truy cập qua HTTP API/URL, không phải filesystem hay block storage.\
\
- **Object** = data + metadata + key (tên duy nhất trong bucket). Không có thư mục thật, chỉ là tiền tố (prefix) trong key.\
- **Độ bền cao** (thiết kế 11 số 9 — 99.999999999%), scale gần như vô hạn.\
- **Storage class** theo tần suất truy cập: Standard, Infrequent Access, Glacier (lưu trữ lạnh, rẻ).\
- Dùng cho: static asset/website, backup, data lake, lưu media, log.\
\
Khác **EBS** (block, gắn vào 1 EC2) và **EFS** (file share). S3 hợp lưu **lượng lớn object bất biến**, truy cập qua API.

## Detailed Answer (EN)
S3 (Simple Storage Service) is **object storage** — files are stored as **objects** in **buckets**, accessed via an HTTP API/URL, not a filesystem or block device.\
\
- An **object** = data + metadata + key (unique name in the bucket). There are no real folders, only key prefixes.\
- **Very high durability** (designed for eleven 9s — 99.999999999%), near-unlimited scale.\
- **Storage classes** by access frequency: Standard, Infrequent Access, Glacier (cold, cheap archival).\
- Used for: static assets/websites, backups, data lakes, media, logs.\
\
Unlike **EBS** (block, attached to one EC2) and **EFS** (file share). S3 fits storing **large volumes of immutable objects** accessed via API.
