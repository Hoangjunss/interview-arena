---
id: bean-lifecycle-trong-spring-boot-postconstruct-va-predestroy-dung-khi-nao
position: backend
technology: core-\u0026-annotations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bean lifecycle trong Spring Boot: @PostConstruct và @PreDestroy dùng khi nào?

## Question (EN)
Bean lifecycle in Spring Boot: when do you use @PostConstruct and @PreDestroy?

## Đáp án chi tiết (VI)
**Bean lifecycle:** instantiate (constructor) → inject dependency (`@Autowired`) → **`@PostConstruct`** → bean ready → **`@PreDestroy`** (khi context đóng).\
\
**`@PostConstruct`** — method init gọi **sau khi DI xong** (trong constructor dependency chưa được inject nên không init ở đó được): load cache từ DB, validate config, khởi tạo connection pool.\
\
**`@PreDestroy`** — giải phóng resource khi shutdown: đóng connection pool, flush buffer, unregister khỏi external service.\
\
**Thay thế:** implement `InitializingBean`/`DisposableBean` hoặc `@Bean(initMethod, destroyMethod)` — `@PostConstruct`/`@PreDestroy` được ưu tiên vì là chuẩn Jakarta, không phụ thuộc Spring API.

## Detailed Answer (EN)
**Bean lifecycle:** instantiate (constructor) → inject dependencies (`@Autowired`) → **`@PostConstruct`** → bean ready → **`@PreDestroy`** (on context close).\
\
**`@PostConstruct`** — init method called **after DI completes** (dependencies are not injected yet inside the constructor, so init cannot happen there): load caches from DB, validate config, set up connection pools.\
\
**`@PreDestroy`** — release resources on shutdown: close connection pools, flush buffers, deregister from external services.\
\
**Alternatives:** implement `InitializingBean`/`DisposableBean` or use `@Bean(initMethod, destroyMethod)` — `@PostConstruct`/`@PreDestroy` are preferred as the Jakarta standard, independent of Spring APIs.
