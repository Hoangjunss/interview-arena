---
id: count-count-col-va-count-distinct-col-khac-nhau-the-nao-sum-avg-xu-ly-null-ra-sa
position: backend
technology: aggregates
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`COUNT(*)`, `COUNT(col)` và `COUNT(DISTINCT col)` khác nhau thế nào? `SUM`/`AVG` xử lý NULL ra sao?

## Question (EN)
How do `COUNT(*)`, `COUNT(col)` and `COUNT(DISTINCT col)` differ? How do `SUM`/`AVG` treat NULL?

## Đáp án chi tiết (VI)
Khác nhau ở chỗ **NULL có được đếm hay không**:\
\
- `COUNT(*)` — đếm **số dòng**, kể cả dòng toàn NULL.\
- `COUNT(col)` — đếm số dòng có `col IS NOT NULL`.\
- `COUNT(DISTINCT col)` — đếm số **giá trị khác nhau**, bỏ NULL.\
\
```sql\
-- ratings: 5, NULL, 5, 3\
SELECT COUNT(*),            -- 4\
       COUNT(rating),       -- 3\
       COUNT(DISTINCT rating), -- 2\
       AVG(rating)          -- (5+5+3)/3 = 4.33, KHONG phai /4\
FROM reviews;\
```\
\
Mọi hàm tổng hợp (trừ `COUNT(*)`) đều **bỏ qua NULL**. Vì vậy `AVG(rating)` chia cho số dòng có giá trị, không phải tổng số dòng — nếu muốn coi NULL là 0 thì phải viết `AVG(COALESCE(rating, 0))`.\
\
Lưu ý đi kèm: `COUNT` trên tập rỗng trả về **0**, nhưng `SUM` trên tập rỗng trả về **NULL**. Đoạn code cộng dồn hay lỗi ở đây, nên bọc `COALESCE(SUM(amount), 0)`.

## Detailed Answer (EN)
They differ in **whether NULLs are counted**:\
\
- `COUNT(*)` — counts **rows**, including all-NULL rows.\
- `COUNT(col)` — counts rows where `col IS NOT NULL`.\
- `COUNT(DISTINCT col)` — counts **distinct values**, ignoring NULL.\
\
```sql\
-- ratings: 5, NULL, 5, 3\
SELECT COUNT(*),               -- 4\
       COUNT(rating),          -- 3\
       COUNT(DISTINCT rating), -- 2\
       AVG(rating)             -- (5+5+3)/3 = 4.33, NOT divided by 4\
FROM reviews;\
```\
\
Every aggregate except `COUNT(*)` **skips NULL**. So `AVG(rating)` divides by the number of non-null values, not the row count — to treat NULL as zero you must write `AVG(COALESCE(rating, 0))`.\
\
Related trap: `COUNT` over an empty set returns **0**, but `SUM` over an empty set returns **NULL**. Accumulation code often breaks here, so wrap it as `COALESCE(SUM(amount), 0)`.
