---
id: covariant-return-type-la-gi
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Covariant return type là gì?

## Question (EN)
What is a covariant return type?

## Đáp án chi tiết (VI)
**Covariant return** = khi **override** một method, class con được phép trả về **kiểu con (subtype)** của kiểu mà method cha khai báo, thay vì đúng y kiểu đó. Có từ Java 5.\
\
```java\
class Animal { Animal reproduce() { return new Animal(); } }\
class Cat extends Animal {\
  @Override Cat reproduce() { return new Cat(); } // trả Cat, không cần Animal\
}\
```\
\
Trước Java 5 phải trả đúng `Animal`, buộc caller ép kiểu `(Cat)`. Covariant return bỏ được cast đó — hay gặp ở `clone()` (override trả đúng kiểu class) và Builder pattern.\
\
Lưu ý: chỉ áp dụng cho **kiểu trả về là reference** (không cho primitive), và đây là **override thật**, không phải overload (chữ ký còn lại giữ nguyên).

## Detailed Answer (EN)
**Covariant return** = when **overriding** a method, the subclass may return a **subtype** of the type the parent declared, rather than the exact same type. Added in Java 5.\
\
```java\
class Animal { Animal reproduce() { return new Animal(); } }\
class Cat extends Animal {\
  @Override Cat reproduce() { return new Cat(); } // returns Cat, not Animal\
}\
```\
\
Before Java 5 you had to return exactly `Animal`, forcing callers to cast `(Cat)`. Covariant returns remove that cast — common in `clone()` (override returns the exact class type) and the Builder pattern.\
\
Note: it applies only to **reference return types** (not primitives), and it is a genuine **override**, not an overload (the rest of the signature stays the same).
