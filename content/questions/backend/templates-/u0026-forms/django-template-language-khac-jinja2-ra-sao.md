---
id: django-template-language-khac-jinja2-ra-sao
position: backend
technology: templates-\u0026-forms
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Django Template Language khác Jinja2 ra sao?

## Question (EN)
How is Django Template Language different from Jinja2?

## Đáp án chi tiết (VI)
**Django Template Language (DTL)** là engine mặc định, an toàn theo design: không cho gọi function tuỳ ý từ template, auto-escape HTML, cú pháp `{{ var }}` / `{% tag %}`. **Jinja2** linh hoạt hơn — gọi được Python expression đầy đủ, có macro, render nhanh hơn.\
\
Chọn DTL nếu team không cần logic phức tạp trong template (đúng tinh thần Django: logic ở view, template chỉ hiển thị). Chọn Jinja2 khi cần macro mạnh hoặc đã quen từ Flask. Có thể đăng ký cả 2 engine cùng lúc qua `TEMPLATES` setting, mỗi engine có folder riêng.\
\
```django\
{# DTL #}\
\u003cul\u003e\
{% for p in posts %}\
  \u003cli\u003e{{ p.title }} — {{ p.published_at|date:\\"d/m/Y\\" }}\u003c/li\u003e\
{% endfor %}\
\u003c/ul\u003e\
```

## Detailed Answer (EN)
**Django Template Language (DTL)** is the default engine, safe by design: it does not let you call arbitrary functions from a template (only simple arg passing), auto-escapes HTML, uses `{{ var }}` / `{% tag %}` syntax. **Jinja2** is more flexible — full Python expressions, macros, faster rendering.\
\
Pick DTL when the team does not need complex template logic (the Django way: logic in the view, template just displays). Pick Jinja2 when you need macros or already know it from Flask.\
\
```django\
{# DTL #}\
\u003cul\u003e\
{% for p in posts %}\
  \u003cli\u003e{{ p.title }} — {{ p.published_at|date:\\"d/m/Y\\" }}\u003c/li\u003e\
{% endfor %}\
\u003c/ul\u003e\
```\
\
Register multiple engines at once via the `TEMPLATES` setting; each engine has its own folder.\
\
**Note:** DTL auto-escapes by default — use `|safe` only when the input HTML is *definitely* sanitized. `{% csrf_token %}` is required in POST forms whenever CSRF middleware is enabled.
