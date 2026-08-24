---
id: toi-uu-mot-cau-query-cham-nhu-the-nao-explain-dung-de-lam-gi
position: backend
technology: query-optimization
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tối ưu một câu query chậm như thế nào? EXPLAIN dùng để làm gì?

## Question (EN)
How do you optimize a slow query? What is EXPLAIN for?

## Đáp án chi tiết (VI)
**EXPLAIN** cho biết **kế hoạch thực thi** (execution plan) DB chọn: cách quét bảng, thứ tự join, ước lượng chi phí/số hàng. `EXPLAIN ANALYZE` chạy thật và trả thời gian + số hàng **thực tế**.\
\
Đọc plan để tìm điểm nghẽn:\
- **Seq Scan** (quét toàn bảng) trên bảng lớn → cân nhắc thêm **index** cho cột trong `WHERE`/`JOIN`.\
- Ước lượng lệch xa thực tế → chạy `ANALYZE` để cập nhật **statistics**.\
- **Nested Loop** join trên tập lớn → thường thiếu index.\
\
Các bước tối ưu hay dùng: thêm index phù hợp, chỉ `SELECT` cột cần, tránh bọc cột index trong hàm (làm mất khả năng dùng index), thêm `LIMIT`, và xử lý N+1 bằng batch/join. Luôn đo trước–sau bằng `EXPLAIN ANALYZE`, đừng đoán.

## Detailed Answer (EN)
**EXPLAIN** shows the **execution plan** the DB chose: how it scans tables, join order, estimated cost/rows. `EXPLAIN ANALYZE` actually runs it and returns real time + **actual** row counts.\
\
Read the plan to find bottlenecks:\
- **Seq Scan** (full table scan) on a large table → consider an **index** on the `WHERE`/`JOIN` column.\
- Estimates far off from actuals → run `ANALYZE` to refresh **statistics**.\
- **Nested Loop** join over large sets → often a missing index.\
\
Common optimizations: add the right index, `SELECT` only needed columns, avoid wrapping an indexed column in a function (defeats the index), add `LIMIT`, and fix N+1 with batching/joins. Always measure before/after with `EXPLAIN ANALYZE` — do not guess.
