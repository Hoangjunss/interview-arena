---
id: get-va-filter-trong-django-orm-khac-nhau-the-nao
position: backend
technology: orm
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`get()` và `filter()` trong Django ORM khác nhau thế nào?

## Question (EN)
How do `get()` and `filter()` differ in the Django ORM?

## Đáp án chi tiết (VI)
- `filter(**kwargs)`: trả về một **QuerySet** (0..n bản ghi), **lazy** (chỉ chạy SQL khi được duyệt), và **chain** được tiếp.\
- `get(**kwargs)`: trả về **đúng một object**. Không có → ném **`DoesNotExist`**; nhiều hơn một → ném **`MultipleObjectsReturned`**.\
\
Dùng `get()` khi chắc chắn truy vấn ra **một** bản ghi theo khóa duy nhất (pk, unique). Dùng `filter()` cho danh sách hoặc điều kiện có thể rỗng — QuerySet rỗng không phải lỗi.\
\
```python\
User.objects.get(pk=1)              # 1 record or raises\
User.objects.filter(is_active=True) # QuerySet (có thể rỗng)\
```\
\
Cần \\"1 hoặc 404\\" trong view thì dùng `get_object_or_404`.

## Detailed Answer (EN)
- `filter(**kwargs)`: returns a **QuerySet** (0..n rows), **lazy** (SQL runs only when iterated), and **chainable**.\
- `get(**kwargs)`: returns **exactly one object**. None → raises **`DoesNotExist`**; more than one → raises **`MultipleObjectsReturned`**.\
\
Use `get()` when you are sure the query yields **one** row by a unique key (pk, unique field). Use `filter()` for lists or conditions that may be empty — an empty QuerySet is not an error.\
\
```python\
User.objects.get(pk=1)              # 1 record or raises\
User.objects.filter(is_active=True) # QuerySet (may be empty)\
```\
\
For \\"one or 404\\" in a view, use `get_object_or_404`.
