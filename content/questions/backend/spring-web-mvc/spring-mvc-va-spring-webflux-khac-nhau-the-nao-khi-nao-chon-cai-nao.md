---
id: spring-mvc-va-spring-webflux-khac-nhau-the-nao-khi-nao-chon-cai-nao
position: backend
technology: spring-web-mvc
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring MVC và Spring WebFlux khác nhau thế nào? Khi nào chọn cái nào?

## Question (EN)
What is the difference between Spring MVC and Spring WebFlux? When should you choose each?

## Đáp án chi tiết (VI)
| | **Spring MVC** | **Spring WebFlux** |\
|---|---|---|\
| Model | Thread-per-request (blocking) | Non-blocking, event-driven |\
| Server | Tomcat/Jetty (Servlet) | Netty |\
| Handler trả về | Giá trị trực tiếp (`User`) | `Mono\u003cT\u003e` / `Flux\u003cT\u003e` |\
| DB | JPA, Hibernate, JDBC | R2DBC, Reactive Mongo |\
| Concurrency | ~5K (thread pool) | 100K+ (thread pool nhỏ) |\
| Debug | Stack trace rõ | Khó hơn (async chain) |\
\
**Chọn WebFlux:** high-concurrency I/O-bound (chat, streaming, SSE), gateway forward nhiều request đồng thời, cần backpressure.\
\
**Giữ MVC:** CPU-bound (WebFlux không giúp), dùng JPA/Hibernate (chưa có reactive equivalent trưởng thành), team chưa quen reactive — debug Mono/Flux khó.\
\
**Quan trọng 2026:** **Virtual Threads** (Java 21) giúp MVC đạt concurrency tương đương WebFlux mà vẫn code đồng bộ → nhiều team quay về MVC. Bật: `spring.threads.virtual.enabled=true`.

## Detailed Answer (EN)
| | **Spring MVC** | **Spring WebFlux** |\
|---|---|---|\
| Model | Thread-per-request (blocking) | Non-blocking, event-driven |\
| Server | Tomcat/Jetty (Servlet) | Netty |\
| Handler returns | Direct value (`User`) | `Mono\u003cT\u003e` / `Flux\u003cT\u003e` |\
| DB | JPA, Hibernate, JDBC | R2DBC, Reactive Mongo |\
| Concurrency | ~5K (thread pool) | 100K+ (small thread pool) |\
| Debug | Clear stack traces | Harder (async chains) |\
\
**Choose WebFlux:** high-concurrency I/O-bound (chat, streaming, SSE), gateways forwarding many concurrent requests, backpressure needed.\
\
**Stick with MVC:** CPU-bound (WebFlux does not help), JPA/Hibernate (no mature reactive equivalent), team unfamiliar with reactive — debugging Mono/Flux is hard.\
\
**Important in 2026:** **Virtual Threads** (Java 21) let MVC reach WebFlux-like concurrency with synchronous code → many teams return to MVC. Enable: `spring.threads.virtual.enabled=true`.
