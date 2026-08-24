---
id: quan-ly-settings-py-cho-nhieu-moi-truong-dev-staging-prod-the-nao-cho-dung
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quản lý `settings.py` cho nhiều môi trường (dev/staging/prod) thế nào cho đúng?

## Question (EN)
How do you manage `settings.py` across environments (dev/staging/prod)?

## Đáp án chi tiết (VI)
Cách phổ biến nhất là **tách settings thành package** theo môi trường, đọc secret qua biến môi trường, và tuyệt đối không commit file `.env` thật vào repo:\
\
```\
config/settings/\
  __init__.py\
  base.py       # phần chung: INSTALLED_APPS, MIDDLEWARE, TEMPLATES\
  dev.py        # from .base import *; DEBUG=True; SQLite\
  prod.py       # from .base import *; DEBUG=False; Postgres; SECURE_*\
  test.py       # in-memory DB, EMAIL_BACKEND=locmem\
```\
\
Khi chạy thì chỉ định bằng `DJANGO_SETTINGS_MODULE=config.settings.prod`. Mấy thứ secret như `SECRET_KEY`, `DATABASE_URL`, API key đọc qua `os.environ` hoặc thư viện `django-environ`.\
\
Hai cái dễ làm hỏng production: một là `from .dev import *` trong `prod.py` rồi override — rất dễ rò `DEBUG=True` ra ngoài. Luôn đi từ `base.py`. Hai là để `SECRET_KEY` mặc định trong code — đó là lỗ hổng nghiêm trọng, CI phải kiểm tra biến môi trường tồn tại trước khi cho deploy.

## Detailed Answer (EN)
The common pattern is to **split settings into a package** per environment, read secrets from environment variables, never commit real `.env` files:\
\
```\
config/settings/\
  __init__.py\
  base.py       # shared: INSTALLED_APPS, MIDDLEWARE, TEMPLATES\
  dev.py        # from .base import *; DEBUG=True; SQLite\
  prod.py       # from .base import *; DEBUG=False; Postgres; SECURE_*\
  test.py       # in-memory DB, EMAIL_BACKEND=locmem\
```\
\
Choose settings at runtime: `DJANGO_SETTINGS_MODULE=config.settings.prod`. Secrets (`SECRET_KEY`, `DATABASE_URL`, API keys) come from `os.environ` or `django-environ`.\
\
**Note:** Do not `from .dev import *` inside `prod.py` and patch — it is easy to leak `DEBUG=True` to production. Always start from `base.py`. A hardcoded `SECRET_KEY` is a serious vulnerability; CI should verify the env var exists before deploying.
