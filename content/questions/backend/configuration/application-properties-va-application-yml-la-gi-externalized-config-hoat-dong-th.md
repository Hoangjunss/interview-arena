---
id: application-properties-va-application-yml-la-gi-externalized-config-hoat-dong-th
position: backend
technology: configuration
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
application.properties và application.yml là gì? Externalized config hoạt động thế nào?

## Question (EN)
What are application.properties and application.yml? How does externalized config work?

## Đáp án chi tiết (VI)
Config externalize settings ra **ngoài code** — giá trị theo môi trường (DB URL, port, log level...) đổi mà không rebuild. Hai format:\
\
```yaml\
# application.yml — phân cấp, gọn cho nested config\
server:\
  port: 8080\
spring:\
  datasource:\
    url: jdbc:postgresql://localhost/db\
```\
(`application.properties` là dạng phẳng: `server.port=8080`, `spring.datasource.url=...`.)\
\
**Đọc trong code:** `@Value(\\"${server.port}\\")` cho 1 property; `@ConfigurationProperties(prefix = \\"app\\")` bind cả nhóm property vào record/class (typed, khuyến nghị — xem câu @Value vs @ConfigurationProperties).\
\
**Profiles:** `application-{dev,prod}.yml`, kích hoạt qua `spring.profiles.active=prod` → 1 JAR cho mọi env.\
\
**Thứ tự ưu tiên (cao→thấp):** command-line args → env vars → `application-{profile}.yml` → `application.yml`. Secret không commit — dùng env var/Vault/Secrets Manager.

## Detailed Answer (EN)
Config files externalize settings **outside code** — env-specific values (DB URL, port, log level) change without a rebuild. Two formats:\
\
```yaml\
# application.yml — hierarchical, cleaner for nested config\
server:\
  port: 8080\
spring:\
  datasource:\
    url: jdbc:postgresql://localhost/db\
```\
(`application.properties` is the flat form: `server.port=8080`, `spring.datasource.url=...`.)\
\
**Reading in code:** `@Value(\\"${server.port}\\")` for one property; `@ConfigurationProperties(prefix = \\"app\\")` binds a whole group into a record/class (typed, recommended — see the @Value vs @ConfigurationProperties item).\
\
**Profiles:** `application-{dev,prod}.yml`, activated via `spring.profiles.active=prod` → one JAR across environments.\
\
**Precedence (high→low):** command-line args → env vars → `application-{profile}.yml` → `application.yml`. Never commit secrets — use env vars/Vault/Secrets Manager.
