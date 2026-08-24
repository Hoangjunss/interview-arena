---
id: resttemplate-webclient-va-restclient-khac-nhau-the-nao
position: backend
technology: cloud-\u0026-microservices
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RestTemplate, WebClient và RestClient khác nhau thế nào?

## Question (EN)
How do RestTemplate, WebClient, and RestClient differ?

## Đáp án chi tiết (VI)
Ba cách gọi HTTP từ Spring app đến external API:\
\
| | **RestTemplate** | **WebClient** | **RestClient** |\
|---|---|---|---|\
| Model | Blocking | Non-blocking (reactive) | Blocking (fluent) |\
| Status | Hạn chế — Maintenance mode | Có — Active | Có — Active (Spring 6.1+) |\
| API style | Template method | Fluent builder | Fluent builder |\
\
**RestClient** (recommended cho Spring MVC):\
```java\
@Bean\
RestClient restClient() {\
  return RestClient.builder().baseUrl(\\"https://api.example.com\\").build();\
}\
\
User user = restClient.get().uri(\\"/users/{id}\\

## Detailed Answer (EN)
Three ways to make HTTP calls from a Spring app to external APIs:\
\
| | **RestTemplate** | **WebClient** | **RestClient** |\
|---|---|---|---|\
| Model | Blocking | Non-blocking (reactive) | Blocking (fluent) |\
| Status | Limited — Maintenance mode | Yes — Active | Yes — Active (Spring 6.1+) |\
| API style | Template method | Fluent builder | Fluent builder |\
\
**RestClient** (recommended for Spring MVC):\
```java\
@Bean\
RestClient restClient() {\
  return RestClient.builder().baseUrl(\\"https://api.example.com\\").build();\
}\
\
User user = restClient.get().uri(\\"/users/{id}\\
