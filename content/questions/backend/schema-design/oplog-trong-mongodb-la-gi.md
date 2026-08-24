---
id: oplog-trong-mongodb-la-gi
position: backend
technology: schema-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Oplog trong MongoDB là gì?

## Question (EN)
What is the oplog in MongoDB?

## Đáp án chi tiết (VI)
Oplog (Operations Log) là một capped collection đặc biệt ghi lại **mọi thao tác thay đổi dữ liệu** (insert/update/delete) trên Primary.\
\
Các Secondary \\"đọc đuôi\\" (tail) oplog này và thực thi lại để đồng bộ với Primary — đây chính là cơ chế replication.\
\
Lưu ý vận hành: oplog có kích thước giới hạn (cuốn vòng). Nếu một Secondary chết quá lâu, tụt lại xa hơn cả những gì oplog còn lưu, nó không \\"đuổi kịp\\" được nữa và phải làm **Initial Sync** (copy lại toàn bộ dữ liệu từ đầu) rất tốn thời gian.

## Detailed Answer (EN)
The oplog (Operations Log) is a special capped collection that records **every data-changing operation** (insert/update/delete) on the Primary.\
\
Secondaries \\"tail\\" this oplog and replay it to stay in sync with the Primary — this is the replication mechanism.\
\
Operational note: the oplog has a bounded size (it wraps around). If a Secondary is down too long and falls further behind than the oplog retains, it can no longer catch up and must do an **Initial Sync** (re-copy all data from scratch), which is very slow.
