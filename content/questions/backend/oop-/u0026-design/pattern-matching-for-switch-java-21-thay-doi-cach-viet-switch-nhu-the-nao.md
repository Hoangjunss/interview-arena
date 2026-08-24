---
id: pattern-matching-for-switch-java-21-thay-doi-cach-viet-switch-nhu-the-nao
position: backend
technology: oop-\u0026-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pattern matching for switch (Java 21) thay đổi cách viết switch như thế nào?

## Question (EN)
How does pattern matching for switch (Java 21) change the way you write switch?

## Đáp án chi tiết (VI)
Pattern matching for switch (Java 21 — JEP 441) cho `switch` test theo **kiểu**, vừa bind biến đã ép kiểu, vừa cho thêm `when` lọc — gom được chuỗi `if-instanceof` dài.\
\
```java\
double area(Shape s) {\
  return switch (s) {\
    case Circle c          -\u003e Math.PI * c.r() * c.r();\
    case Square sq         -\u003e sq.side() * sq.side();\
    case Triangle t when t.base() \u003e 0\
                           -\u003e 0.5 * t.base() * t.height();\
    case Triangle t        -\u003e 0;\
  };\
}\
```\
\
Kết hợp với `sealed`: compiler bắt buộc xử lý mọi subtype, bỏ sót là compile error (không phải bug runtime). Đi kèm record pattern (JEP 440) bóc field thẳng trong pattern: `case Circle(double r) -\u003e ...`. Ứng viên migrate đầu: code cũ dùng `instanceof` + cast dày đặc.

## Detailed Answer (EN)
Pattern matching for switch (Java 21 — JEP 441) lets `switch` test by **type**, bind a properly-cast variable, and add a `when` guard — collapsing long `if-instanceof` chains.\
\
```java\
double area(Shape s) {\
  return switch (s) {\
    case Circle c          -\u003e Math.PI * c.r() * c.r();\
    case Square sq         -\u003e sq.side() * sq.side();\
    case Triangle t when t.base() \u003e 0\
                           -\u003e 0.5 * t.base() * t.height();\
    case Triangle t        -\u003e 0;\
  };\
}\
```\
\
Combined with `sealed`: the compiler forces you to handle every subtype, missing one is a compile error (not a runtime bug). Pairs with record patterns (JEP 440) to destructure fields in the pattern: `case Circle(double r) -\u003e ...`. First migration candidate: legacy code peppered with `instanceof` + cast.
