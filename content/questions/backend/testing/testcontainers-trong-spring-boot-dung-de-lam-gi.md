---
id: testcontainers-trong-spring-boot-dung-de-lam-gi
position: backend
technology: testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Testcontainers trong Spring Boot dùng để làm gì?

## Question (EN)
What is Testcontainers used for in Spring Boot?

## Đáp án chi tiết (VI)
**Testcontainers** spin up Docker container thật (Postgres, Redis, Kafka...) trong test — integration test với infra thật, không phải H2. Thêm dependency `spring-boot-testcontainers` + `org.testcontainers:postgresql` (scope test).\
\
**Spring Boot 3.1+ — `@ServiceConnection`:**\
```java\
@SpringBootTest\
@Testcontainers\
class UserRepositoryIT {\
  @Container\
  @ServiceConnection   // tự config spring.datasource.* từ container\
  static PostgreSQLContainer\u003c?\u003e postgres = new PostgreSQLContainer\u003c\u003e(\\"postgres:16\\");\
\
  @Autowired UserRepository repo;\
\
  @Test void findByEmail() {\
    repo.save(new User(\\"alice@ex.com\\"));\
    assertThat(repo.findByEmail(\\"alice@ex.com\\")).isPresent();\
  }\
}\
```\
\
**Lợi ích:** test với Postgres thật → bắt lỗi SQL mà H2 bỏ qua; Flyway migration chạy đúng môi trường; CI không cần cài sẵn DB. **Nhược:** chậm hơn H2 (~5-10s startup) → share container để giảm. **Chọn:** H2 cho unit test service; Testcontainers cho integration test repository/DB.

## Detailed Answer (EN)
**Testcontainers** spins up real Docker containers (Postgres, Redis, Kafka…) during tests — integration testing against real infra, not H2. Add `spring-boot-testcontainers` + `org.testcontainers:postgresql` (test scope).\
\
**Spring Boot 3.1+ — `@ServiceConnection`:**\
```java\
@SpringBootTest\
@Testcontainers\
class UserRepositoryIT {\
  @Container\
  @ServiceConnection   // auto-configures spring.datasource.* from the container\
  static PostgreSQLContainer\u003c?\u003e postgres = new PostgreSQLContainer\u003c\u003e(\\"postgres:16\\");\
\
  @Autowired UserRepository repo;\
\
  @Test void findByEmail() {\
    repo.save(new User(\\"alice@ex.com\\"));\
    assertThat(repo.findByEmail(\\"alice@ex.com\\")).isPresent();\
  }\
}\
```\
\
**Benefits:** real Postgres → catches SQL errors H2 ignores; Flyway migrations run in the right environment; no pre-installed DB on CI. **Drawback:** slower than H2 (~5-10s startup) → share containers to reduce it. **Pick:** H2 for service unit tests; Testcontainers for repository/DB integration tests.
