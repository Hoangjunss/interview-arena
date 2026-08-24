---
id: mot-truy-van-chay-cham-ban-chan-doan-va-toi-uu-the-nao
position: backend
technology: query-optimization
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một truy vấn chạy chậm — bạn chẩn đoán và tối ưu thế nào?

## Question (EN)
A query is slow — how do you diagnose and optimize it?

## Đáp án chi tiết (VI)
Quy trình chẩn đoán:\
\
1. **Tìm truy vấn chậm**: bật `log_min_duration_statement` hoặc dùng `pg_stat_statements` để thấy truy vấn tốn tài nguyên nhất.\
2. **`EXPLAIN (ANALYZE, BUFFERS)`**: xem plan thật — có `Seq Scan` trên bảng lớn không, join kiểu gì, `rows` ước lượng lệch thực tế không, có sort/hash tràn đĩa không.\
3. **Sửa theo dấu hiệu**:\
   - Thiếu index trên cột lọc/join → **thêm index** (cân nhắc composite/covering).\
   - Thống kê cũ (ước lượng lệch) → chạy **`ANALYZE`**.\
   - Hàm bọc quanh cột (`WHERE lower(email)=...`) làm mất index → dùng **expression index** hoặc viết lại điều kiện **sargable**.\
   - `SELECT *` khi chỉ cần vài cột → chọn đúng cột, mở đường cho index-only scan.\
   - N+1 từ ORM → JOIN/batch.\
   - Trả quá nhiều hàng → phân trang (keyset), `LIMIT`.\
4. **Đo lại** sau mỗi thay đổi.\
\
Nguyên tắc: **đo trước, đoán sau** — luôn dựa vào EXPLAIN thay vì phỏng đoán.

## Detailed Answer (EN)
Diagnosis workflow:\
\
1. **Find the slow query**: enable `log_min_duration_statement` or use `pg_stat_statements` to see the most resource-heavy queries.\
2. **`EXPLAIN (ANALYZE, BUFFERS)`**: inspect the real plan — is there a `Seq Scan` on a large table, what join type, are estimated `rows` far from actual, is a sort/hash spilling to disk.\
3. **Fix by symptom**:\
   - Missing index on a filter/join column → **add an index** (consider composite/covering).\
   - Stale statistics (bad estimates) → run **`ANALYZE`**.\
   - A function wrapping a column (`WHERE lower(email)=...`) defeats the index → use an **expression index** or rewrite the predicate to be **sargable**.\
   - `SELECT *` when you need a few columns → select only those, enabling an index-only scan.\
   - ORM N+1 → JOIN/batch.\
   - Returning too many rows → paginate (keyset), `LIMIT`.\
4. **Re-measure** after each change.\
\
Rule: **measure first, guess later** — always rely on EXPLAIN rather than intuition.
