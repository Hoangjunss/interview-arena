---
id: coalesce-va-nullif-dung-de-lam-gi-cho-vi-du-thuc-te
position: backend
technology: null-handling
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`COALESCE` và `NULLIF` dùng để làm gì? Cho ví dụ thực tế.

## Question (EN)
What are `COALESCE` and `NULLIF` used for? Give practical examples.

## Đáp án chi tiết (VI)
`COALESCE(a, b, c, ...)` trả về **đối số không NULL đầu tiên** — dùng để đặt giá trị mặc định. `NULLIF(a, b)` trả về **NULL nếu `a = b`**, ngược lại trả về `a` — dùng để biến một giá trị \\"xấu\\" thành NULL.\
\
Cặp này hay đi chung để **chặn lỗi chia cho 0**:\
\
```sql\
SELECT\
  order_id,\
  COALESCE(discount, 0) AS discount,          -- NULL -\u003e 0\
  revenue / NULLIF(visits, 0) AS revenue_per_visit  -- visits = 0 -\u003e NULL, khong loi\
FROM daily_stats;\
```\
\
Nếu chỉ viết `revenue / visits` thì PostgreSQL ném `division by zero` và **cả truy vấn hỏng**; đổi mẫu số thành NULL khiến kết quả là NULL — một dòng báo cáo trống thay vì cả báo cáo lỗi.\
\
Một dụng khác của `NULLIF`: chuẩn hoá chuỗi rỗng thành NULL khi nhập liệu từ form: `NULLIF(trim(phone), '')`.\
\
Lưu ý `COALESCE` **đánh giá lười** — dừng ở đối số không NULL đầu tiên, nên đặt biểu thức đắt tiền ở sau cùng.

## Detailed Answer (EN)
`COALESCE(a, b, c, ...)` returns the **first non-NULL argument** — used to supply defaults. `NULLIF(a, b)` returns **NULL when `a = b`**, otherwise `a` — used to turn a \\"bad\\" value into NULL.\
\
The pair is commonly combined to **guard against division by zero**:\
\
```sql\
SELECT\
  order_id,\
  COALESCE(discount, 0) AS discount,                -- NULL -\u003e 0\
  revenue / NULLIF(visits, 0) AS revenue_per_visit  -- visits = 0 -\u003e NULL, no error\
FROM daily_stats;\
```\
\
Plain `revenue / visits` makes PostgreSQL raise `division by zero` and the **whole query fails**; turning the denominator into NULL yields a NULL result — one blank report cell instead of a broken report.\
\
Another use of `NULLIF`: normalising empty form input to NULL, e.g. `NULLIF(trim(phone), '')`.\
\
Note that `COALESCE` is **lazily evaluated** — it stops at the first non-NULL argument, so put expensive expressions last.
