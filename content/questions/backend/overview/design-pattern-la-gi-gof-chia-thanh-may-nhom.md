---
id: design-pattern-la-gi-gof-chia-thanh-may-nhom
position: backend
technology: overview
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Design pattern là gì? GoF chia thành mấy nhóm?

## Question (EN)
What are design patterns and what are the GoF categories?

## Đáp án chi tiết (VI)
Design pattern là **giải pháp tái sử dụng** cho các vấn đề thiết kế phần mềm **hay lặp lại** — không phải code copy-paste, mà là **khuôn mẫu** để tổ chức lớp/đối tượng. Lợi ích: có **từ vựng chung** (nói \\"Observer\\" là hiểu ngay), tránh phát minh lại, thiết kế dễ mở rộng.\
\
\\"Gang of Four\\" (GoF) phân 23 pattern kinh điển thành **3 nhóm**:\
- **Creational** (tạo đối tượng): Singleton, Factory Method, Abstract Factory, Builder, Prototype.\
- **Structural** (ghép lớp/đối tượng): Adapter, Decorator, Facade, Proxy, Composite, Bridge, Flyweight.\
- **Behavioral** (phân chia trách nhiệm \u0026 giao tiếp): Observer, Strategy, Command, State, Iterator, Template Method, Chain of Responsibility, Mediator, Visitor...\
\
Lưu ý: pattern là công cụ, **đừng lạm dụng** — áp khi vấn đề thực sự khớp, tránh over-engineering.

## Detailed Answer (EN)
A design pattern is a **reusable solution** to a **recurring** software design problem — not copy-paste code, but a **template** for organizing classes/objects. Benefits: a **shared vocabulary** (saying \\"Observer\\" conveys intent instantly), avoiding reinvention, and more extensible designs.\
\
The \\"Gang of Four\\" (GoF) group the 23 classic patterns into **3 categories**:\
- **Creational** (object creation): Singleton, Factory Method, Abstract Factory, Builder, Prototype.\
- **Structural** (composing classes/objects): Adapter, Decorator, Facade, Proxy, Composite, Bridge, Flyweight.\
- **Behavioral** (responsibility \u0026 communication): Observer, Strategy, Command, State, Iterator, Template Method, Chain of Responsibility, Mediator, Visitor...\
\
Note: patterns are tools — **do not overuse them**; apply them when the problem truly fits, avoiding over-engineering.
