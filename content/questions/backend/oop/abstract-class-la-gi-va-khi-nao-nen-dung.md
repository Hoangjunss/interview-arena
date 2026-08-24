---
id: abstract-class-la-gi-va-khi-nao-nen-dung
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Abstract class là gì và khi nào nên dùng?

## Question (EN)
What is an abstract class and when should you use it?

## Đáp án chi tiết (VI)
Abstract class định nghĩa blueprint chưa hoàn chỉnh với abstract methods (chỉ có chữ ký) và concrete methods (có implementation). Không thể khởi tạo trực tiếp mà phải kế thừa và implement các abstract member. Dùng abstract class làm base class khi muốn chia sẻ logic chung và bắt buộc subclass implement những phần cụ thể. Khác interface, abstract class có constructor và trạng thái.

## Detailed Answer (EN)
Abstract classes define incomplete blueprints with abstract methods (signature only) and concrete methods (with implementation). You cannot instantiate them directly — you must derive and implement abstract members. Use abstract classes as base classes that share common behavior while forcing subclasses to implement specific methods. Unlike interfaces, they support constructors and state.
