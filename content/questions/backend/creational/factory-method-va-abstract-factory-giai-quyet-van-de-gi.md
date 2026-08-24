---
id: factory-method-va-abstract-factory-giai-quyet-van-de-gi
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Factory Method (và Abstract Factory) giải quyết vấn đề gì?

## Question (EN)
What problem do Factory Method (and Abstract Factory) solve?

## Đáp án chi tiết (VI)
Vấn đề: khi code **tạo đối tượng bằng `new ConcreteClass()` rải rác**, nó bị **gắn chặt vào lớp cụ thể** → muốn đổi/ thêm loại phải sửa nhiều nơi.\
\
- **Factory Method**: định nghĩa một **phương thức tạo đối tượng**, để lớp con quyết định tạo loại cụ thể nào. Code gọi làm việc với **interface/abstract type**, không biết lớp cụ thể → dễ mở rộng (thêm loại mới chỉ cần thêm factory con), tuân **Open/Closed** và **Dependency Inversion**.\
- **Abstract Factory**: tạo **cả một họ đối tượng liên quan** (ví dụ `Button` + `Checkbox` theo cùng một theme) mà không ràng vào lớp cụ thể, đảm bảo các sản phẩm đi cùng nhau nhất quán.\
\
Lợi ích chung: **tách việc tạo đối tượng khỏi việc dùng nó**, tập trung logic khởi tạo về một chỗ, giảm coupling. Đánh đổi: thêm số lượng lớp/độ gián tiếp.

## Detailed Answer (EN)
Problem: when code **creates objects with `new ConcreteClass()` everywhere**, it becomes **tightly bound to concrete classes** → changing/adding a type means editing many places.\
\
- **Factory Method**: defines a **method for creating objects**, letting subclasses decide which concrete type to make. Calling code works with an **interface/abstract type**, unaware of the concrete class → easy to extend (a new type just adds a subclass factory), honoring **Open/Closed** and **Dependency Inversion**.\
- **Abstract Factory**: creates **a whole family of related objects** (e.g. a `Button` + `Checkbox` for one theme) without binding to concrete classes, keeping the products consistent together.\
\
Shared benefit: **separate object creation from its use**, centralize construction logic, reduce coupling. Trade-off: more classes/indirection.
