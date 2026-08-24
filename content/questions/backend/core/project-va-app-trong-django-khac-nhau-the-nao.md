---
id: project-va-app-trong-django-khac-nhau-the-nao
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Project và app trong Django khác nhau thế nào?

## Question (EN)
How are a project and an app different in Django?

## Đáp án chi tiết (VI)
**Project** là toàn bộ website — 1 settings, 1 deployment. **App** là một module nghiệp vụ nằm trong project, đóng gói riêng `models.py`, `views.py`, `urls.py`, `migrations/`, có thể bê đi cài lại ở project khác. Một project chứa nhiều app.\
\
Ví dụ một shop: project `mystore` chứa các app `accounts` (user/profile), `catalog` (product/category), `orders` (cart/checkout), `payments` (gateway). Mỗi app gói trọn một mảng nghiệp vụ — đó chính là ý \\"reusable app\\" mà Django nhắc tới.

## Detailed Answer (EN)
**Project** is the whole website (one settings, one deployment); **app** is a reusable business module inside that project. A project contains multiple apps, each with its own `models.py`, `views.py`, `urls.py`, `migrations/`.\
\
A shop example: project `mystore` holds apps `accounts` (user/profile), `catalog` (product/category), `orders` (cart/checkout), `payments` (gateway). Each app can be packaged and installed in another project — that is what \\"reusable app\\" means.\
\
How to split: along *bounded contexts* of the business. Do not jam everything into one huge `core` app — touching one thing drags migrations for 30 models. Also do not over-split (one app per model) — overhead with no real reuse.
