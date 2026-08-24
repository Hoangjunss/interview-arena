---
id: bon-tru-cot-cua-lap-trinh-huong-doi-tuong-oop-la-gi
position: backend
technology: oop-nền-tảng
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bốn trụ cột của lập trình hướng đối tượng (OOP) là gì?

## Question (EN)
What are the four pillars of object-oriented programming (OOP)?

## Đáp án chi tiết (VI)
- **Encapsulation (đóng gói)**: gói dữ liệu và hành vi thao tác trên dữ liệu vào một object, ẩn trạng thái nội bộ; bên ngoài chỉ truy cập qua interface công khai. Bảo vệ bất biến (invariant), giảm coupling.\
- **Abstraction (trừu tượng)**: lộ ra \\"làm gì\\

## Detailed Answer (EN)
- **Encapsulation**: bundle data and the behavior operating on it into one object and hide internal state; the outside touches it only through a public interface. This protects invariants and reduces coupling.\
- **Abstraction**: expose \\"what\\" an object does and hide \\"how\\". Think of a car dashboard: you use the wheel without knowing the mechanism underneath.\
- **Inheritance**: a subclass reuses and extends a superclass, establishing an \\"is-a\\" relationship. It avoids duplication but can create rigid hierarchies — favor composition when the relationship is not truly \\"is-a\\".\
- **Polymorphism**: the same method call yields different behavior depending on the object's actual type (override / interface). It lets code depend on abstractions and add new types without touching the call sites.\
\
These four pillars are language-independent — they look different in Java, C#, Python, or TypeScript, but the concepts are the same.
