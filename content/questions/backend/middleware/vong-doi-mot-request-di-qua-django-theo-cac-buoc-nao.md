---
id: vong-doi-mot-request-di-qua-django-theo-cac-buoc-nao
position: backend
technology: middleware
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vòng đời một request đi qua Django theo các bước nào?

## Question (EN)
What are the steps of a request's lifecycle through Django?

## Đáp án chi tiết (VI)
Hình dung request đi qua một stack middleware rồi quay ngược lại như đi vào hang rồi đi ra.\
\
```\
WSGI/ASGI server (gunicorn/uvicorn)\
  ↓\
MIDDLEWARE (top → bottom, gọi __call__)\
  ↓\
URL Resolver (URLconf match path → view)\
  ↓\
View (function hoặc CBV.dispatch())\
  ↓\
Template render hoặc serializer (nếu có)\
  ↑\
MIDDLEWARE (bottom → top, xử lý response)\
  ↑\
WSGI/ASGI trả response\
```\
\
Dịch ra code: server gọi `application(request)` → `MIDDLEWARE[0]` → `MIDDLEWARE[1]` → ... → resolve URL → gọi view → có response → middleware unwind theo chiều ngược. Nếu view raise exception, Django đi qua `process_exception()` của middleware từ dưới lên, cuối cùng tới `handler500` nếu không ai xử lý.\
\
Vì middleware bao bọc 2 chiều, mọi blocking I/O trong middleware đều bị tính *2 lần phí*. Async middleware phải khai báo `async_capable = True`; trộn sync/async thì Django tự wrap qua `sync_to_async`/`async_to_sync` và phải trả overhead cho mỗi lần wrap.

## Detailed Answer (EN)
Picture the request entering a **stack** of middleware and unwinding back:\
\
```\
WSGI/ASGI server (gunicorn/uvicorn)\
  ↓\
MIDDLEWARE (top → bottom, __call__)\
  ↓\
URL Resolver (URLconf matches path → view)\
  ↓\
View (function or CBV.dispatch())\
  ↓\
Template render or serializer (if any)\
  ↑\
MIDDLEWARE (bottom → top, processes response)\
  ↑\
WSGI/ASGI returns response\
```\
\
In code: the server calls `application(request)` → `MIDDLEWARE[0]` → `MIDDLEWARE[1]` → ... → URL resolve → view → response → middleware unwinds in reverse.\
\
If an exception fires inside the view → Django walks middleware `process_exception()` bottom-up, then hits `handler500` if nobody handles it.\
\
**Note:** Because middleware wraps both directions, blocking I/O inside one costs *twice*. Async middleware needs `async_capable = True`; mixing sync/async makes Django wrap with `sync_to_async`/`async_to_sync` (overhead).
