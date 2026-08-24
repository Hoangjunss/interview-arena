---
id: cors-trong-spring-boot-cau-hinh-nhu-the-nao
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CORS trong Spring Boot cấu hình như thế nào?

## Question (EN)
How do you configure CORS in Spring Boot?

## Đáp án chi tiết (VI)
**CORS** — browser chặn request từ origin khác. Spring Boot có nhiều cách config.\
\
**Global config (recommended):**\
```java\
@Bean\
WebMvcConfigurer corsConfig() {\
  return new WebMvcConfigurer() {\
    @Override public void addCorsMappings(CorsRegistry reg) {\
      reg.addMapping(\\"/api/**\\")\
        .allowedOrigins(\\"https://app.example.com\\

## Detailed Answer (EN)
**CORS** — browsers block requests from other origins. Spring Boot offers several config options.\
\
**Global config (recommended):**\
```java\
@Bean\
WebMvcConfigurer corsConfig() {\
  return new WebMvcConfigurer() {\
    @Override public void addCorsMappings(CorsRegistry reg) {\
      reg.addMapping(\\"/api/**\\")\
        .allowedOrigins(\\"https://app.example.com\\
