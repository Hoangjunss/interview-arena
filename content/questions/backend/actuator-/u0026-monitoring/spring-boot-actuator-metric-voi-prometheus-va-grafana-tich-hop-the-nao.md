---
id: spring-boot-actuator-metric-voi-prometheus-va-grafana-tich-hop-the-nao
position: backend
technology: actuator-\u0026-monitoring
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Boot Actuator metric với Prometheus và Grafana tích hợp thế nào?

## Question (EN)
How do you integrate Spring Boot Actuator metrics with Prometheus and Grafana?

## Đáp án chi tiết (VI)
Actuator + **Micrometer** export metric sang Prometheus → Grafana visualize. Thêm `spring-boot-starter-actuator` + `micrometer-registry-prometheus`, rồi expose:\
```yaml\
management:\
  endpoints.web.exposure.include: health, info, prometheus\
  metrics.tags.application: ${spring.application.name}\
```\
\
**Custom metric:**\
```java\
@Component\
class OrderMetrics {\
  private final Counter orderCreated;\
  OrderMetrics(MeterRegistry registry) {\
    orderCreated = Counter.builder(\\"orders.created\\").register(registry);\
  }\
  void record() { orderCreated.increment(); }\
}\
```\
\
**Prometheus:** thêm job `metrics_path: /actuator/prometheus`, target `app:8080`. **Built-in metric:** JVM memory/GC, Tomcat threads, HikariCP pool, HTTP count/latency, cache hit. **Grafana:** import dashboard \\"Spring Boot Statistics\\" để có sẵn overview.

## Detailed Answer (EN)
Actuator + **Micrometer** export metrics to Prometheus → Grafana visualises them. Add `spring-boot-starter-actuator` + `micrometer-registry-prometheus`, then expose:\
```yaml\
management:\
  endpoints.web.exposure.include: health, info, prometheus\
  metrics.tags.application: ${spring.application.name}\
```\
\
**Custom metric:**\
```java\
@Component\
class OrderMetrics {\
  private final Counter orderCreated;\
  OrderMetrics(MeterRegistry registry) {\
    orderCreated = Counter.builder(\\"orders.created\\").register(registry);\
  }\
  void record() { orderCreated.increment(); }\
}\
```\
\
**Prometheus:** add a job with `metrics_path: /actuator/prometheus` targeting `app:8080`. **Built-in metrics:** JVM memory/GC, Tomcat threads, HikariCP pool, HTTP count/latency, cache hit rate. **Grafana:** import the \\"Spring Boot Statistics\\" dashboard for a ready overview.
