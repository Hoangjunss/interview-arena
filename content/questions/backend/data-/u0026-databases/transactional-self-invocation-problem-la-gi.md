---
id: transactional-self-invocation-problem-la-gi
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Transactional self-invocation problem là gì?

## Question (EN)
What is the @Transactional self-invocation problem?

## Đáp án chi tiết (VI)
**Self-invocation:** method gọi method khác **trong cùng class** → `@Transactional` bị bỏ qua.\
\
Spring transaction chạy qua **AOP proxy** — proxy bọc bean, chặn call từ ngoài để begin/commit. Gọi `this.B()` đi thẳng vào object, **không qua proxy** → annotation trên B vô hiệu.\
\
```java\
@Service\
class OrderService {\
  public void processOrders(List\u003cLong\u003e ids) {\
    ids.forEach(id -\u003e processOne(id));   // BAD: self-invocation → không có transaction\
  }\
  @Transactional\
  public void processOne(Long id) { ... }\
}\
```\
\
**Fix:** tách `processOne` sang service khác rồi inject (cách đúng); hoặc self-inject proxy (`@Lazy @Autowired OrderService self;` rồi gọi `self.processOne(id)`).\
\
**Nguyên tắc:** `@Transactional` chỉ có hiệu lực với public method gọi từ **ngoài bean**. `@Async`, `@Cacheable` cũng dính lỗi self-invocation này.

## Detailed Answer (EN)
**Self-invocation:** a method calling another method **in the same class** → `@Transactional` is ignored.\
\
Spring transactions run through an **AOP proxy** — the proxy wraps the bean, intercepting external calls to begin/commit. Calling `this.B()` goes straight to the object, **bypassing the proxy** → the annotation on B has no effect.\
\
```java\
@Service\
class OrderService {\
  public void processOrders(List\u003cLong\u003e ids) {\
    ids.forEach(id -\u003e processOne(id));   // BAD: self-invocation → no transaction\
  }\
  @Transactional\
  public void processOne(Long id) { ... }\
}\
```\
\
**Fix:** move `processOne` to another service and inject it (the correct fix); or self-inject the proxy (`@Lazy @Autowired OrderService self;` then call `self.processOne(id)`).\
\
**Rule:** `@Transactional` only works on public methods called **from outside the bean**. `@Async` and `@Cacheable` suffer the same self-invocation issue.
