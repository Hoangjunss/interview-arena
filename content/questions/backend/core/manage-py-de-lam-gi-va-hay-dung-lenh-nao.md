---
id: manage-py-de-lam-gi-va-hay-dung-lenh-nao
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`manage.py` để làm gì và hay dùng lệnh nào?

## Question (EN)
What is `manage.py` and which commands are used most?

## Đáp án chi tiết (VI)
`manage.py` là **CLI wrapper quanh `django-admin`**, set sẵn `DJANGO_SETTINGS_MODULE` cho project hiện tại. Nhờ đó `python manage.py \u003ccmd\u003e` luôn chạy đúng config dev/test/prod đang chọn, không cần khai báo lại.\
\
Mấy lệnh dùng nhiều:\
\
```bash\
python manage.py runserver         # dev server :8000\
python manage.py makemigrations    # sinh file migration từ thay đổi models\
python manage.py migrate           # apply migration vào DB\
python manage.py createsuperuser   # tạo admin account\
python manage.py shell             # REPL có Django context\
python manage.py test              # chạy test suite\
python manage.py collectstatic     # gom static cho production\
python manage.py startapp \u003cname\u003e   # scaffold app mới\
```\
\
Hai thứ hay quên: `runserver` chỉ dành cho dev (production phải dùng Gunicorn/Uvicorn), và file migration sinh ra bắt buộc commit cùng PR — bỏ sót là vỡ deploy ở môi trường khác.

## Detailed Answer (EN)
`manage.py` is a **CLI wrapper around `django-admin`** — it pre-sets `DJANGO_SETTINGS_MODULE` for the current project, so `python manage.py \u003ccmd\u003e` always picks up the right dev/test/prod config.\
\
Common commands:\
\
```bash\
python manage.py runserver         # dev server :8000\
python manage.py makemigrations    # generate migration files from model changes\
python manage.py migrate           # apply migrations to the DB\
python manage.py createsuperuser   # create an admin account\
python manage.py shell             # REPL with Django context\
python manage.py test              # run the test suite\
python manage.py collectstatic     # gather static files for production\
python manage.py startapp \u003cname\u003e   # scaffold a new app\
```\
\
Two things people forget: `runserver` is dev-only (production uses Gunicorn/Uvicorn), and generated migration files must be committed with your PR — missing one breaks deployment on every other environment.
