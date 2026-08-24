---
id: wal-write-ahead-logging-la-gi-va-dam-bao-dieu-gi
position: backend
technology: postgresql-internals
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WAL (Write-Ahead Logging) là gì và đảm bảo điều gì?

## Question (EN)
What is WAL (Write-Ahead Logging) and what does it guarantee?

## Đáp án chi tiết (VI)
WAL là nguyên tắc: **ghi thay đổi vào nhật ký (log) trước khi áp vào file dữ liệu**. Mỗi thay đổi được ghi tuần tự vào WAL và **flush xuống đĩa khi commit**; các trang dữ liệu thật có thể ghi sau (chậm hơn).\
\
WAL bảo đảm:\
- **Durability** (chữ D trong ACID): commit thành công nghĩa là đã nằm trong WAL bền vững; nếu sập, khi khởi động lại DB **replay WAL** để khôi phục đúng trạng thái đã commit.\
- **Atomicity/crash recovery**: transaction dở dang được rollback lúc phục hồi.\
\
Lợi ích phụ:\
- Ghi tuần tự (append) **nhanh hơn** ghi ngẫu nhiên khắp file dữ liệu.\
- WAL là nền cho **streaming replication** (follower đọc WAL của leader) và **PITR** (point-in-time recovery).\
\
Liên quan: `checkpoint` định kỳ đẩy trang bẩn xuống đĩa và cho phép cắt bớt WAL cũ.

## Detailed Answer (EN)
WAL is the principle: **write changes to a log before applying them to the data files**. Each change is appended sequentially to the WAL and **flushed to disk on commit**; the actual data pages can be written later (lazily).\
\
WAL guarantees:\
- **Durability** (the D in ACID): a successful commit means it is in the durable WAL; after a crash the DB **replays the WAL** on restart to recover the exact committed state.\
- **Atomicity/crash recovery**: in-flight transactions are rolled back during recovery.\
\
Side benefits:\
- Sequential (append) writes are **faster** than random writes scattered across data files.\
- WAL underpins **streaming replication** (a follower reads the leader's WAL) and **PITR** (point-in-time recovery).\
\
Related: a periodic `checkpoint` flushes dirty pages to disk and lets old WAL be trimmed.
