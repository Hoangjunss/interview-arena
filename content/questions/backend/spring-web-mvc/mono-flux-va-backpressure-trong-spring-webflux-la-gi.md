---
id: mono-flux-va-backpressure-trong-spring-webflux-la-gi
position: backend
technology: spring-web-mvc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mono, Flux và backpressure trong Spring WebFlux là gì?

## Question (EN)
What are Mono, Flux, and backpressure in Spring WebFlux?

## Đáp án chi tiết (VI)
**`Mono\u003cT\u003e`** — publisher phát **0 hoặc 1** phần tử (như `Optional` async).\
**`Flux\u003cT\u003e`** — publisher phát **0..N** phần tử (như `Stream` async, có thể vô tận).\
Cả 2 **lazy** — chỉ chạy khi có subscriber.\
\
```java\
Mono\u003cUser\u003e findById(Long id) { return userRepo.findById(id); }\
\
Flux\u003cOrder\u003e recent() {\
  return orderRepo.findAllByDateAfter(yesterday())\
    .filter(o -\u003e o.getTotal().compareTo(BigDecimal.TEN) \u003e 0)\
    .map(this::enrich);\
}\
```\
\
**Backpressure:** consumer báo producer \\"chỉ nhận X item/giây\\" → tránh OOM khi producer nhanh hơn consumer:\
```java\
Flux.fromStream(bigDbStream)\
  .onBackpressureBuffer(1000)   // hoặc onBackpressureDrop()\
  .subscribe(this::process);\
```\
\
**Operator chính:** `map`, `flatMap`, `filter`, `zip`, `merge`, `retry`. **Lưu ý 2026:** có Virtual Threads (Java 21), MVC + blocking đã đủ concurrency — chỉ dùng WebFlux khi thật sự cần backpressure/streaming.

## Detailed Answer (EN)
**`Mono\u003cT\u003e`** — publisher emitting **0 or 1** item (like `Optional`, async).\
**`Flux\u003cT\u003e`** — publisher emitting **0..N** items (like `Stream`, async, potentially infinite).\
Both are **lazy** — they run only when subscribed.\
\
```java\
Mono\u003cUser\u003e findById(Long id) { return userRepo.findById(id); }\
\
Flux\u003cOrder\u003e recent() {\
  return orderRepo.findAllByDateAfter(yesterday())\
    .filter(o -\u003e o.getTotal().compareTo(BigDecimal.TEN) \u003e 0)\
    .map(this::enrich);\
}\
```\
\
**Backpressure:** the consumer signals the producer \\"I can take X items/second\\" → prevents OOM when the producer outpaces the consumer:\
```java\
Flux.fromStream(bigDbStream)\
  .onBackpressureBuffer(1000)   // or onBackpressureDrop()\
  .subscribe(this::process);\
```\
\
**Key operators:** `map`, `flatMap`, `filter`, `zip`, `merge`, `retry`. **2026 note:** with Virtual Threads (Java 21), MVC + blocking already scales — use WebFlux only when you truly need backpressure/streaming.
