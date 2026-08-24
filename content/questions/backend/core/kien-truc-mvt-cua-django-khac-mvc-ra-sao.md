---
id: kien-truc-mvt-cua-django-khac-mvc-ra-sao
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiến trúc MVT của Django khác MVC ra sao?

## Question (EN)
How is Django's MVT different from MVC?

## Đáp án chi tiết (VI)
**Django dùng MVT (Model–View–Template)** — bản chất giống MVC nhưng đổi tên cho khớp vai trò thực tế. *Model* = bảng + business logic, *View* = function/class nhận request trả response (đóng vai Controller trong MVC), *Template* = file HTML render dữ liệu (đóng vai View trong MVC).\
\
Điểm hay làm người mới lạc: \\"View\\" của Django **không** phải lớp hiển thị — nó là nơi quyết định request đi đâu, gọi gì, trả gì. Việc render HTML là của Template.\
\
```\
request → URLconf → View (gọi Model, chọn Template) → Response\
```

## Detailed Answer (EN)
**Django uses MVT (Model–View–Template)** — same core as MVC but renamed to match real roles. *Model* = table + business logic, *View* = function/class that takes a request and returns a response (the MVC Controller), *Template* = HTML file that renders data (the MVC View).\
\
The confusing bit: a Django \\"View\\" is **not** the presentation layer — it decides where the request goes, what to call, what to return. Rendering HTML is the Template's job.\
\
```\
request → URLconf → View (calls Model, picks Template) → Response\
```\
\
A practical rule: do not stuff logic into Templates (nested `{% if %}`, DB queries via custom tags). Templates render; complex logic belongs in Views or in Model/manager helpers.
