---
id: aggregate-va-annotate-khac-nhau-the-nao
position: backend
technology: aggregation
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`aggregate()` và `annotate()` khác nhau thế nào?

## Question (EN)
What is the difference between `aggregate()` and `annotate()`?

## Đáp án chi tiết (VI)
`aggregate()` **thu cả QuerySet về một dict duy nhất**; `annotate()` **gắn thêm một cột tính toán vào từng dòng** và vẫn trả về QuerySet.\
\
```python\
from django.db.models import Avg, Count\
\
# one summary value for the whole table\
Book.objects.aggregate(Avg('price'))\
# -\u003e {'price__avg': 120.5}\
\
# one extra field per row\
authors = Author.objects.annotate(book_count=Count('book'))\
authors[0].book_count   # 12\
```\
\
Về SQL: `aggregate()` sinh một `SELECT AVG(...)` không `GROUP BY`; `annotate()` sinh `JOIN` + `GROUP BY` theo khoá chính của model gốc.\
\
**Hệ quả thực tế:** kết quả `annotate()` vẫn `filter()` / `order_by()` tiếp được theo cột vừa gắn (`.order_by('-book_count')`), còn `aggregate()` là điểm kết thúc chuỗi — gọi xong là ra giá trị, không nối thêm được.

## Detailed Answer (EN)
`aggregate()` **collapses the whole QuerySet into a single dict**; `annotate()` **adds a computed column to each row** and still returns a QuerySet.\
\
```python\
from django.db.models import Avg, Count\
\
# one summary value for the whole table\
Book.objects.aggregate(Avg('price'))\
# -\u003e {'price__avg': 120.5}\
\
# one extra field per row\
authors = Author.objects.annotate(book_count=Count('book'))\
authors[0].book_count   # 12\
```\
\
In SQL terms: `aggregate()` produces a `SELECT AVG(...)` with no `GROUP BY`; `annotate()` produces a `JOIN` plus a `GROUP BY` on the base model primary key.\
\
**Practical consequence:** an annotated QuerySet can still be filtered or ordered by the new column (`.order_by('-book_count')`), while `aggregate()` terminates the chain — once called you have a value, not a QuerySet.
