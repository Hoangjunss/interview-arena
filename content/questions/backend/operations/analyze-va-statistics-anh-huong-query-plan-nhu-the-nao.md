---
id: analyze-va-statistics-anh-huong-query-plan-nhu-the-nao
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ANALYZE` và statistics ảnh hưởng query plan như thế nào?

## Question (EN)
How do `ANALYZE` and statistics affect query plans?

## Đáp án chi tiết (VI)
`ANALYZE` thu thập thống kê về phân bố dữ liệu (cột này có bao nhiêu giá trị khác nhau, giá trị nào hay gặp...). Planner dựa vào đó để đoán mỗi bước query trả về bao nhiêu dòng, rồi chọn cách chạy. Nếu thống kê cũ hoặc thiếu, planner đoán sai và có thể chọn nhầm index, kiểu join hay kiểu scan → query chậm.\
\
Sau khi nạp/sửa dữ liệu hàng loạt, chạy `ANALYZE` để planner có số liệu mới. Với cột phân bố lệch hoặc các cột phụ thuộc lẫn nhau, có thể cần tăng \\"statistics target\\" hoặc dùng extended statistics.

## Detailed Answer (EN)
`ANALYZE` collects statistics about data distribution (how many distinct values a column has, which values are common...). The planner uses these to estimate how many rows each query step returns, then picks how to run it. If statistics are stale or missing, the planner guesses wrong and may pick the wrong index, join type or scan type → slow queries.\
\
After a bulk load/update, run `ANALYZE` so the planner has fresh numbers. For skewed columns or columns that depend on each other, you may need a higher \\"statistics target\\" or extended statistics.
