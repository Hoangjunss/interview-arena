---
id: proto-va-prototype-khac-nhau-nhu-the-nao
position: backend
technology: prototype
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
__proto__ và prototype khác nhau như thế nào?

## Question (EN)
What is the difference between __proto__ and prototype?

## Đáp án chi tiết (VI)
`__proto__` là instance link — nằm trên object instance. `prototype` là blueprint — nằm trên constructor function. Khi dùng `new Foo()`, object mới có `__proto__` trỏ tới `Foo.prototype`.\
\
```javascript\
function Dog(name) { this.name = name; }\
Dog.prototype.bark = function() { return 'Woof'; };\
\
const d = new Dog('Rex');\
d.__proto__ === Dog.prototype; // true\
Object.getPrototypeOf(d) === Dog.prototype; // true (cách khuyến nghị)\
```\
\
Trong code thực tế, dùng `Object.getPrototypeOf(obj)` thay vì truy cập `__proto__` trực tiếp.

## Detailed Answer (EN)
`__proto__` is the instance link — it lives on an object instance. `prototype` is the blueprint — it lives on a constructor function. When you do `new Foo()`, the created object gets `__proto__` pointing to `Foo.prototype`.\
\
```javascript\
function Dog(name) { this.name = name; }\
Dog.prototype.bark = function() { return 'Woof'; };\
\
const d = new Dog('Rex');\
d.__proto__ === Dog.prototype; // true\
Object.getPrototypeOf(d) === Dog.prototype; // true (recommended way)\
```\
\
In real code, prefer `Object.getPrototypeOf(obj)` over direct `__proto__` access.
