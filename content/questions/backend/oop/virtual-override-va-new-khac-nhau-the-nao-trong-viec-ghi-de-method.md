---
id: virtual-override-va-new-khac-nhau-the-nao-trong-viec-ghi-de-method
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`virtual`, `override` và `new` khác nhau thế nào trong việc ghi đè method?

## Question (EN)
How do `virtual`, `override`, and `new` differ for method overriding?

## Đáp án chi tiết (VI)
Ba từ khóa quyết định method nào chạy khi gọi qua tham chiếu lớp cha:\
\
- **`virtual`**: đánh dấu method của lớp cha **cho phép ghi đè**.\
- **`override`**: lớp con **thay thế thật sự** method virtual → gọi qua tham chiếu cha vẫn chạy bản con (**runtime dispatch** = đa hình).\
- **`new`**: lớp con **che (hide)** method của cha, không phải ghi đè. Method nào chạy phụ thuộc **kiểu tham chiếu lúc biên dịch**, không có đa hình.\
\
```csharp\
class Animal { public virtual string Speak() =\u003e \\"...\\"; }\
class Dog : Animal { public override string Speak() =\u003e \\"Gâu\\"; }\
class Cat : Animal { public new string Speak() =\u003e \\"Meo\\"; }\
\
Animal d = new Dog();\
Animal c = new Cat();\
d.Speak();   // \\"Gâu\\"  → override: chạy bản con\
c.Speak();   // \\"...\\"  → new: che, tham chiếu Animal chạy bản cha\
```\
\
**Chốt:** muốn đa hình thật (gọi qua kiểu cha vẫn ra hành vi con) thì cặp `virtual`/`override`. `new` chỉ để giấu method trùng tên và thường là dấu hiệu thiết kế cần xem lại.

## Detailed Answer (EN)
$82
