---
id: foreignkey-onetoonefield-manytomanyfield-khi-nao-dung-cai-nao
position: backend
technology: models
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ForeignKey, OneToOneField, ManyToManyField — khi nào dùng cái nào?

## Question (EN)
ForeignKey, OneToOneField, ManyToManyField — when do you use each?

## Đáp án chi tiết (VI)
Chọn theo tính chất quan hệ:\
\
- **`ForeignKey`** — quan hệ **nhiều-một**: nhiều bản ghi trỏ về một. VD nhiều `Order` thuộc một `User`. Cột khóa nằm ở phía \\"nhiều\\".\
- **`OneToOneField`** — **một-một**, mỗi bên tối đa một. VD `Profile` mở rộng `User`. Bản chất là `ForeignKey(unique=True)`.\
- **`ManyToManyField`** — **nhiều-nhiều**: Django tự tạo **bảng trung gian** (join table). VD `Article` ↔ `Tag`. Cần thêm cột cho quan hệ thì dùng `through=` một model riêng.\
\
Lưu ý `ForeignKey`/`OneToOneField` bắt buộc khai báo **`on_delete`** (`CASCADE`, `PROTECT`, `SET_NULL`, …) để định rõ hành vi khi bản ghi được trỏ tới bị xóa.

## Detailed Answer (EN)
Choose by the nature of the relationship:\
\
- **`ForeignKey`** — **many-to-one**: many rows point to one. E.g. many `Order`s belong to one `User`. The key column sits on the \\"many\\" side.\
- **`OneToOneField`** — **one-to-one**, at most one on each side. E.g. `Profile` extends `User`. Essentially a `ForeignKey(unique=True)`.\
- **`ManyToManyField`** — **many-to-many**: Django creates an **intermediary (join) table**. E.g. `Article` ↔ `Tag`. If the relation needs extra columns, use `through=` with a dedicated model.\
\
Note that `ForeignKey`/`OneToOneField` require **`on_delete`** (`CASCADE`, `PROTECT`, `SET_NULL`, …) to define what happens when the referenced row is deleted.
