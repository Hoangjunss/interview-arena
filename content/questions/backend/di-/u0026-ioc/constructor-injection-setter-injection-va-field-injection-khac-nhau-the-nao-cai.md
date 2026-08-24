---
id: constructor-injection-setter-injection-va-field-injection-khac-nhau-the-nao-cai
position: backend
technology: di-\u0026-ioc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Constructor injection, setter injection và field injection khác nhau thế nào? Cái nào nên dùng?

## Question (EN)
How do constructor, setter, and field injection differ? Which should you use?

## Đáp án chi tiết (VI)
| | **Constructor** | **Setter** | **Field** |\
|---|---|---|---|\
| Immutability | Có — `final` | Không | Không — |\
| Mandatory dep | Có — Rõ ràng | Không — Optional mặc định | Không |\
| Testability | Có — Tốt nhất | Có — Tốt | Hạn chế — Cần reflection |\
| Circular dep | Phát hiện sớm | Có thể bị ẩn | Có thể bị ẩn |\
\
```java\
@Service\
class OrderService {\
  private final OrderRepository repo;                         // final → immutable\
  OrderService(OrderRepository repo) { this.repo = repo; }    // Spring 4.3+: 1 constructor khỏi @Autowired\
}\
\
// Setter — optional dependency:  @Autowired(required = false) void setMetrics(MetricService m) {...}\
// Field  — KHÔNG khuyến nghị:     @Autowired OrderRepository repo;  // khó test\
```\
\
**Vì sao constructor injection tốt nhất:** `final` → immutable/thread-safe; bắt buộc dependency → null-safe; test không cần Spring (`new OrderService(mock)`); circular dependency lộ ngay lúc startup.

## Detailed Answer (EN)
| | **Constructor** | **Setter** | **Field** |\
|---|---|---|---|\
| Immutability | Yes — `final` | No | No — |\
| Mandatory dep | Yes — Explicit | No — Optional by default | No |\
| Testability | Yes — Best | Yes — Good | Limited — Requires reflection |\
| Circular dep | Detected early | Can be hidden | Can be hidden |\
\
```java\
@Service\
class OrderService {\
  private final OrderRepository repo;                         // final → immutable\
  OrderService(OrderRepository repo) { this.repo = repo; }    // Spring 4.3+: single constructor, no @Autowired\
}\
\
// Setter — optional dependency:  @Autowired(required = false) void setMetrics(MetricService m) {...}\
// Field  — NOT recommended:       @Autowired OrderRepository repo;  // hard to test\
```\
\
**Why constructor injection is best:** `final` → immutable/thread-safe; mandatory dependency → null-safe; test without Spring (`new OrderService(mock)`); circular dependencies surface immediately at startup.
