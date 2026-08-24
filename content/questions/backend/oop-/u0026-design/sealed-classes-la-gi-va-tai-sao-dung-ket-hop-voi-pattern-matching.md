---
id: sealed-classes-la-gi-va-tai-sao-dung-ket-hop-voi-pattern-matching
position: backend
technology: oop-\u0026-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sealed Classes là gì và tại sao dùng kết hợp với Pattern Matching?

## Question (EN)
What are Sealed Classes and why use them with Pattern Matching?

## Đáp án chi tiết (VI)
Sealed Class (Java 17+) hạn chế những class nào được phép extend nó — khai báo qua `permits`. \
\
**Ví dụ:** `public sealed class Shape permits Circle, Rectangle, Triangle {}`. Mỗi subclass phải là `final`, `sealed`, hoặc `non-sealed`. Lợi ích kết hợp Pattern Matching: compiler biết tất cả subtypes nên có thể kiểm tra exhaustiveness — switch expression không cần `default` nếu đã xử lý hết. \
\
**Ví dụ:** `switch (shape) { case Circle c -\u003e ...; case Rectangle r -\u003e ...; case Triangle t -\u003e ...; }` — compiler báo lỗi nếu bỏ sót một case. Tốt hơn abstract class ở điểm: đóng gói hierarchy chặt hơn, phòng tránh subtype ngoài ý muốn. Ứng dụng: domain model, error type, state machine.

## Detailed Answer (EN)
Sealed Classes (Java 17+) restrict which classes can extend them — declared via `permits`. \
\
**Example:** `public sealed class Shape permits Circle, Rectangle, Triangle {}`. Each subclass must be `final`, `sealed`, or `non-sealed`. Benefit with Pattern Matching: compiler knows all subtypes and can verify exhaustiveness — switch expressions need no `default` when all cases are handled. \
\
**Example:** `switch (shape) { case Circle c -\u003e ...; case Rectangle r -\u003e ...; case Triangle t -\u003e ...; }` — compiler errors on missing cases. Better than abstract classes: tighter hierarchy encapsulation, prevents unintended subtypes. Use cases: domain models, error types, state machines.
