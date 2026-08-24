---
id: abstract-class-trong-php-la-gi-va-khi-nao-nen-dung
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Abstract class trong PHP là gì và khi nào nên dùng?

## Question (EN)
What are abstract classes and when do you use them?

## Đáp án chi tiết (VI)
Abstract class là class không đầy đủ, không thể khởi tạo trực tiếp—chỉ có thể kế thừa. Dùng `abstract class Animal { abstract public function sound(); }`. Subclass bắt buộc phải triển khai abstract method: `class Dog extends Animal { public function sound() { return \\"Woof\\"; } }`. Abstract class có thể có method cụ thể và thuộc tính, khác với interface. Dùng khi muốn áp đặt cấu trúc nhưng có sẵn một số implementation mặc định: interface chỉ cho contracts thuần túy, abstract class cho chức năng cơ sở được chia sẻ.

## Detailed Answer (EN)
Abstract classes are incomplete classes that cannot be instantiated directly—only extended. Use `abstract class Animal { abstract public function sound(); }`. Subclasses must implement abstract methods: `class Dog extends Animal { public function sound() { return \\"Woof\\"; } }`. Abstract classes can have concrete methods and properties, unlike interfaces. Use when you want to enforce structure with some default implementation: interfaces for contracts only, abstract classes for shared base functionality.
