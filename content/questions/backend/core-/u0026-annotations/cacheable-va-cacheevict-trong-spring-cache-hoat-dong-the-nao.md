---
id: cacheable-va-cacheevict-trong-spring-cache-hoat-dong-the-nao
position: backend
technology: core-\u0026-annotations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Cacheable và @CacheEvict trong Spring Cache hoạt động thế nào?

## Question (EN)
How do @Cacheable and @CacheEvict work in Spring Cache?

## Đáp án chi tiết (VI)
**Spring Cache** cache kết quả method — swap backend (in-memory, Redis, Caffeine) không đổi code.\
\
```java\
@SpringBootApplication @EnableCaching\
class App {}\
\
@Service\
class ProductService {\
  @Cacheable(value = \\"products\\

## Detailed Answer (EN)
**Spring Cache** caches method results — swap the backend (in-memory, Redis, Caffeine) without changing code.\
\
```java\
@SpringBootApplication @EnableCaching\
class App {}\
\
@Service\
class ProductService {\
  @Cacheable(value = \\"products\\
