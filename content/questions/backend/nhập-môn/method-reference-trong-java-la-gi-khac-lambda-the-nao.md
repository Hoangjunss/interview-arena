---
id: method-reference-trong-java-la-gi-khac-lambda-the-nao
position: backend
technology: nhập-môn
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Method reference trong Java là gì? Khác lambda thế nào?

## Question (EN)
What is a method reference in Java? How does it differ from a lambda?

## Đáp án chi tiết (VI)
**Method reference** (`::`) là cú pháp rút gọn lambda khi lambda **chỉ gọi 1 method** và truyền argument y nguyên.\
\
| Loại | Cú pháp | Tương đương | Ví dụ |\
|---|---|---|---|\
| Static | `Class::staticMethod` | `x -\u003e Class.staticMethod(x)` | `Integer::parseInt` |\
| Bound instance | `obj::method` | `x -\u003e obj.method(x)` | `System.out::println` |\
| Unbound instance | `Class::method` | `(obj, x) -\u003e obj.method(x)` | `String::toUpperCase` |\
| Constructor | `Class::new` | `x -\u003e new Class(x)` | `ArrayList::new` |\
\
```java\
list.stream().map(Integer::parseInt).toList();   // static\
names.forEach(System.out::println);              // bound instance\
names.stream().map(String::toUpperCase).toList(); // unbound instance\
Supplier\u003cList\u003cString\u003e\u003e factory = ArrayList::new; // constructor\
```\
\
**Nên dùng** khi lambda chỉ wrap 1 method, không có logic thêm. **Giữ lambda** khi có xử lý thêm (`s -\u003e s.trim().toLowerCase()`).\
\
Method reference không nhanh hơn lambda — chỉ là **đường cú pháp**. Tiêu chí duy nhất: **readability**.

## Detailed Answer (EN)
$82
