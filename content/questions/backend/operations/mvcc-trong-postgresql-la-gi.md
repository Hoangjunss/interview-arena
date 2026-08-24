---
id: mvcc-trong-postgresql-la-gi
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MVCC trong PostgreSQL là gì?

## Question (EN)
What is MVCC in PostgreSQL?

## Đáp án chi tiết (VI)
MVCC (Multiversion Concurrency Control) là cách PostgreSQL cho nhiều người đọc-ghi cùng lúc mà ít phải chờ nhau: thay vì bắt người đọc đợi người ghi, mỗi câu lệnh đọc một \\"ảnh chụp\\" dữ liệu nhất quán tại thời điểm của nó. Người ghi tạo phiên bản mới, người đọc cũ vẫn thấy phiên bản cũ.\
\
Đánh đổi: update/delete để lại \\"dead tuple\\" (phiên bản cũ chưa dọn), nên `VACUUM`/autovacuum rất quan trọng để dọn rác, tránh phình bảng và giữ hiệu năng ổn định. Hiểu MVCC là chìa khóa để giải thích isolation, lock, vacuum, và vì sao transaction chạy quá lâu lại gây phình dữ liệu.

## Detailed Answer (EN)
MVCC (Multiversion Concurrency Control) is how PostgreSQL lets many readers and writers work at once with little waiting: instead of making readers wait for writers, each statement reads a consistent \\"snapshot\\" of the data as of its moment. A writer creates a new version while existing readers still see the old one.\
\
Trade-off: updates/deletes leave \\"dead tuples\\" (old, uncleaned versions), so `VACUUM`/autovacuum are vital to clean up, prevent bloat and keep performance stable. Understanding MVCC is the key to explaining isolation, locks, vacuum, and why a very long transaction causes bloat.
