---
id: spring-boot-embedded-server-la-gi-thay-doi-sang-jetty-nhu-the-nao
position: backend
technology: core-\u0026-annotations
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Boot Embedded Server là gì? Thay đổi sang Jetty như thế nào?

## Question (EN)
What is a Spring Boot embedded server? How do you switch to Jetty?

## Đáp án chi tiết (VI)
Spring Boot nhúng web server (Tomcat/Jetty/Undertow) vào JAR — deploy như executable, không cần cài server riêng. **Mặc định:** Tomcat (`spring-boot-starter-web`).\
\
**Đổi sang Jetty:** exclude Tomcat khỏi starter-web rồi thêm `spring-boot-starter-jetty`:\
```xml\
\u003cdependency\u003e\
  \u003cartifactId\u003espring-boot-starter-web\u003c/artifactId\u003e\
  \u003cexclusions\u003e\u003cexclusion\u003e\u003cartifactId\u003espring-boot-starter-tomcat\u003c/artifactId\u003e\u003c/exclusion\u003e\u003c/exclusions\u003e\
\u003c/dependency\u003e\
\u003cdependency\u003e\u003cartifactId\u003espring-boot-starter-jetty\u003c/artifactId\u003e\u003c/dependency\u003e\
```\
\
| | Tomcat | Jetty | Undertow |\
|---|---|---|---|\
| Default | Có | Không | Không — |\
| Memory | Trung bình | Thấp | Thấp |\
| Use case | General | Lightweight | High concurrency |\
\
Tuỳ chỉnh qua `server.*` trong `application.yml` (`server.port`, `server.tomcat.threads.max`...). **Ưu điểm:** `java -jar app.jar` một lệnh, mỗi microservice có server riêng, Docker-friendly.

## Detailed Answer (EN)
Spring Boot embeds a web server (Tomcat/Jetty/Undertow) into the JAR — deploy as an executable, no separate server install. **Default:** Tomcat (`spring-boot-starter-web`).\
\
**Switch to Jetty:** exclude Tomcat from starter-web and add `spring-boot-starter-jetty`:\
```xml\
\u003cdependency\u003e\
  \u003cartifactId\u003espring-boot-starter-web\u003c/artifactId\u003e\
  \u003cexclusions\u003e\u003cexclusion\u003e\u003cartifactId\u003espring-boot-starter-tomcat\u003c/artifactId\u003e\u003c/exclusion\u003e\u003c/exclusions\u003e\
\u003c/dependency\u003e\
\u003cdependency\u003e\u003cartifactId\u003espring-boot-starter-jetty\u003c/artifactId\u003e\u003c/dependency\u003e\
```\
\
| | Tomcat | Jetty | Undertow |\
|---|---|---|---|\
| Default | Yes | No | No — |\
| Memory | Medium | Low | Low |\
| Use case | General | Lightweight | High concurrency |\
\
Tune via `server.*` in `application.yml` (`server.port`, `server.tomcat.threads.max`…). **Benefits:** `java -jar app.jar` one command, each microservice has its own server, Docker-friendly.
