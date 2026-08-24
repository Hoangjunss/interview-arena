---
id: interceptor-trong-retrofit-okhttp-la-gi-va-cach-dung
position: backend
technology: data-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Interceptor trong Retrofit/OkHttp là gì và cách dùng?

## Question (EN)
What are Interceptors in Retrofit/OkHttp and how do you use them?

## Đáp án chi tiết (VI)
Interceptor chặn HTTP request/response để chỉnh sửa chúng. Application interceptor chạy một lần cho mỗi request, còn network interceptor chạy cho mỗi lần gọi network thực tế. Dùng phổ biến: thêm auth header, log request/response, xử lý token refresh, cache. \
\
**Ví dụ:** `OkHttpClient().addInterceptor { chain -\u003e chain.proceed(chain.request().newBuilder().addHeader(\\"Authorization\\

## Detailed Answer (EN)
Interceptors intercept HTTP requests and responses to modify them. Application interceptors run once per request, while network interceptors run for each actual network call. Common uses: adding authentication headers, logging, handling token refresh, caching. \
\
**Example:** `OkHttpClient().addInterceptor { chain -\u003e chain.proceed(chain.request().newBuilder().addHeader(\\"Authorization\\
