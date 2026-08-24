---
id: auto-configuration-trong-spring-boot-hoat-dong-the-nao
position: backend
technology: core-\u0026-annotations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Auto-configuration trong Spring Boot hoạt động thế nào?

## Question (EN)
How does auto-configuration work in Spring Boot?

## Đáp án chi tiết (VI)
**Auto-configuration** tự configure bean dựa trên dependency trong classpath — không cần khai báo thủ công.\
\
**Cơ chế:**\
1. `@EnableAutoConfiguration` scan file `META-INF/spring/...AutoConfiguration.imports` (Boot 3) / `spring.factories` (Boot 2).\
2. Mỗi entry là `@Configuration` có `@Conditional` guard:\
   ```java\
   @AutoConfiguration\
   @ConditionalOnClass(DataSource.class)         // chỉ khi driver có trên classpath\
   @ConditionalOnMissingBean(DataSource.class)   // chỉ khi user chưa tự định nghĩa\
   public class DataSourceAutoConfiguration { ... }\
   ```\
3. Condition pass → tạo bean; user tự define bean → `@ConditionalOnMissingBean` chặn auto-config.\
\
**Debug:** chạy với `--debug` → Spring in **auto-config report** (pass/fail từng class). **Tự viết:** tạo file `.imports`, khai config class với `@ConditionalOn*` phù hợp.

## Detailed Answer (EN)
**Auto-configuration** configures beans based on classpath dependencies — no manual declaration needed.\
\
**Mechanism:**\
1. `@EnableAutoConfiguration` scans `META-INF/spring/...AutoConfiguration.imports` (Boot 3) / `spring.factories` (Boot 2).\
2. Each entry is a `@Configuration` guarded by `@Conditional` checks:\
   ```java\
   @AutoConfiguration\
   @ConditionalOnClass(DataSource.class)         // only if the driver is on the classpath\
   @ConditionalOnMissingBean(DataSource.class)   // only if the user has not defined one\
   public class DataSourceAutoConfiguration { ... }\
   ```\
3. Conditions pass → bean is created; user defines the bean → `@ConditionalOnMissingBean` blocks auto-config.\
\
**Debug:** run with `--debug` → Spring prints an **auto-config report** (pass/fail per class). **Write your own:** create an `.imports` file, declare a config class with suitable `@ConditionalOn*` guards.
