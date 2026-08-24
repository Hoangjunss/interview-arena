---
id: dang-ky-global-exception-filter-bang-app-useglobalfilters-va-bang-token-app-filt
position: backend
technology: exception-filters
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đăng ký global exception filter bằng `app.useGlobalFilters()` và bằng token `APP_FILTER` khác nhau ở điểm nào?

## Question (EN)
What is the difference between registering a global exception filter with `app.useGlobalFilters()` versus the `APP_FILTER` token?

## Đáp án chi tiết (VI)
Khác nhau ở **khả năng dùng dependency injection**.\
\
`app.useGlobalFilters(new AllExceptionsFilter())` chạy **bên ngoài mọi module context**, nên bạn phải tự `new` instance và tự truyền dependency. Filter đó **không inject được** `LoggerService`, `ConfigService`...\
\
Đăng ký qua token `APP_FILTER` trong `providers` của một module thì filter nằm trong IoC container, inject bình thường — mà vẫn có phạm vi **global**:\
\
```ts\
@Module({\
  providers: [\
    { provide: APP_FILTER, useClass: AllExceptionsFilter },\
  ],\
})\
export class AppModule {}\
```\
\
```ts\
@Catch()\
export class AllExceptionsFilter implements ExceptionFilter {\
  constructor(private readonly logger: LoggerService) {}  // hoạt động only with APP_FILTER\
  catch(exception: unknown, host: ArgumentsHost) { /* ... */ }\
}\
```\
\
Quy tắc này áp dụng chung cho `APP_GUARD`, `APP_INTERCEPTOR`, `APP_PIPE`. Lưu ý: đăng ký ở module nào cũng thành global, và có thể khai báo **nhiều** provider `APP_FILTER` — chúng được cộng dồn chứ không ghi đè nhau.

## Detailed Answer (EN)
$84
