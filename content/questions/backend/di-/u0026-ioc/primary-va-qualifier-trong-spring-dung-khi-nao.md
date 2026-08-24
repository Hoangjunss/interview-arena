---
id: primary-va-qualifier-trong-spring-dung-khi-nao
position: backend
technology: di-\u0026-ioc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Primary và @Qualifier trong Spring dùng khi nào?

## Question (EN)
When do you use @Primary and @Qualifier in Spring?

## Đáp án chi tiết (VI)
Khi có **nhiều bean cùng type**, Spring không biết inject cái nào → ambiguity error lúc startup. Hai cách phân biệt:\
\
- **`@Primary`** — đặt trên **1 bean** làm default khi có nhiều candidate (vd impl production).\
- **`@Qualifier(\\"beanName\\")`** — đặt **tại điểm inject** (constructor param), chỉ định đích danh bean theo tên; **ghi đè** `@Primary`.\
\
**Chọn:** 1 bean là \\"default hợp lý\\" cho đa số nơi dùng → `@Primary`; điểm inject cụ thể cần bean khác → `@Qualifier`. Kết hợp `@Profile` khi muốn switch impl theo môi trường thay vì theo điểm inject.

## Detailed Answer (EN)
With **multiple beans of the same type**, Spring cannot decide which to inject → ambiguity error at startup. Two ways to disambiguate:\
\
- **`@Primary`** — placed on **one bean** as the default among candidates (e.g. the production impl).\
- **`@Qualifier(\\"beanName\\")`** — placed **at the injection point** (constructor param), naming the exact bean; **overrides** `@Primary`.\
\
**Choosing:** one bean is the \\"sensible default\\" for most call sites → `@Primary`; a specific injection point needs a different bean → `@Qualifier`. Combine with `@Profile` when the impl should switch per environment rather than per injection point.
