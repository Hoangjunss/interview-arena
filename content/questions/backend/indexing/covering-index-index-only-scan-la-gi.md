---
id: covering-index-index-only-scan-la-gi
position: backend
technology: indexing
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Covering index / index-only scan là gì?

## Question (EN)
What is a covering index / index-only scan?

## Đáp án chi tiết (VI)
Bình thường DB dùng index để tìm vị trí hàng, rồi **quay lại bảng (heap fetch)** để lấy các cột còn lại. Nếu index đã chứa **tất cả cột mà truy vấn cần** (cả trong `SELECT`, `WHERE`, `ORDER BY`) thì DB đọc luôn từ index, **bỏ qua bước truy cập bảng** → gọi là **index-only scan**, và index đó là **covering index** cho truy vấn.\
\
- PostgreSQL hỗ trợ mệnh đề `INCLUDE`: `CREATE INDEX ... ON t (a) INCLUDE (b)` — b nằm ở leaf để \\"cover\\" nhưng không tham gia sắp xếp/tìm.\
- Lợi: bớt I/O đọc bảng, nhanh hơn rõ với truy vấn nóng.\
- Lưu ý PostgreSQL: index-only scan cần **visibility map** đủ mới (VACUUM giúp), nếu không vẫn phải kiểm tra visibility ở heap.\
\
Đánh đổi: index rộng hơn → tốn dung lượng và ghi chậm hơn.

## Detailed Answer (EN)
Normally the DB uses the index to locate a row, then goes **back to the table (heap fetch)** for the remaining columns. If the index already contains **every column the query needs** (in `SELECT`, `WHERE`, `ORDER BY`), the DB reads straight from the index and **skips the table access** → an **index-only scan**, making that index a **covering index** for the query.\
\
- PostgreSQL supports `INCLUDE`: `CREATE INDEX ... ON t (a) INCLUDE (b)` — b lives in the leaf to \\"cover\\" but is not part of the sort/search key.\
- Benefit: less table I/O, noticeably faster for hot queries.\
- PostgreSQL note: an index-only scan needs a sufficiently fresh **visibility map** (VACUUM helps); otherwise it still checks visibility in the heap.\
\
Trade-off: a wider index costs more storage and slows writes.
