---
id: spring-cloud-config-server-dung-de-lam-gi
position: backend
technology: cloud-\u0026-microservices
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Cloud Config Server dùng để làm gì?

## Question (EN)
What is Spring Cloud Config Server used for?

## Đáp án chi tiết (VI)
**Config Server** tập trung config cho nhiều service — thay vì mỗi service tự giữ `application.yml`, tất cả đọc từ **1 nguồn chung**, thường là Git repo (config được version, review, audit qua commit).\
\
**Server:** dependency `spring-cloud-config-server` + `@EnableConfigServer`, trỏ `spring.cloud.config.server.git.uri` đến repo chứa file config.\
\
**Client:** khai `spring.config.import: configserver:http://config:8888` (cách hiện tại — thay `bootstrap.properties` cũ) → app kéo config lúc startup theo quy ước `{application}-{profile}.yml`.\
\
**Refresh không cần restart:** đổi config trong Git → gọi `POST /actuator/refresh` trên service (bean gắn **`@RefreshScope`** được tạo lại với giá trị mới), hoặc **Spring Cloud Bus** (qua Kafka/RabbitMQ) broadcast refresh cho cả cụm.\
\
**2026:** trên Kubernetes, nhiều team thay bằng ConfigMap/Secret; Config Server vẫn mạnh khi cần config theo Git-flow, chạy ngoài K8s, hoặc secret backend qua Vault.

## Detailed Answer (EN)
$84
