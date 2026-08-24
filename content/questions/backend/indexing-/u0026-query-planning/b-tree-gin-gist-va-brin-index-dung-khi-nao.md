---
id: b-tree-gin-gist-va-brin-index-dung-khi-nao
position: backend
technology: indexing-\u0026-query-planning
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
B-tree, GIN, GiST và BRIN index dùng khi nào?

## Question (EN)
When should you use B-tree, GIN, GiST and BRIN indexes?

## Đáp án chi tiết (VI)
PostgreSQL có nhiều loại index, mỗi loại hợp với một kiểu dữ liệu/truy vấn:\
\
- **B-tree** (mặc định): tốt cho so sánh bằng, khoảng (`\u003c`, `\u003e`, `BETWEEN`) và sắp xếp trên giá trị thường (số, chuỗi, ngày).\
- **GIN**: cho dữ liệu \\"nhiều giá trị trong một ô\\" như JSONB, mảng, full-text search — kiểu \\"index ngược\\".\
- **GiST**: cho dữ liệu hình học, khoảng, hoặc toán tử tùy biến (vị trí địa lý, range).\
- **BRIN**: cho bảng cực lớn mà dữ liệu sắp xếp tự nhiên theo thứ tự ghi, ví dụ log/timestamp chỉ thêm vào cuối — index rất nhỏ và rẻ.\
\
Ví dụ GIN cho cột JSONB:\
```sql\
CREATE INDEX idx_events_payload_gin ON events USING gin (payload);\
```\
Chọn theo kiểu toán tử/truy vấn thực tế, đừng chọn vì tên nghe \\"mạnh\\" hơn.

## Detailed Answer (EN)
PostgreSQL has several index types, each suited to a kind of data/query:\
\
- **B-tree** (default): great for equality, ranges (`\u003c`, `\u003e`, `BETWEEN`) and sorting on ordinary values (numbers, text, dates).\
- **GIN**: for \\"many values in one cell\\" data such as JSONB, arrays and full-text search — an \\"inverted index\\".\
- **GiST**: for geometric data, ranges or custom operators (geolocation, range types).\
- **BRIN**: for very large tables whose data is naturally ordered by insertion, e.g. append-only logs/timestamps — a tiny, cheap index.\
\
GIN example for a JSONB column:\
```sql\
CREATE INDEX idx_events_payload_gin ON events USING gin (payload);\
```\
Choose by the actual operator/query pattern, not by which name sounds more powerful.
