---
id: httpclient-trong-angular-dung-de-lam-gi
position: backend
technology: http-\u0026-rxjs
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HttpClient trong Angular dùng để làm gì?

## Question (EN)
What is HttpClient used for in Angular?

## Đáp án chi tiết (VI)
`HttpClient` là service chính thức để gọi HTTP API, trả về Observable và hỗ trợ typed response, interceptors, params, headers, progress events và testing utilities.\
\
Trong standalone app thường cấu hình bằng `provideHttpClient()`. Vì Observable của HTTP request là cold, request chỉ chạy khi được subscribe, ví dụ qua service, `async` pipe hoặc bridge sang signal.

## Detailed Answer (EN)
`HttpClient` is the official service for calling HTTP APIs, returning Observables and supporting typed responses, interceptors, params, headers, progress events and testing utilities.\
\
In a standalone app it is usually configured with `provideHttpClient()`. Since HTTP Observables are cold, the request only runs when subscribed, for example through a service, the `async` pipe or a bridge to signals.
