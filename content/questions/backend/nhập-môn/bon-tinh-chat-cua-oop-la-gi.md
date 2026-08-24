---
id: bon-tinh-chat-cua-oop-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bốn tính chất của OOP là gì?

## Question (EN)
What are the four characteristics (pillars) of OOP?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
**Encapsulation — Inheritance — Polymorphism — Abstraction.**\
\
- **Encapsulation:** bundle data + the methods operating on it; hide internals via `private`, expose only business methods. Picture a labelled medicine bottle — you do not need the formula to take the right dose.\
- **Inheritance:** a child class `extends` a parent, inheriting fields + methods. `Dog extends Animal` → already has `name`, `eat()`. **Caveat:** tight coupling — favour composition when possible.\
- **Polymorphism:** one interface, many behaviours. Compile-time = overloading; runtime = overriding (`Animal a = new Dog(); a.speak()` calls the Dog version).\
- **Abstraction:** expose **what** it does, hide **how**. Implemented via abstract classes or interfaces. Picture a driver who steers and pedals without knowing the gearbox.\
\
The four connect: Abstraction sets contracts "])</script><script>self.__next_f.push([1,"→ Encapsulation hides details → Inheritance reuses → Polymorphism swaps implementations. The goal: reduce coupling, increase testability/changeability.
