---
id: co-replica-roi-thi-con-can-snapshot-khong
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có replica rồi thì còn cần snapshot không?

## Question (EN)
If you have replicas, do you still need snapshots?

## Đáp án chi tiết (VI)
Có. **Replica chống mất node, snapshot chống mất dữ liệu.** Xoá nhầm index thì replica bị xoá theo ngay lập tức — nó là bản sao đồng bộ, không phải bản lưu theo thời điểm.\
\
```bash\
PUT /_snapshot/s3_repo\
{ \\"type\\": \\"s3\\

## Detailed Answer (EN)
Yes. **Replicas protect against node loss; snapshots protect against data loss.** Delete an index by mistake and its replicas go instantly — a replica is a synchronous copy, not a point-in-time backup.\
\
```bash\
PUT /_snapshot/s3_repo\
{ \\"type\\": \\"s3\\
