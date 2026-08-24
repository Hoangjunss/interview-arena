---
id: spring-boot-starters-la-gi-neu-cac-starter-thuong-dung
position: backend
technology: core-\u0026-annotations
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Boot Starters là gì? Nêu các starter thường dùng.

## Question (EN)
What are Spring Boot Starters? Name some commonly used starters.

## Đáp án chi tiết (VI)
**Starters** là dependency \\"gói sẵn\\" — thêm 1 starter kéo theo tất cả lib + auto-config tương ứng, không cần tự quản từng dependency/version.\
\
| Starter | Gộp gì |\
|---|---|\
| `spring-boot-starter-web` | Spring MVC + Tomcat + Jackson |\
| `spring-boot-starter-data-jpa` | Spring Data JPA + Hibernate + HikariCP |\
| `spring-boot-starter-security` | Spring Security |\
| `spring-boot-starter-test` | JUnit 5 + Mockito + AssertJ |\
| `spring-boot-starter-actuator` | Micrometer + Actuator endpoints |\
| `spring-boot-starter-validation` | Jakarta Bean Validation + Hibernate Validator |\
\
Khai báo 1 artifact là đủ, **không cần version** — `spring-boot-dependencies` **BOM** quản version tất cả lib supported → tương thích, không conflict.\
\
**Custom starter:** tổ chức có thể tạo internal starter để share config chung (DB, auth, logging).

## Detailed Answer (EN)
**Starters** are pre-packaged dependencies — adding one starter pulls in all required libs + the matching auto-config, with no need to manage individual dependencies/versions.\
\
| Starter | Includes |\
|---|---|\
| `spring-boot-starter-web` | Spring MVC + Tomcat + Jackson |\
| `spring-boot-starter-data-jpa` | Spring Data JPA + Hibernate + HikariCP |\
| `spring-boot-starter-security` | Spring Security |\
| `spring-boot-starter-test` | JUnit 5 + Mockito + AssertJ |\
| `spring-boot-starter-actuator` | Micrometer + Actuator endpoints |\
| `spring-boot-starter-validation` | Jakarta Bean Validation + Hibernate Validator |\
\
Declaring one artifact is enough, **no version needed** — the `spring-boot-dependencies` **BOM** manages versions of all supported libs → compatibility, no conflicts.\
\
**Custom starters:** organisations can create internal starters to share common config (DB, auth, logging).
