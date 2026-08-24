---
id: middleware-trong-django-la-gi-va-de-lam-gi
position: backend
technology: middleware
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware trong Django là gì và để làm gì?

## Question (EN)
What is Django middleware and what is it for?

## Đáp án chi tiết (VI)
**Middleware** là callable bọc quanh pipeline request → view → response, chạy *trước/sau* view cho **mọi request**. Hợp với các cross-cutting concern: auth, session, CSRF, logging, GZip, security header, gắn tenant context vào request.\
\
```python\
class RequestIdMiddleware:\
    def __init__(self, get_response):\
        self.get_response = get_response\
\
    def __call__(self, request):\
        request.id = uuid.uuid4().hex\
        response = self.get_response(request)\
        response['X-Request-ID'] = request.id\
        return response\
```\
\
Register vào `MIDDLEWARE` setting; thứ tự khai báo rất quan trọng — xem [[#9224]]. Đừng nhồi business logic vào middleware vì nó chạy cho *mọi* request kể cả static/admin, rất dễ thành bottleneck. Việc nào chỉ liên quan một view thì đặt ở view hoặc decorator.

## Detailed Answer (EN)
**Middleware** is a callable that wraps the request → view → response pipeline, running *before/after* the view for **every request**. It fits cross-cutting concerns: auth, session, CSRF, logging, GZip, security headers, tenant context.\
\
```python\
class RequestIdMiddleware:\
    def __init__(self, get_response):\
        self.get_response = get_response\
\
    def __call__(self, request):\
        request.id = uuid.uuid4().hex\
        response = self.get_response(request)\
        response['X-Request-ID'] = request.id\
        return response\
```\
\
Register it in the `MIDDLEWARE` setting (order matters — see [[#9224]]).\
\
**Note:** Do not stuff business logic into middleware. It runs on *every* request, including static/admin — easy to become a bottleneck. Anything view-specific belongs in the view or a decorator.
