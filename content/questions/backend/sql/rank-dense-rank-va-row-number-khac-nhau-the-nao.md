---
id: rank-dense-rank-va-row-number-khac-nhau-the-nao
position: backend
technology: sql
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RANK(), DENSE_RANK() và ROW_NUMBER() khác nhau thế nào?

## Question (EN)
How do RANK(), DENSE_RANK() and ROW_NUMBER() differ?

## Đáp án chi tiết (VI)
Cả ba là window function đánh số theo `ORDER BY` trong mỗi partition. Khác nhau khi gặp giá trị bằng nhau (ties):\
\
- **ROW_NUMBER()**: đánh số liên tục duy nhất 1, 2, 3, 4... kể cả khi bằng nhau (thứ tự giữa các dòng bằng nhau là tùy ý).\
- **RANK()**: dòng bằng nhau cùng hạng, nhưng **bỏ số kế tiếp** — ví dụ 1, 1, 3 (nhảy qua 2).\
- **DENSE_RANK()**: dòng bằng nhau cùng hạng nhưng **không bỏ số** — 1, 1, 2.\
\
```sql\
SELECT name, score,\
  ROW_NUMBER() OVER (ORDER BY score DESC) AS rn,\
  RANK()       OVER (ORDER BY score DESC) AS rnk,\
  DENSE_RANK() OVER (ORDER BY score DESC) AS drnk\
FROM players;\
```\
Dùng ROW_NUMBER để lấy \\"một dòng mỗi nhóm\\" (top-N) — bọc trong subquery rồi lọc `WHERE rn = 1`; dùng RANK/DENSE_RANK khi cần xếp hạng có xử lý đồng hạng.

## Detailed Answer (EN)
All three are window functions numbering rows by `ORDER BY` within each partition. They differ on ties:\
\
- **ROW_NUMBER()**: a continuous unique number 1, 2, 3, 4... even for equal values (order among equal rows is arbitrary).\
- **RANK()**: tied rows share a rank but the **next number is skipped** — e.g. 1, 1, 3 (2 is skipped).\
- **DENSE_RANK()**: tied rows share a rank with **no gap** — 1, 1, 2.\
\
```sql\
SELECT name, score,\
  ROW_NUMBER() OVER (ORDER BY score DESC) AS rn,\
  RANK()       OVER (ORDER BY score DESC) AS rnk,\
  DENSE_RANK() OVER (ORDER BY score DESC) AS drnk\
FROM players;\
```\
Use ROW_NUMBER for \\"one row per group\\" (top-N) — wrap it in a subquery and filter `WHERE rn = 1`; use RANK/DENSE_RANK when you need a ranking that handles ties.
