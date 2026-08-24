---
id: flutter-luu-du-lieu-cuc-bo-bang-cach-nao-khi-nao-dung-gi
position: backend
technology: local-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flutter lưu dữ liệu cục bộ bằng cách nào? Khi nào dùng gì?

## Question (EN)
How does Flutter store data locally and when do you use which option?

## Đáp án chi tiết (VI)
Chọn theo loại dữ liệu:\
\
- **shared_preferences**: cặp key–value đơn giản (cờ, cấu hình, token nhẹ). Không hợp dữ liệu lớn/có cấu trúc.\
- **File**: đọc/ghi file trong thư mục app cho blob/tài liệu.\
- **SQLite (`sqflite`)**: **CSDL quan hệ** cho dữ liệu có cấu trúc, truy vấn phức tạp, quan hệ giữa bảng — nền tảng cho offline-first. Dùng `whereArgs` để chống SQL injection.\
- **Hive / Isar / Drift**: giải pháp cộng đồng — key-value/NoSQL hoặc ORM trên SQLite, API tiện và nhanh hơn.\
\
Dữ liệu **nhạy cảm** (token, mật khẩu) nên để `flutter_secure_storage` (Keychain/Keystore), không để plaintext.

## Detailed Answer (EN)
Pick by data shape:\
\
- **shared_preferences**: simple key–value pairs (flags, settings, lightweight tokens). Not for large/structured data.\
- **Files**: read/write files in the app directory for blobs/documents.\
- **SQLite (`sqflite`)**: a **relational database** for structured data, complex queries, table relationships — the basis for offline-first. Use `whereArgs` to prevent SQL injection.\
- **Hive / Isar / Drift**: community options — key-value/NoSQL or an ORM over SQLite with nicer, faster APIs.\
\
**Sensitive** data (tokens, passwords) should go in `flutter_secure_storage` (Keychain/Keystore), not plaintext.
