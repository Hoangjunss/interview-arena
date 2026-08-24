---
id: null-true-va-blank-true-trong-model-field-khac-nhau-the-nao
position: backend
technology: models
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`null=True` và `blank=True` trong model field khác nhau thế nào?

## Question (EN)
How do `null=True` and `blank=True` differ on a model field?

## Đáp án chi tiết (VI)
Hai thứ ở hai tầng khác nhau, độc lập với nhau:\
\
- `null=True`: **tầng database** — cho phép cột chứa `NULL`.\
- `blank=True`: **tầng validation** (form/admin) — cho phép để trống khi nhập.\
\
Quy ước của Django:\
- Field **text/char**: nên `blank=True` **mà không** `null=True`. Django khuyến nghị \\"rỗng\\" là chuỗi `''`, tránh có hai kiểu rỗng (`NULL` và `''`).\
- Field **số / ngày / ForeignKey** muốn cho phép bỏ trống: cần **cả hai** `null=True, blank=True` (vì không có \\"chuỗi rỗng\\" để lưu).\
\
```python\
bio = models.TextField(blank=True)                    # '' khi trống\
age = models.IntegerField(null=True, blank=True)      # NULL khi trống\
```

## Detailed Answer (EN)
They live at two independent layers:\
\
- `null=True`: **database layer** — the column may store `NULL`.\
- `blank=True`: **validation layer** (forms/admin) — the field may be left empty on input.\
\
Django's convention:\
- **Text/char** fields: prefer `blank=True` **without** `null=True`. Django recommends the empty value be `''`, avoiding two \\"empty\\" states (`NULL` and `''`).\
- **Number / date / ForeignKey** fields that should be optional: need **both** `null=True, blank=True` (there is no empty string to store).\
\
```python\
bio = models.TextField(blank=True)                    # '' when empty\
age = models.IntegerField(null=True, blank=True)      # NULL when empty\
```
