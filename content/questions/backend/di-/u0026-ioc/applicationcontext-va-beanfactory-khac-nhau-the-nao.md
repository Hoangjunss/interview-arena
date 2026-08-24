---
id: applicationcontext-va-beanfactory-khac-nhau-the-nao
position: backend
technology: di-\u0026-ioc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ApplicationContext và BeanFactory khác nhau thế nào?

## Question (EN)
How do ApplicationContext and BeanFactory differ?

## Đáp án chi tiết (VI)
`BeanFactory` và `ApplicationContext` đều là Spring IoC container — `ApplicationContext` là **superset**.\
\
| Feature | **BeanFactory** | **ApplicationContext** |\
|---|---|---|\
| Lazy loading | Có — Default | Không — Eager (singleton tạo lúc startup) |\
| AOP, @Transactional | Không | Có |\
| Event publishing | Không | Có — (`ApplicationEvent`) |\
| MessageSource (i18n) | Không | Có |\
| Web context | Không | Có — (`WebApplicationContext`) |\
| Auto-config, Starters | Không | Có |\
\
**Eager của ApplicationContext là ưu điểm production:** lỗi config/wiring lộ ngay lúc startup thay vì lúc request đầu tiên chạm bean.\
\
Event publishing dùng qua `ApplicationEventPublisher.publishEvent(...)` + `@EventListener` — chi tiết xem câu @TransactionalEventListener.\
\
**Kết luận:** Spring Boot luôn dùng `ApplicationContext` (`SpringApplication.run(...)` trả về chính nó). `BeanFactory` là API low-level bên dưới, không dùng trực tiếp trong thực tế.

## Detailed Answer (EN)
`BeanFactory` and `ApplicationContext` are both Spring IoC containers — `ApplicationContext` is the **superset**.\
\
| Feature | **BeanFactory** | **ApplicationContext** |\
|---|---|---|\
| Lazy loading | Yes — Default | No — Eager (singletons created at startup) |\
| AOP, @Transactional | No | Yes |\
| Event publishing | No | Yes — (`ApplicationEvent`) |\
| MessageSource (i18n) | No | Yes |\
| Web context | No | Yes — (`WebApplicationContext`) |\
| Auto-config, Starters | No | Yes |\
\
**ApplicationContext's eager loading is a production advantage:** config/wiring errors surface at startup instead of on the first request that touches the bean.\
\
Event publishing works via `ApplicationEventPublisher.publishEvent(...)` + `@EventListener` — details in the @TransactionalEventListener item.\
\
**Conclusion:** Spring Boot always uses `ApplicationContext` (`SpringApplication.run(...)` returns it). `BeanFactory` is the low-level API underneath, not used directly in practice.
