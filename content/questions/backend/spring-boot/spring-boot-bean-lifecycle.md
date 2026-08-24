---
id: spring-boot-bean-lifecycle
position: backend
technology: spring-boot
level: mid
tags: [ioc, lifecycle]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vòng đời của một Spring Bean diễn ra như thế nào?

## Question (EN)
What is the lifecycle of a Spring Bean?

## Đáp án chi tiết (VI)
Instantiation → Populate Properties → `BeanNameAware`/`BeanFactoryAware` → `@PostConstruct` → bean sẵn sàng sử dụng → `@PreDestroy` khi container đóng.

## Detailed Answer (EN)
Instantiation → Populate Properties → `BeanNameAware`/`BeanFactoryAware` → `@PostConstruct` → bean ready for use → `@PreDestroy` on container shutdown.
