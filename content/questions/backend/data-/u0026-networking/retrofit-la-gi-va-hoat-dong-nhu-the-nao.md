---
id: retrofit-la-gi-va-hoat-dong-nhu-the-nao
position: backend
technology: data-\u0026-networking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Retrofit là gì và hoạt động như thế nào?

## Question (EN)
What is Retrofit and how does it work?

## Đáp án chi tiết (VI)
Retrofit là HTTP client type-safe chuyển REST API thành Kotlin interface. Bạn định nghĩa interface với method được annotate bằng HTTP verb như `@GET`, `@POST`, thêm kiểu request/response, và Retrofit tự sinh implementation. Nó tự động deserialize JSON response thành Kotlin object, xử lý header, và hỗ trợ cả callback lẫn coroutine. OkHttp là thư viện networking nền mà Retrofit dùng.

## Detailed Answer (EN)
Retrofit is a type-safe HTTP client that converts REST APIs into Kotlin interfaces. You define an interface with methods annotated with HTTP verbs like `@GET`, `@POST`, add request/response types, and Retrofit generates the implementation. It automatically deserializes JSON responses into Kotlin objects, handles headers, and supports both callbacks and coroutines.
