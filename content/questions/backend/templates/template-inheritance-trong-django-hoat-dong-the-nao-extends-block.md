---
id: template-inheritance-trong-django-hoat-dong-the-nao-extends-block
position: backend
technology: templates
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Template inheritance trong Django hoạt động thế nào (`{% extends %}` / `{% block %}`)?

## Question (EN)
How does Django template inheritance work (`{% extends %}` / `{% block %}`)?

## Đáp án chi tiết (VI)
Một template cha (`base.html`) định nghĩa **khung chung** và các \\"lỗ trống\\" bằng `{% block ten %}{% endblock %}`. Template con mở đầu bằng `{% extends \\"base.html\\" %}` rồi **override** từng block.\
\
```django\
{# base.html #}\
\u003ctitle\u003e{% block title %}Site{% endblock %}\u003c/title\u003e\
\u003cmain\u003e{% block content %}{% endblock %}\u003c/main\u003e\
\
{# page.html #}\
{% extends \\"base.html\\" %}\
{% block title %}Trang chủ{% endblock %}\
{% block content %}...{% endblock %}\
```\
\
Block nào con không định nghĩa thì giữ nội dung mặc định của cha. Trong block con, gọi `{{ block.super }}` để **chèn thêm** vào nội dung cha thay vì thay hẳn. Mục đích: tránh lặp layout (header/footer/nav) khắp các trang.

## Detailed Answer (EN)
A parent template (`base.html`) defines the **shared skeleton** with placeholders via `{% block name %}{% endblock %}`. A child template starts with `{% extends \\"base.html\\" %}` and then **overrides** individual blocks.\
\
```django\
{# base.html #}\
\u003ctitle\u003e{% block title %}Site{% endblock %}\u003c/title\u003e\
\u003cmain\u003e{% block content %}{% endblock %}\u003c/main\u003e\
\
{# page.html #}\
{% extends \\"base.html\\" %}\
{% block title %}Home{% endblock %}\
{% block content %}...{% endblock %}\
```\
\
Blocks the child does not define keep the parent's default content. Inside a child block, `{{ block.super }}` **appends to** the parent content instead of replacing it. The point: avoid repeating layout (header/footer/nav) across pages.
