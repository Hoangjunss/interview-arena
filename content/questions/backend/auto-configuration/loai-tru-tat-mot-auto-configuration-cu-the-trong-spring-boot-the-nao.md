---
id: loai-tru-tat-mot-auto-configuration-cu-the-trong-spring-boot-the-nao
position: backend
technology: auto-configuration
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Loại trừ/tắt một auto-configuration cụ thể trong Spring Boot thế nào?

## Question (EN)
How do you exclude/disable a specific auto-configuration in Spring Boot?

## Đáp án chi tiết (VI)
Spring Boot tự bật auto-config dựa trên classpath. Tắt một cái cụ thể có 3 cách:\
\
**1. Thuộc tính `exclude` của `@SpringBootApplication`** (thực chất uỷ quyền cho `@EnableAutoConfiguration`):\
```java\
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })\
public class App { }\
```\
\
**2. `@EnableAutoConfiguration(exclude = ...)`** nếu không dùng annotation gộp.\
\
**3. Qua property** — dùng khi class không có sẵn trên classpath để tham chiếu:\
```properties\
spring.autoconfigure.exclude=\\\\\
  org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration\
```\
\
Tình huống hay gặp: có `spring-boot-starter-data-jpa` nhưng chưa cấu hình DB → `DataSourceAutoConfiguration` báo lỗi lúc khởi động; loại trừ nó để app chạy được. Muốn biết cái gì đang được auto-config → bật cờ `--debug`, Spring in ra báo cáo \\"Positive/Negative matches\\".

## Detailed Answer (EN)
Spring Boot enables auto-config based on the classpath. To disable a specific one there are 3 ways:\
\
**1. The `exclude` attribute of `@SpringBootApplication`** (which delegates to `@EnableAutoConfiguration`):\
```java\
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })\
public class App { }\
```\
\
**2. `@EnableAutoConfiguration(exclude = ...)`** if you are not using the composed annotation.\
\
**3. Via a property** — use this when the class is not on the classpath to reference:\
```properties\
spring.autoconfigure.exclude=\\\\\
  org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration\
```\
\
Common situation: you have `spring-boot-starter-data-jpa` but no DB configured → `DataSourceAutoConfiguration` fails at startup; exclude it so the app boots. To see what is being auto-configured, enable the `--debug` flag and Spring prints a \\"Positive/Negative matches\\" report.
