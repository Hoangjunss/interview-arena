---
id: openapi-swagger-tich-hop-voi-spring-boot-the-nao
position: backend
technology: spring-web-mvc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OpenAPI (Swagger) tích hợp với Spring Boot thế nào?

## Question (EN)
How do you integrate OpenAPI (Swagger) with Spring Boot?

## Đáp án chi tiết (VI)
**SpringDoc OpenAPI** tự generate OpenAPI 3 spec từ controller/DTO — không viết YAML thủ công. Thêm `springdoc-openapi-starter-webmvc-ui`.\
\
**Out of the box:** `GET /v3/api-docs` (JSON spec), `GET /swagger-ui.html` (UI tương tác).\
\
**Customize:**\
```java\
@Bean\
OpenAPI customOpenAPI() {\
  return new OpenAPI()\
    .info(new Info().title(\\"My API\\").version(\\"1.0\\"))\
    .addSecurityItem(new SecurityRequirement().addList(\\"bearerAuth\\"))\
    .components(new Components().addSecuritySchemes(\\"bearerAuth\\

## Detailed Answer (EN)
**SpringDoc OpenAPI** auto-generates an OpenAPI 3 spec from controllers/DTOs — no manual YAML. Add `springdoc-openapi-starter-webmvc-ui`.\
\
**Out of the box:** `GET /v3/api-docs` (JSON spec), `GET /swagger-ui.html` (interactive UI).\
\
**Customise:**\
```java\
@Bean\
OpenAPI customOpenAPI() {\
  return new OpenAPI()\
    .info(new Info().title(\\"My API\\").version(\\"1.0\\"))\
    .addSecurityItem(new SecurityRequirement().addList(\\"bearerAuth\\"))\
    .components(new Components().addSecuritySchemes(\\"bearerAuth\\
