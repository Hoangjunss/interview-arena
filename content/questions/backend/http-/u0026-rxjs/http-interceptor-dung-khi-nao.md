---
id: http-interceptor-dung-khi-nao
position: backend
technology: http-\u0026-rxjs
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTP interceptor dùng khi nào?

## Question (EN)
When should you use an HTTP interceptor?

## Đáp án chi tiết (VI)
Interceptor xử lý cross-cutting concern cho request/response: attach auth token, refresh token, correlation id, logging, retry, error normalization hoặc loading indicator.\
\
Ví dụ functional interceptor:\
```typescript\
export const authInterceptor: HttpInterceptorFn = (req, next) =\u003e {\
  const token = inject(AuthService).token()\
  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })\
\
  return next(authReq)\
}\
\
provideHttpClient(withInterceptors([authInterceptor]))\
```\
Nên giữ interceptor mỏng; business transform để trong API service.

## Detailed Answer (EN)
An interceptor handles cross-cutting concerns for requests/responses: attaching auth tokens, refreshing tokens, correlation ids, logging, retry, error normalization or loading indicators.\
\
Example functional interceptor:\
```typescript\
export const authInterceptor: HttpInterceptorFn = (req, next) =\u003e {\
  const token = inject(AuthService).token()\
  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })\
\
  return next(authReq)\
}\
\
provideHttpClient(withInterceptors([authInterceptor]))\
```\
Keep interceptors thin; business transformations belong in API services.
