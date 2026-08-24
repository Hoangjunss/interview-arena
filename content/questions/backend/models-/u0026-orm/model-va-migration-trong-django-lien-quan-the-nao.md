---
id: model-va-migration-trong-django-lien-quan-the-nao
position: backend
technology: models-\u0026-orm
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Model và migration trong Django liên quan thế nào?

## Question (EN)
How do models and migrations relate in Django?

## Đáp án chi tiết (VI)
**Model** là Python class kế thừa `models.Model`, định nghĩa bảng + field + quan hệ. **Migration** là file Python ghi lại *thay đổi schema* — Django đọc để biết cần `ALTER TABLE` gì khi `migrate`.\
\
```python\
class Post(models.Model):\
    title = models.CharField(max_length=200)\
    created_at = models.DateTimeField(auto_now_add=True)\
```\
```bash\
python manage.py makemigrations   # sinh 0001_initial.py\
python manage.py migrate          # apply lên DB\
```\
Sau khi sửa model (thêm field, đổi type), chạy lại `makemigrations` để sinh file `0002_...py` mới. File migration sinh ra phải commit vào git để môi trường khác cũng có đường đi giống bạn.

## Detailed Answer (EN)
**Model** is a Python class extending `models.Model`, defining table + fields + relations. **Migration** is a Python file recording *schema changes* so Django knows what `ALTER TABLE` to run on `migrate`.\
\
Basic flow:\
```python\
class Post(models.Model):\
    title = models.CharField(max_length=200)\
    created_at = models.DateTimeField(auto_now_add=True)\
```\
```bash\
python manage.py makemigrations   # → 0001_initial.py\
python manage.py migrate          # apply to the DB\
```\
After changing a model (add field, change type), run `makemigrations` again to generate a new `0002_...py` file.\
\
Migrations are fundamentally a **state machine, not a snapshot** — do not hand-edit files already applied in production (create a new one instead) and never delete old migration files from git, or other environments lose the path from state A to state B.
