---
id: spring-kafka-integration-cach-produce-va-consume-message
position: backend
technology: cloud-\u0026-microservices
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Kafka integration: cách produce và consume message?

## Question (EN)
Spring Kafka integration: how do you produce and consume messages?

## Đáp án chi tiết (VI)
**Spring Kafka** — `KafkaTemplate` để produce, `@KafkaListener` để consume. Thêm dependency `spring-kafka`, config qua `spring.kafka.*` (bootstrap-servers, consumer group-id, JSON serializer/deserializer).\
\
```java\
// Producer\
@Service\
class OrderEventPublisher {\
  private final KafkaTemplate\u003cString, OrderEvent\u003e kafkaTemplate;\
\
  public void publish(Order order) {\
    kafkaTemplate.send(\\"order-events\\

## Detailed Answer (EN)
**Spring Kafka** — `KafkaTemplate` for producing, `@KafkaListener` for consuming. Add the `spring-kafka` dependency, configure via `spring.kafka.*` (bootstrap-servers, consumer group-id, JSON serializer/deserializer).\
\
```java\
// Producer\
@Service\
class OrderEventPublisher {\
  private final KafkaTemplate\u003cString, OrderEvent\u003e kafkaTemplate;\
\
  public void publish(Order order) {\
    kafkaTemplate.send(\\"order-events\\
