---
id: service-discovery-va-load-balancing-trong-microservices-voi-spring-cloud
position: backend
technology: cloud-\u0026-microservices
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service discovery và load balancing trong microservices với Spring Cloud?

## Question (EN)
Service discovery and load balancing in microservices with Spring Cloud?

## Đáp án chi tiết (VI)
**Service discovery** cho service tìm nhau theo **tên logic** thay vì IP:port cứng (instance scale lên xuống, IP đổi liên tục).\
\
**Lựa chọn 2026:**\
\
1. **Kubernetes Service** (phổ biến nhất) — K8s tự discovery qua DNS: gọi `http://order-service/api/orders` là xong, kube-proxy tự phân tải qua các pod. **Không cần Eureka hay Spring Cloud Discovery.**\
\
2. **Spring Cloud + Eureka** (truyền thống — on-premise, không K8s) — dựng Eureka Server (`@EnableEurekaServer`); client gắn `@EnableDiscoveryClient` + `eureka.client.serviceUrl` để tự register và discover.\
\
**Load balancing (Spring Cloud LoadBalancer):** đánh dấu `@LoadBalanced` trên bean `RestClient.Builder`/`RestTemplate` → khi gọi `http://order-service/...`, Spring resolve tên service → danh sách IP:port từ registry và phân tải **client-side** (round-robin mặc định).\
\
**Thực tế:** deploy Kubernetes → dùng built-in của K8s; Eureka/Consul chỉ khi không có K8s.

## Detailed Answer (EN)
**Service discovery** lets services find each other by **logical name** instead of hardcoded IP:port (instances scale up/down, IPs change constantly).\
\
**2026 options:**\
\
1. **Kubernetes Service** (most common) — K8s handles discovery via DNS: just call `http://order-service/api/orders`, kube-proxy load-balances across pods. **No Eureka or Spring Cloud Discovery needed.**\
\
2. **Spring Cloud + Eureka** (traditional — on-premise, no K8s) — run a Eureka Server (`@EnableEurekaServer`); clients add `@EnableDiscoveryClient` + `eureka.client.serviceUrl` to auto-register and discover.\
\
**Load balancing (Spring Cloud LoadBalancer):** annotate the `RestClient.Builder`/`RestTemplate` bean with `@LoadBalanced` → calls to `http://order-service/...` resolve the service name → IP:port list from the registry, balanced **client-side** (round-robin by default).\
\
**In practice:** on Kubernetes → use the built-ins; Eureka/Consul only without K8s.
