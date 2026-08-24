---
id: khi-nao-nen-them-index-va-khi-nao-khong-nen
position: backend
technology: indexing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên thêm index và khi nào không nên?

## Question (EN)
When should you add an index and when should you not?

## Đáp án chi tiết (VI)
**Nên index** khi cột:\
- Xuất hiện trong `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY` của truy vấn chạy thường xuyên.\
- Có **độ chọn lọc (selectivity) cao** — nhiều giá trị phân biệt (email, user_id) nên index lọc bỏ được nhiều hàng.\
- Là foreign key (tăng tốc join và kiểm ràng buộc).\
\
**Không nên (hoặc cẩn trọng)** khi:\
- Bảng **ghi rất nhiều** — mỗi index làm chậm INSERT/UPDATE/DELETE và tốn dung lượng.\
- Cột **độ chọn lọc thấp** (vd boolean, giới tính) — index gần như vô dụng, DB vẫn chọn quét bảng.\
- Bảng nhỏ — quét toàn bảng còn nhanh hơn đi index.\
- Index trùng lặp/không bao giờ được query dùng.\
\
Nguyên tắc: index dựa trên **mẫu truy vấn thực tế** (đo bằng `EXPLAIN`), không phải \\"cứ cột nào cũng index\\".

## Detailed Answer (EN)
**Index** a column when it:\
- Appears in `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY` of frequently run queries.\
- Has **high selectivity** — many distinct values (email, user_id) so the index filters out lots of rows.\
- Is a foreign key (speeds joins and constraint checks).\
\
**Avoid (or be careful)** when:\
- The table is **write-heavy** — every index slows INSERT/UPDATE/DELETE and costs storage.\
- The column has **low selectivity** (e.g. boolean, gender) — the index is nearly useless; the DB still scans.\
- The table is small — a full scan beats walking an index.\
- The index is duplicate or never used by any query.\
\
Rule: index based on **real query patterns** (measured with `EXPLAIN`), not \\"index every column\\".
