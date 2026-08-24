---
id: context-processor-la-gi-dung-de-lam-gi
position: backend
technology: templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context processor là gì? Dùng để làm gì?

## Question (EN)
What is a context processor, and what is it for?

## Đáp án chi tiết (VI)
Là một **hàm** nhận `request` và trả về một `dict`; dict đó được **trộn vào context của mọi template** render qua `RequestContext`. Đăng ký trong `TEMPLATES['OPTIONS']['context_processors']`.\
\
Dùng để **inject biến toàn cục** vào mọi template mà không phải truyền tay ở từng view — user hiện tại, cấu hình site, giỏ hàng, feature flag. Django có sẵn vài cái: `auth` cấp biến `user`, `request` cấp `request`.\
\
```python\
def site_settings(request):\
    return {\\"SITE_NAME\\": \\"Luyện Phỏng Vấn\\

## Detailed Answer (EN)
A **function** that takes `request` and returns a `dict`; that dict is **merged into the context of every template** rendered via `RequestContext`. You register it in `TEMPLATES['OPTIONS']['context_processors']`.\
\
Use it to **inject global variables** into all templates without passing them manually from each view — the current user, site config, cart, feature flags. Django ships some: `auth` provides `user`, `request` provides `request`.\
\
```python\
def site_settings(request):\
    return {\\"SITE_NAME\\": \\"Luyện Phỏng Vấn\\
