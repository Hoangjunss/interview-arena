---
id: method-overloading-va-method-overriding-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Method overloading và method overriding khác nhau thế nào?

## Question (EN)
What is the difference between method overloading and method overriding?

## Đáp án chi tiết (VI)
Hai khái niệm dễ nhầm — cùng chữ \\"over\\" nhưng giải quyết bài toán khác hẳn.\
\
| | **Overloading** | **Overriding** |\
|---|---|---|\
| Scope | Cùng class | Subclass override method của parent |\
| Signature | **Khác tham số** | **Trùng signature** với parent |\
| Resolution | Compile-time | **Runtime** (dynamic dispatch) |\
| Polymorphism | Static | Dynamic (subtype) |\
\
```java\
class Calculator {\
  int add(int a, int b) { return a + b; }            // overload\
  double add(double a, double b) { return a + b; }   // overload\
}\
\
class Animal { void speak() { System.out.println(\\"...\\"); } }\
class Dog extends Animal {\
  @Override void speak() { System.out.println(\\"Woof\\"); }  // override\
}\
\
Animal a = new Dog();\
a.speak();  // \\"Woof\\" — dispatch theo kiểu THỰC của object\
```\
\
**Quy tắc override:** access không được hẹp hơn parent, không throw checked exception rộng hơn, luôn dùng `@Override`.

## Detailed Answer (EN)
Easy to confuse — both start with \\"over\\" but they solve different problems.\
\
| | **Overloading** | **Overriding** |\
|---|---|---|\
| Scope | Same class | Subclass redefines parent's method |\
| Signature | **Different parameters** | **Same signature** as parent |\
| Resolution | Compile-time | **Runtime** (dynamic dispatch) |\
| Polymorphism | Static | Dynamic (subtype) |\
\
```java\
class Calculator {\
  int add(int a, int b) { return a + b; }            // overload\
  double add(double a, double b) { return a + b; }   // overload\
}\
\
class Animal { void speak() { System.out.println(\\"...\\"); } }\
class Dog extends Animal {\
  @Override void speak() { System.out.println(\\"Woof\\"); }  // override\
}\
\
Animal a = new Dog();\
a.speak();  // \\"Woof\\" — dispatched by the ACTUAL object type\
```\
\
**Overriding rules:** access cannot be narrower than parent, cannot throw broader checked exceptions, always use `@Override`.
