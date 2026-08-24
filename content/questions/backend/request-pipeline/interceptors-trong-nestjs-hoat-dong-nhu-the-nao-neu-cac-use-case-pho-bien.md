---
id: interceptors-trong-nestjs-hoat-dong-nhu-the-nao-neu-cac-use-case-pho-bien
position: backend
technology: request-pipeline
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Interceptors trong NestJS hoạt động như thế nào? Nêu các use-case phổ biến.

## Question (EN)
How do Interceptors work in NestJS? List common use cases.

## Đáp án chi tiết (VI)
Interceptors wrap việc thực thi handler, cho phép chạy code trước và sau handler. Chúng implement `NestInterceptor` với method `intercept(context, next)` trả về `Observable`. Gọi `next.handle()` để tiếp tục pipeline, dùng RxJS operators để transform.\
\
Use-cases phổ biến: Response transform — dùng `map()` để wrap tất cả response trong object chuẩn `{ success: true, data, timestamp }`. Logging — ghi thời gian xử lý với `tap()`. Caching — kiểm tra cache trước, nếu hit thì return `of(cachedData)` bỏ qua handler. Timeout — dùng `timeout(5000)` throw `TimeoutError` sau 5 giây. Error mapping — `catchError()` để transform exceptions.\
\
Apply với `@UseInterceptors()` ở route/controller hoặc global qua `APP_INTERCEPTOR`. Khác Guard và Pipe, Interceptors chạy cả trước lẫn sau handler nên có thể transform response.

## Detailed Answer (EN)
Interceptors wrap handler execution, allowing code to run both before and after the handler. They implement `NestInterceptor` with an `intercept(context, next)` method returning an `Observable`. Call `next.handle()` to continue the pipeline, and use RxJS operators to transform.\
\
Common use cases: Response transform — use `map()` to wrap all responses in a standard `{ success: true, data, timestamp }` object. Logging — record processing time with `tap()`. Caching — check cache first, if hit return `of(cachedData)` bypassing the handler. Timeout — use `timeout(5000)` to throw `TimeoutError` after 5 seconds. Error mapping — `catchError()` to transform exceptions.\
\
Apply with `@UseInterceptors()` at route/controller level or globally via `APP_INTERCEPTOR`. Unlike Guards and Pipes, Interceptors run both before and after the handler, making them capable of transforming responses.
