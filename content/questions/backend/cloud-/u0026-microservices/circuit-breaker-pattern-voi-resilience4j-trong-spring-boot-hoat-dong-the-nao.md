---
id: circuit-breaker-pattern-voi-resilience4j-trong-spring-boot-hoat-dong-the-nao
position: backend
technology: cloud-\u0026-microservices
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Circuit Breaker pattern với Resilience4j trong Spring Boot hoạt động thế nào?

## Question (EN)
How does the Circuit Breaker pattern with Resilience4j work in Spring Boot?

## Đáp án chi tiết (VI)
**Circuit Breaker** bảo vệ service khỏi cascade failure khi downstream chậm/lỗi. **3 trạng thái:** CLOSED (bình thường, pass through) → OPEN (lỗi nhiều, fail-fast) → HALF_OPEN (thử vài request kiểm tra recovery). Dùng `resilience4j-spring-boot3`.\
\
```yaml\
resilience4j.circuitbreaker.instances.payment-service:\
  slidingWindowSize: 10\
  failureRateThreshold: 50       # \u003e50% fail → OPEN\
  waitDurationInOpenState: 30s\
  permittedCallsInHalfOpenState: 3\
```\
\
```java\
@CircuitBreaker(name = \\"payment-service\\

## Detailed Answer (EN)
$82
