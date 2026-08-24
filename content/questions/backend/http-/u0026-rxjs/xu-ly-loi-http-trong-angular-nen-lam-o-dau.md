---
id: xu-ly-loi-http-trong-angular-nen-lam-o-dau
position: backend
technology: http-\u0026-rxjs
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xử lý lỗi HTTP trong Angular nên làm ở đâu?

## Question (EN)
Where should HTTP errors be handled in Angular?

## Đáp án chi tiết (VI)
Lỗi HTTP nên được xử lý ở đúng tầng: component/store xử lý lỗi nghiệp vụ cần hiển thị cụ thể; API service normalize response; interceptor xử lý cross-cutting concern như auth, retry, correlation id hoặc global error logging.\
\
Ví dụ service trả fallback có kiểm soát:\
```typescript\
loadUsers() {\
  return this.http.get\u003cUser[]\u003e(\\"/api/users\\").pipe(\
    retry({ count: 2, delay: 500 }),\
    catchError(error =\u003e {\
      this.logger.error(error)\
      return of([])\
    }),\
  )\
}\
```\
Không nuốt mọi lỗi ở interceptor vì component sẽ mất ngữ cảnh để hiển thị message đúng.

## Detailed Answer (EN)
Handle HTTP errors at the right layer: component/store handles business errors that need specific UI; API services normalize responses; interceptors handle cross-cutting concerns such as auth, retry, correlation ids or global error logging.\
\
Controlled fallback example in a service:\
```typescript\
loadUsers() {\
  return this.http.get\u003cUser[]\u003e(\\"/api/users\\").pipe(\
    retry({ count: 2, delay: 500 }),\
    catchError(error =\u003e {\
      this.logger.error(error)\
      return of([])\
    }),\
  )\
}\
```\
Do not swallow every error in an interceptor because components lose the context needed to show the correct message.
