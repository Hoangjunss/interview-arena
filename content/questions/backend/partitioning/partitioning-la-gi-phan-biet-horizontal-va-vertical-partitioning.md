---
id: partitioning-la-gi-phan-biet-horizontal-va-vertical-partitioning
position: backend
technology: partitioning
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Partitioning là gì? Phân biệt horizontal và vertical partitioning.

## Question (EN)
What is partitioning? Distinguish horizontal and vertical partitioning.

## Đáp án chi tiết (VI)
Partitioning chia một bảng lớn thành nhiều phần nhỏ dễ quản lý, thường **trong cùng một DB** (khác sharding — thường trải qua nhiều máy).\
\
- **Horizontal partitioning**: chia theo **hàng**, mỗi partition giữ một tập hàng theo tiêu chí (khoảng ngày, danh sách vùng, hash). Vd bảng `orders` chia theo tháng. PostgreSQL hỗ trợ `PARTITION BY RANGE | LIST | HASH`.\
- **Vertical partitioning**: chia theo **cột** — tách nhóm cột ít dùng / cột lớn (blob, text) sang bảng riêng để bảng chính gọn, đọc nhanh hơn.\
\
Lợi ích horizontal partitioning:\
- **Partition pruning**: planner chỉ quét partition liên quan → truy vấn nhanh.\
- Bảo trì rẻ: xóa dữ liệu cũ bằng `DROP`/`DETACH` cả partition thay vì `DELETE` hàng loạt.\
\
Đánh đổi: chọn khóa phân vùng sai làm lệch tải; một số ràng buộc/unique index xuyên partition phức tạp hơn.

## Detailed Answer (EN)
Partitioning splits a large table into smaller, more manageable pieces, usually **within one DB** (unlike sharding, which typically spans machines).\
\
- **Horizontal partitioning**: split by **rows** — each partition holds a set of rows by a criterion (date range, region list, hash). E.g. an `orders` table by month. PostgreSQL supports `PARTITION BY RANGE | LIST | HASH`.\
- **Vertical partitioning**: split by **columns** — move rarely used / large columns (blobs, text) into a separate table so the main table stays compact and reads faster.\
\
Benefits of horizontal partitioning:\
- **Partition pruning**: the planner scans only relevant partitions → faster queries.\
- Cheap maintenance: drop old data by `DROP`/`DETACH`ing a whole partition instead of bulk `DELETE`.\
\
Trade-offs: a bad partition key skews load; some cross-partition constraints/unique indexes get more complex.
