---
id: jpa-va-hibernate-khac-nhau-the-nao-spring-data-jpa-la-gi
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JPA và Hibernate khác nhau thế nào? Spring Data JPA là gì?

## Question (EN)
How do JPA and Hibernate differ? What is Spring Data JPA?

## Đáp án chi tiết (VI)
| | **JPA** | **Hibernate** | **Spring Data JPA** |\
|---|---|---|---|\
| Là gì | **Specification** (JSR-338) | **Implementation** của JPA | **Abstraction** trên JPA |\
| Ai định nghĩa | Jakarta EE | Red Hat | Spring |\
\
- **JPA** = chuẩn (interface, annotation, JPQL) — chỉ định nghĩa, không chạy được một mình; nhiều implementation: Hibernate, EclipseLink.\
- **Hibernate** = JPA provider phổ biến nhất; thêm HQL, L2 cache, batch processing.\
- **Spring Data JPA** = abstraction phía trên — khai báo interface repository, Spring sinh implementation tự động (query method, pagination; xem câu Spring Data JPA \u0026 @Repository).\
\
**Chuỗi phụ thuộc:** app code → Spring Data JPA → JPA API → Hibernate → JDBC → DB. Starter `spring-boot-starter-data-jpa` kéo sẵn Spring Data JPA + Hibernate + HikariCP.

## Detailed Answer (EN)
| | **JPA** | **Hibernate** | **Spring Data JPA** |\
|---|---|---|---|\
| What it is | **Specification** (JSR-338) | **Implementation** of JPA | **Abstraction** on top of JPA |\
| Defined by | Jakarta EE | Red Hat | Spring |\
\
- **JPA** = the standard (interfaces, annotations, JPQL) — a definition only, cannot run by itself; implementations: Hibernate, EclipseLink.\
- **Hibernate** = the most popular JPA provider; adds HQL, L2 cache, batch processing.\
- **Spring Data JPA** = the abstraction above — declare a repository interface and Spring generates the implementation (query methods, pagination; see the Spring Data JPA \u0026 @Repository item).\
\
**Dependency chain:** app code → Spring Data JPA → JPA API → Hibernate → JDBC → DB. The `spring-boot-starter-data-jpa` starter pulls in Spring Data JPA + Hibernate + HikariCP.
