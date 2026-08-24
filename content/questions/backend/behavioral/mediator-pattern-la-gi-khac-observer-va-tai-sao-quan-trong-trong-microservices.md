---
id: mediator-pattern-la-gi-khac-observer-va-tai-sao-quan-trong-trong-microservices
position: backend
technology: behavioral
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mediator pattern là gì? Khác Observer và tại sao quan trọng trong microservices?

## Question (EN)
What is the Mediator pattern? How does it differ from Observer, and why does it matter in microservices?

## Đáp án chi tiết (VI)
Mediator giảm chaotic dependencies giữa objects bằng cách làm chúng communicate qua mediator object thay vì trực tiếp — từ many-to-many thành many-to-one. Ví dụ UI: thay vì các form components tham chiếu nhau trực tiếp, chúng communicate qua `FormMediator` quản lý validation và enable/disable logic.\
\
Trong microservices: Message Broker (RabbitMQ, Kafka) là Mediator — service A không gọi service B trực tiếp mà publish message lên broker, broker route đến service B.\
\
Khác Observer: Observer cho phép Subject notify Observers (biết có observers); Mediator giúp objects communicate mà không biết về nhau. Trong NestJS: `EventEmitter2`, CQRS `CommandBus`, `EventBus` là Mediator.\
\
Lợi ích microservices:\
- Loose coupling giữa services.\
- Dễ scale từng service độc lập.\
- Có thể add consumer mới mà không thay đổi producer.\
\
Không dùng khi: Mediator trở thành 'God Object' biết quá nhiều — tạo single point of failure.

## Detailed Answer (EN)
Mediator reduces chaotic dependencies between objects by having them communicate through a mediator object instead of directly — turning many-to-many into many-to-one. UI example: instead of form components holding direct references to each other, they communicate through a `FormMediator` that manages validation and enable/disable logic.\
\
In microservices: a Message Broker (RabbitMQ, Kafka) is a Mediator — service A doesn't call service B directly but publishes a message to the broker, which routes it to service B.\
\
Difference from Observer: Observer lets a Subject notify known Observers; Mediator lets objects communicate without knowing about each other. In NestJS: `EventEmitter2`, the CQRS `CommandBus`, and `EventBus` are Mediators.\
\
Microservices benefits:\
- Loose coupling between services.\
- Each service scales independently.\
- New consumers can be added without changing the producer.\
\
Avoid it when the Mediator becomes a 'God Object' that knows too much — creating a single point of failure.
