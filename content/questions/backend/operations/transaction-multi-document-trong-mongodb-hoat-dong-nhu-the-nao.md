---
id: transaction-multi-document-trong-mongodb-hoat-dong-nhu-the-nao
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transaction multi-document trong MongoDB hoạt động như thế nào?

## Question (EN)
How do multi-document transactions work in MongoDB?

## Đáp án chi tiết (VI)
Transaction cho phép chạy một loạt thao tác (đọc/ghi) trên nhiều document hay nhiều collection mà vẫn đảm bảo atomicity: một lệnh lỗi thì toàn bộ rollback, và dữ liệu chưa commit không bị transaction khác đọc thấy (isolation).\
\
Trong MongoDB (từ 4.0), transaction chạy qua **session**: client mở session → `startTransaction` → chạy các lệnh → `commitTransaction` (lỗi thì `abortTransaction`). Với sharded cluster, bên dưới MongoDB dùng giao thức **two-phase commit (2PC)** để giữ nhất quán giữa các shard.

## Detailed Answer (EN)
A transaction lets you run a series of operations (read/write) across multiple documents or collections while guaranteeing atomicity: if one operation fails, everything rolls back, and uncommitted data is not visible to other transactions (isolation).\
\
In MongoDB (4.0+), transactions run through a **session**: the client opens a session → `startTransaction` → runs operations → `commitTransaction` (or `abortTransaction` on error). For sharded clusters, MongoDB uses a **two-phase commit (2PC)** protocol under the hood to keep shards consistent.
