---
id: khi-mongodb-query-cham-thi-debug-tu-dau
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi MongoDB query chậm thì debug từ đâu?

## Question (EN)
Where do you start debugging slow MongoDB queries?

## Đáp án chi tiết (VI)
Quy trình chuẩn khi query chậm:\
\
1. **Bật Database Profiler** (hoặc xem log slow query) để tìm đúng query thủ phạm.\
2. Chạy **`explain(\\"executionStats\\")`** trên query đó.\
3. **Đọc số liệu:** so `totalDocsExamined` với `nReturned`. Nếu *examined* lớn hơn *returned* rất nhiều → DB đang phải lật quá nhiều document để lọc. Xem có `COLLSCAN` (quét cả collection) không, hay đã dùng index scan.\
4. **Khâu sort:** thấy sort trong RAM (`SORT` stage, in-memory) thì thêm index hỗ trợ sort.\
5. Index đã đúng mà vẫn chậm → soi lại **kích thước document** hoặc schema có sai pattern không (vd mảng quá lớn).

## Detailed Answer (EN)
Standard process for a slow query:\
\
1. **Enable the Database Profiler** (or check slow-query logs) to find the actual culprit.\
2. Run **`explain(\\"executionStats\\")`** on it.\
3. **Read the numbers:** compare `totalDocsExamined` with `nReturned`. If examined is far larger than returned → the DB is sifting through too many documents. Check for a `COLLSCAN` (full collection scan) vs an index scan.\
4. **Sort step:** if you see an in-memory sort (`SORT` stage), add an index that supports the sort.\
5. If indexes are correct but it's still slow → inspect **document size** or whether the schema has the wrong pattern (e.g. arrays too large).
