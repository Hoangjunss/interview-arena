---
id: spring-boot-3-khac-gi-so-voi-spring-boot-2-nhung-thay-doi-lon-khi-migrate
position: backend
technology: core-\u0026-annotations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Boot 3 khác gì so với Spring Boot 2? Những thay đổi lớn khi migrate?

## Question (EN)
How does Spring Boot 3 differ from Spring Boot 2? What are the major changes when migrating?

## Đáp án chi tiết (VI)
**Spring Boot 3** (2022) — bản major, breaking changes.\
\
**Yêu cầu tối thiểu:** Java **17** (Boot 2: Java 8), **Jakarta EE 10**.\
\
**Thay đổi lớn nhất — namespace:** toàn bộ import `javax.*` → `jakarta.*` (vd `javax.persistence.Entity` → `jakarta.persistence.Entity`, tương tự validation/servlet; **giữ nguyên** `javax.sql`, `javax.xml` — không thuộc Jakarta EE).\
\
**Các thay đổi khác:**\
- **Spring Security 6** — Lambda DSL bắt buộc, bỏ `WebSecurityConfigurerAdapter`.\
- **Spring Data** — `getOne()` deprecated → `getReferenceById()`.\
- **Auto-config** — `spring.factories` → `AutoConfiguration.imports`.\
- **AOT + GraalVM Native Image** hỗ trợ built-in.\
- **HTTP interface** (`@HttpExchange`) thay Feign/RestTemplate proxy.\
\
**Bước migrate:** nâng Java 17+ → đổi namespace javax→jakarta (IDE/OpenRewrite hỗ trợ tự động) → update Security config sang Lambda DSL → soát deprecated API.\
\
**Vì sao migrate:** Java 17 LTS nhanh hơn, Native Image, security fix, long-term support (Boot 2.x đã EOL).

## Detailed Answer (EN)
**Spring Boot 3** (2022) — a major release with breaking changes.\
\
**Minimum requirements:** Java **17** (Boot 2: Java 8), **Jakarta EE 10**.\
\
**Biggest change — namespace:** every `javax.*` import → `jakarta.*` (e.g. `javax.persistence.Entity` → `jakarta.persistence.Entity`, same for validation/servlet; **keep** `javax.sql`, `javax.xml` — not part of Jakarta EE).\
\
**Other changes:**\
- **Spring Security 6** — Lambda DSL mandatory, `WebSecurityConfigurerAdapter` removed.\
- **Spring Data** — `getOne()` deprecated → `getReferenceById()`.\
- **Auto-config** — `spring.factories` → `AutoConfiguration.imports`.\
- **AOT + GraalVM Native Image** supported built-in.\
- **HTTP interface** (`@HttpExchange`) replaces Feign/RestTemplate proxies.\
\
**Migration steps:** upgrade to Java 17+ → rename javax→jakarta (IDE/OpenRewrite automate it) → update Security config to Lambda DSL → review deprecated APIs.\
\
**Why migrate:** Java 17 LTS performance, Native Image, security fixes, long-term support (Boot 2.x is EOL).
