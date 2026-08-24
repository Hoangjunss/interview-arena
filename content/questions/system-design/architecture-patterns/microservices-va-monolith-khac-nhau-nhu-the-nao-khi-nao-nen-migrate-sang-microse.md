---
id: microservices-va-monolith-khac-nhau-nhu-the-nao-khi-nao-nen-migrate-sang-microse
position: system-design
technology: architecture-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Microservices và Monolith khác nhau như thế nào? Khi nào nên migrate sang Microservices?

## Question (EN)
How do Microservices and Monolith differ? When should you migrate to Microservices?

## Đáp án chi tiết (VI)
Monolith là toàn bộ application được deploy như một unit duy nhất – đơn giản để develop, test, deploy ban đầu, không có network overhead giữa components. Microservices chia application thành nhiều services nhỏ, độc lập, mỗi service có database riêng và được deploy độc lập – cho phép scale từng service riêng, team độc lập, polyglot tech stack.\
\
Microservices không phải lúc nào cũng tốt hơn: overhead của distributed systems (network latency, distributed transactions, service discovery, observability) rất lớn. Nên bắt đầu với Monolith hoặc Modular Monolith (monolith với boundaries rõ ràng).\
\
Chỉ migrate sang microservices khi: team lớn (\u003e50 engineers) và bottleneck khi deploy, các module có nhu cầu scale khác nhau rõ rệt, cần polyglot technology. Martin Fowler khuyên: 'Don't start with microservices' – xây dựng monolith tốt trước, sau đó tách dần theo domain boundaries (DDD Bounded Contexts).

## Detailed Answer (EN)
A Monolith deploys the entire application as a single unit — simpler to develop, test, and deploy initially, with no network overhead between components. Microservices decompose into many small independent services, each with its own database and deployed independently — enabling independent scaling, team autonomy, and polyglot tech stacks.\
\
Microservices are not always better: the overhead of distributed systems (network latency, distributed transactions, service discovery, observability) is substantial. Start with a Monolith or Modular Monolith (clear internal boundaries).\
\
Only migrate when: the team is large (\u003e50 engineers) and deployment is a bottleneck, modules have clearly different scaling needs, or polyglot technology is required. Martin Fowler advises: 'Don't start with microservices' — build a well-structured monolith first, then extract services along DDD Bounded Contexts.
