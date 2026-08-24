---
id: select-related-va-prefetch-related-khac-nhau-ra-sao
position: backend
technology: models-\u0026-orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`select_related` và `prefetch_related` khác nhau ra sao?

## Question (EN)
How do `select_related` and `prefetch_related` differ?

## Đáp án chi tiết (VI)
Cả hai đều dùng để chống **N+1 query**, nhưng cho 2 loại quan hệ khác nhau. `select_related(...)` dành cho `ForeignKey` / `OneToOneField` (quan hệ *single*) — Django ghép `JOIN` vào 1 câu SQL, trả về object kèm related đã load. Còn `prefetch_related(...)` dành cho `ManyToMany` và *reverse* `ForeignKey` (quan hệ *multiple*) — Django chạy **2 query** rồi ghép lại trong Python, vì JOIN nhiều-nhiều sẽ phồng kết quả lên rất nhanh.\
\
```python\
# 1 query, JOIN posts ⨝ authors\
Post.objects.select_related('author').all()\
\
# 2 query: lấy authors, rồi lấy mọi posts của họ rồi ghép\
Author.objects.prefetch_related('post_set').all()\
```\
\
Khi cần lọc thêm related, dùng `Prefetch`:\
```python\
from django.db.models import Prefetch\
Author.objects.prefetch_related(\
    Prefetch('post_set', queryset=Post.objects.filter(published=True))\
)\
```\
\
Đừng vội `select_related` cho *mọi* relation — JOIN sâu 4-5 bảng nhiều khi còn chậm hơn 2 query nhỏ. Cài `django-debug-toolbar` hoặc xem `connection.queries` để đo trực tiếp, đừng đoán.

## Detailed Answer (EN)
$82
