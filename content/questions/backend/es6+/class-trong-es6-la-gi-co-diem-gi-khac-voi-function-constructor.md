---
id: class-trong-es6-la-gi-co-diem-gi-khac-voi-function-constructor
position: backend
technology: es6+
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Class trong ES6 là gì? Có điểm gì khác với function constructor?

## Question (EN)
What are ES6 classes? How do they differ from function constructors?

## Đáp án chi tiết (VI)
Class là cú pháp OOP rõ ràng hơn để tạo objects.\
```javascript\
class Animal {\
  #name; // private field\
  constructor(name) {\
    this.#name = name;\
  }\
  speak() {\
    return this.#name + ' speaks';\
  }\
  static create(name) {\
    return new Animal(name);\
  }\
}\
const a = Animal.create('Cat');\
a.speak(); // 'Cat speaks'\
```\
Khác function constructor: class không thể gọi không có `new` (throw TypeError), methods không enumerable (không xuất hiện trong for...in), và phải khai báo trước khi dùng (không hoisted). Bên dưới vẫn dùng prototype chain — class chỉ là syntactic sugar.

## Detailed Answer (EN)
Classes are a clearer OOP syntax for creating objects.\
```javascript\
class Animal {\
  #name; // private field\
  constructor(name) {\
    this.#name = name;\
  }\
  speak() {\
    return this.#name + ' speaks';\
  }\
  static create(name) {\
    return new Animal(name);\
  }\
}\
const a = Animal.create('Cat');\
a.speak(); // 'Cat speaks'\
```\
Differences from function constructors: classes cannot be called without `new` (throws TypeError), methods are non-enumerable (do not appear in for...in), and they must be declared before use (not hoisted). Under the hood they still use prototype chains — classes are just syntactic sugar.
