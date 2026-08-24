---
id: dung-f-va-q-the-nao-va-de-giai-quyet-van-de-gi
position: backend
technology: models-\u0026-orm
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng `F()` và `Q()` thế nào và để giải quyết vấn đề gì?

## Question (EN)
How do you use `F()` and `Q()`, and what problems do they solve?

## Đáp án chi tiết (VI)
`F()` tham chiếu giá trị cột ngay ở DB-side để cập nhật mà không cần đọc về Python — nhờ vậy tránh được race condition khi nhiều request cùng tăng cùng một cột.\
\
```python\
from django.db.models import F\
# Sai: race nếu 2 request chạy song song\
product.views = product.views + 1\
product.save()\
# Đúng: Django sinh UPDATE ... SET views = views + 1\
Product.objects.filter(id=pid).update(views=F('views') + 1)\
```\
\
`Q()` đóng gói điều kiện thành object để combine bằng `|` (OR), `\u0026` (AND), `~` (NOT) — `.filter(...)` mặc định chỉ AND, không gộp OR được.\
\
```python\
from django.db.models import Q\
Post.objects.filter(\
    Q(title__icontains='django') | Q(tags__name='django'),\
    published=True,\
)\
```\
\
Hai thứ dễ vấp khi dùng: sau khi `F()` update, instance Python vẫn còn giữ giá trị cũ — muốn đọc giá trị mới phải `refresh_from_db()`. Còn `Q()` lồng nhiều OR trên bảng lớn mà không có index thì Postgres planner sẽ chuyển sang seq scan, search chậm như rùa — cân nhắc index `GIN`/`trigram` cho search.

## Detailed Answer (EN)
**`F()`** references a column value on the DB side so an update happens *without round-tripping to Python* — avoiding race conditions when many requests increment the same column.\
\
```python\
from django.db.models import F\
# Wrong: race when two requests run in parallel\
product.views = product.views + 1\
product.save()\
# Right: Django generates UPDATE ... SET views = views + 1\
Product.objects.filter(id=pid).update(views=F('views') + 1)\
```\
\
**`Q()`** wraps conditions in an object so you can combine them with `|` (OR), `\u0026` (AND), `~` (NOT) — plain `.filter(...)` is AND-only.\
\
```python\
from django.db.models import Q\
Post.objects.filter(\
    Q(title__icontains='django') | Q(tags__name='django'),\
    published=True,\
)\
```\
\
**Note:** After an `F()` update, the Python instance still holds the old value — call `refresh_from_db()` if you need the new one. And many nested OR `Q()` clauses on a large unindexed table push Postgres to a seq scan; consider `GIN`/`trigram` for search.
