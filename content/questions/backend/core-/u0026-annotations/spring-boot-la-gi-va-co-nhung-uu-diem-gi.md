---
id: spring-boot-la-gi-va-co-nhung-uu-diem-gi
position: backend
technology: core-\u0026-annotations
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Boot là gì và có những ưu điểm gì?

## Question (EN)
What is Spring Boot and what are its advantages?

## Đáp án chi tiết (VI)
**Spring Boot** là framework tạo app Java/Spring **nhanh, ít cấu hình**, dựng trên Spring Framework để bỏ phần lớn XML và boilerplate.\
\
**Gồm 3 phần chính:**\
1. **Auto-configuration** — tự cấu hình theo dependency có sẵn (thêm Tomcat → tự set up web server).\
2. **Starter dependencies** — gói all-in-one: khai `spring-boot-starter-web` là có Spring MVC + Tomcat + Jackson đúng version.\
3. **Embedded server** — Tomcat nhúng trong JAR, chạy `java -jar app.jar`, không cần cài Tomcat hay file `.war`.\
\
**Ưu điểm:** dựng project vài phút (Spring Initializr), không XML, sẵn Actuator + externalized config; chuẩn cho microservice, REST API, cloud-native.

## Detailed Answer (EN)
**Spring Boot** builds Java/Spring apps **fast, with minimal config**, on top of Spring Framework to remove most XML and boilerplate.\
\
**Three core parts:**\
1. **Auto-configuration** — configures the app from the dependencies present (add Tomcat → web server is set up for you).\
2. **Starter dependencies** — all-in-one bundles: declaring `spring-boot-starter-web` pulls in Spring MVC + Tomcat + Jackson at compatible versions.\
3. **Embedded server** — Tomcat is bundled inside the JAR; run `java -jar app.jar`, no separate Tomcat or `.war` file.\
\
**Advantages:** a working project in minutes (Spring Initializr), no XML, built-in Actuator + externalized config; the standard for microservices, REST APIs, cloud-native.
