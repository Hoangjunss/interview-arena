---
id: khi-nao-constructor-va-destructor-duoc-goi-thu-tu-trong-ke-thua
position: backend
technology: oop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào constructor và destructor được gọi? Thứ tự trong kế thừa?

## Question (EN)
When are constructors and destructors called? What is the order in inheritance?

## Đáp án chi tiết (VI)
Constructor gọi theo thứ tự **từ trên xuống dưới** (base → derived); destructor gọi **ngược lại** (derived → base).\
\
```cpp\
class A {\
public:\
  A()  { std::cout \u003c\u003c \\"A ctor\\\
\\"; }\
  ~A() { std::cout \u003c\u003c \\"A dtor\\\
\\"; }\
};\
class B : public A {\
public:\
  B()  { std::cout \u003c\u003c \\"B ctor\\\
\\"; }\
  ~B() { std::cout \u003c\u003c \\"B dtor\\\
\\"; }\
};\
\
// Khi tạo B b: A ctor → B ctor\
// Khi ra scope:  B dtor → A dtor\
```\
\
**Điểm cần nhớ:**\
- Nếu base class có destructor virtual, khi `delete base_ptr` destructor của derived class vẫn được gọi đúng.\
- Nếu không virtual → undefined behavior khi xóa qua base pointer.\
- Constructor không thể `virtual` (vì object chưa tồn tại khi gọi vtable).

## Detailed Answer (EN)
Constructors are called **top-down** (base → derived); destructors are called in **reverse** (derived → base).\
\
```cpp\
class A {\
public:\
  A()  { std::cout \u003c\u003c \\"A ctor\\\
\\"; }\
  ~A() { std::cout \u003c\u003c \\"A dtor\\\
\\"; }\
};\
class B : public A {\
public:\
  B()  { std::cout \u003c\u003c \\"B ctor\\\
\\"; }\
  ~B() { std::cout \u003c\u003c \\"B dtor\\\
\\"; }\
};\
\
// Creating B b: A ctor → B ctor\
// Leaving scope: B dtor → A dtor\
```\
\
**Key points:**\
- If the base class destructor is virtual, `delete base_ptr` correctly invokes the derived destructor.\
- If not virtual → undefined behavior when deleting through a base pointer.\
- Constructors cannot be `virtual` (the object doesn't exist yet when vtable lookup would occur).
