---
id: backup-va-pitr-trong-postgresql-can-nhung-gi
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Backup và PITR trong PostgreSQL cần những gì?

## Question (EN)
What do backups and PITR need in PostgreSQL?

## Đáp án chi tiết (VI)
PITR (point-in-time recovery) = khả năng khôi phục về *đúng một thời điểm*. Muốn vậy cần hai thứ: một base backup (ảnh chụp toàn bộ DB) cộng với WAL archiving (lưu liên tục mọi thay đổi sau ảnh chụp). Chỉ dùng `pg_dump` (xuất SQL) là không đủ cho RPO/RTO nghiêm túc khi DB lớn hoặc cần phục hồi về thời điểm cụ thể.\
\
Những việc bắt buộc: định kỳ *test restore thật*, mã hóa backup, lưu ở nơi khác cluster, theo dõi lỗi WAL archive, và viết runbook. Một backup chưa từng được restore thử thì chưa thể coi là đáng tin.

## Detailed Answer (EN)
PITR (point-in-time recovery) = the ability to restore to *an exact moment*. For that you need two things: a base backup (a full snapshot of the DB) plus WAL archiving (continuously saving every change after the snapshot). Using only `pg_dump` (SQL export) is not enough for serious RPO/RTO when the DB is large or you must restore to a specific time.\
\
Must-dos: regularly *test the restore for real*, encrypt backups, store them off the cluster, monitor WAL-archive failures, and write a runbook. A backup that has never been restore-tested cannot be considered trustworthy.
