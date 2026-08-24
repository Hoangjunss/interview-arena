---
id: get-or-create-co-an-toan-khi-hai-request-chay-song-song-khong
position: backend
technology: orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`get_or_create()` có an toàn khi hai request chạy song song không?

## Question (EN)
Is `get_or_create()` safe when two requests run concurrently?

## Đáp án chi tiết (VI)
Không, nếu **thiếu ràng buộc unique** ở tầng database.\
\
`get_or_create()` thực chất là `try get → except DoesNotExist → create`. Hai request đồng thời có thể cùng `get` hụt, rồi cùng `create` → hai bản ghi trùng.\
\
Django dựa vào **database làm trọng tài**: nếu field có `unique=True` (hoặc `unique_together` / `UniqueConstraint`), request thua sẽ nhận `IntegrityError`, Django bắt lại và `get` một lần nữa để trả về bản ghi mà request kia vừa tạo.\
\
```python\
class Cart(models.Model):\
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # unique enforced by DB\
\
cart, created = Cart.objects.get_or_create(user=request.user)\
```\
\
**Điểm phải nhớ:**\
- Không có unique constraint → `get_or_create` **không** chống trùng được. Đây là lỗi hay gặp nhất.\
- `defaults={...}` chỉ dùng khi tạo mới, không dùng để lọc.\
- Trên PostgreSQL, `IntegrityError` xảy ra trong một `atomic` block sẽ làm hỏng transaction đó — nếu bạn tự bọc `atomic`, hãy đặt `get_or_create` trong `atomic` con để rollback cục bộ.

## Detailed Answer (EN)
$83
