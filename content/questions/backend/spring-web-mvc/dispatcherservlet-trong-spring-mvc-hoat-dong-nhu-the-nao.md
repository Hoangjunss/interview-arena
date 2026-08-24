---
id: dispatcherservlet-trong-spring-mvc-hoat-dong-nhu-the-nao
position: backend
technology: spring-web-mvc
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DispatcherServlet trong Spring MVC hoạt động như thế nào?

## Question (EN)
How does the DispatcherServlet work in Spring MVC?

## Đáp án chi tiết (VI)
**DispatcherServlet** là **Front Controller** của Spring MVC — mọi HTTP request đều qua đây trước.\
\
**Flow:**\
```\
HTTP Request → DispatcherServlet\
  1. HandlerMapping  → tìm controller method phù hợp\
  2. HandlerAdapter  → gọi method (convert args, apply interceptor)\
  3. Controller chạy\
  4a. @ResponseBody → MessageConverter (Jackson) → JSON\
  4b. view name → ViewResolver → render template → HTML\
→ HTTP Response\
```\
\
**Component chính:** HandlerMapping (URL → handler), HandlerAdapter (gọi method đúng type), HandlerInterceptor (pre/post: auth, logging), ViewResolver (view name → template), MessageConverter (object → JSON).\
\
**Auto-configured:** Spring Boot tự cấu hình qua `DispatcherServletAutoConfiguration` — không cần khai báo thủ công.

## Detailed Answer (EN)
**DispatcherServlet** is the **Front Controller** of Spring MVC — every HTTP request passes through it first.\
\
**Flow:**\
```\
HTTP Request → DispatcherServlet\
  1. HandlerMapping  → find the matching controller method\
  2. HandlerAdapter  → call the method (convert args, apply interceptors)\
  3. Controller runs\
  4a. @ResponseBody → MessageConverter (Jackson) → JSON\
  4b. view name → ViewResolver → render template → HTML\
→ HTTP Response\
```\
\
**Key components:** HandlerMapping (URL → handler), HandlerAdapter (calls the method with right types), HandlerInterceptor (pre/post: auth, logging), ViewResolver (view name → template), MessageConverter (object → JSON).\
\
**Auto-configured:** Spring Boot wires it all via `DispatcherServletAutoConfiguration` — no manual declaration.
