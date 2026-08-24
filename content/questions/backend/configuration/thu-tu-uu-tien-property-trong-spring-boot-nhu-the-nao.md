---
id: thu-tu-uu-tien-property-trong-spring-boot-nhu-the-nao
position: backend
technology: configuration
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thứ tự ưu tiên property trong Spring Boot như thế nào?

## Question (EN)
What is the property precedence order in Spring Boot?

## Đáp án chi tiết (VI)
Spring Boot load property từ nhiều nguồn — nguồn ưu tiên cao override nguồn thấp (cao → thấp):\
\
1. **Command-line args** (`--server.port=9090`)\
2. **`SPRING_APPLICATION_JSON`** (env var chứa JSON)\
3. **Java system properties** (`-Dserver.port=9090`)\
4. **OS env vars** (`SERVER_PORT=9090`)\
5. `application-{profile}.yml` **ngoài** JAR\
6. `application.yml` **ngoài** JAR\
7. `application-{profile}.yml` **trong** JAR\
8. `application.yml` **trong** JAR\
9. **`@PropertySource`** trên `@Configuration`\
10. Default (`@Value(\\"${x:default}\\")`, `SpringApplication.setDefaultProperties`)\
\
**Hai quy tắc dễ nhớ:** file **ngoài JAR \u003e trong JAR**; **profile-specific \u003e base** ở cùng vị trí.\
\
**Relaxed binding:** env var `SPRING_DATASOURCE_URL` = property `spring.datasource.url` — Spring tự convert `_` → `.`, uppercase → lowercase.\
\
**Thực tế:** base config trong JAR (`application.yml`) + secret/env-specific override qua env var hoặc `--flag` lúc deploy (Docker/K8s) → không commit secret vào git.

## Detailed Answer (EN)
$85
