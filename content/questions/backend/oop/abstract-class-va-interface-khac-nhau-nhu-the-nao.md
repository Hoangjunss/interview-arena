---
id: abstract-class-va-interface-khac-nhau-nhu-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Abstract class và interface khác nhau như thế nào?

## Question (EN)
What is the difference between an abstract class and an interface?

## Đáp án chi tiết (VI)
Abstract class có constructor, fields, và có thể mix abstract/concrete methods. Interface (trước C# 8) là pure contract chỉ chứa abstract members. Một class chỉ kế thừa được một abstract class nhưng có thể implement nhiều interface. Dùng abstract class khi cần chia sẻ behavior chung; dùng interface khi định nghĩa contract cho nhiều type không liên quan nhau. Từ C# 8+, interface có thể có default method implementation, nhưng abstract class vẫn giữ lợi thế với constructor và fields.

## Detailed Answer (EN)
Abstract classes have constructors, state fields, and mix abstract/concrete methods. Interfaces (before C# 8) are pure contracts with only abstract members. A class can inherit only one abstract class but implement multiple interfaces. Use abstract classes for shared behavior; use interfaces for contracts across unrelated types. Since C# 8+, interfaces can have default method implementations, but abstract classes still have the advantage of constructors and fields.
