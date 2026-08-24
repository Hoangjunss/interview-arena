---
id: factory-method-pattern-la-gi-khac-gi-simple-factory
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Factory Method pattern là gì? Khác gì Simple Factory?

## Question (EN)
What is the Factory Method pattern? How does it differ from Simple Factory?

## Đáp án chi tiết (VI)
Factory Method định nghĩa interface để tạo object nhưng để subclass quyết định class nào sẽ được instantiate — class cha không hard-code class con cụ thể. Ví dụ TypeScript:\
```typescript\
abstract class Notification {\
  abstract createSender(): Sender\
  send(msg: string) {\
    this.createSender().send(msg)\
  }\
}\
class EmailNotification extends Notification {\
  createSender() { return new EmailSender() }\
}\
```\
Khác với Simple Factory (không phải GoF pattern): Simple Factory chỉ là một method/class có logic `if/else` tạo object — dễ hiểu nhưng vi phạm OCP vì phải sửa khi thêm type mới. Factory Method tuân thủ OCP vì thêm type mới chỉ cần tạo subclass mới. Dùng Factory Method khi: framework cần cho phép extension mà không biết trước loại object sẽ tạo; khi muốn user override cách tạo object. Không dùng khi: hierarchy đơn giản, Simple Factory đủ dùng.

## Detailed Answer (EN)
Factory Method defines an interface for creating an object but lets subclasses decide which class to instantiate — the parent class doesn't hard-code a specific concrete class. TypeScript example:\
```typescript\
abstract class Notification {\
  abstract createSender(): Sender\
  send(msg: string) {\
    this.createSender().send(msg)\
  }\
}\
class EmailNotification extends Notification {\
  createSender() { return new EmailSender() }\
}\
```\
Difference from Simple Factory (not a GoF pattern): Simple Factory is just a method or class with `if/else` logic that creates objects — easy to understand but violates OCP because you must modify it to add new types. Factory Method follows OCP because adding a new type only requires creating a new subclass. Use Factory Method when a framework needs to allow extension without knowing the exact object type in advance, or when you want callers to override how objects are created. Skip it when the hierarchy is simple and Simple Factory is sufficient.
