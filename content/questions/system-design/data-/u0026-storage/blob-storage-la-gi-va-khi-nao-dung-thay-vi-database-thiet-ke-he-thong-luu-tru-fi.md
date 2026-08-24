---
id: blob-storage-la-gi-va-khi-nao-dung-thay-vi-database-thiet-ke-he-thong-luu-tru-fi
position: system-design
technology: data-\u0026-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Blob Storage là gì và khi nào dùng thay vì database? Thiết kế hệ thống lưu trữ file?

## Question (EN)
What is Blob Storage and when should you use it instead of a database? How do you design a file storage system?

## Đáp án chi tiết (VI)
Blob Storage là storage chuyên biệt cho unstructured data (images, video, docs) — dùng thay vì database để tránh làm DB backup lớn và ảnh hưởng query performance. AWS S3, Google Cloud Storage, Azure Blob Storage là các giải pháp phổ biến. Pattern đúng: lưu file lên Blob Storage, chỉ lưu metadata (URL, size, type, owner) trong database.\
\
 Thiết kế hệ thống upload file: Client → generate pre-signed URL từ backend → upload trực tiếp lên S3 (bypass server, tránh bandwidth bottleneck) → backend nhận callback/event để cập nhật DB. Tối ưu: dùng CDN (CloudFront) trước S3 để serve files nhanh cho users globally, enable S3 Transfer Acceleration cho upload quốc tế, dùng multipart upload cho files lớn (\u003e100MB). Security: pre-signed URLs với expiration time, bucket policy không public, virus scanning với Lambda trigger. Storage tiers: S3 Standard → S3 IA (Infrequent Access) → S3 Glacier cho archival – giảm cost đáng kể.

## Detailed Answer (EN)
$83
