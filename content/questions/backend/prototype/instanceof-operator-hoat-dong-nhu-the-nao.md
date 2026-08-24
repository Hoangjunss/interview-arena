---
id: instanceof-operator-hoat-dong-nhu-the-nao
position: backend
technology: prototype
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
instanceof operator hoạt động như thế nào?

## Question (EN)
How does the instanceof operator work?

## Đáp án chi tiết (VI)
`obj instanceof Foo` kiểm tra: `Foo.prototype` có nằm trong prototype chain của `obj` không.\
\
```javascript\
[] instanceof Array;   // true\
[] instanceof Object;  // true (Array.prototype.__proto__ === Object.prototype)\
{} instanceof Array;   // false\
\
// Chain traversal:\
class Animal {}\
class Dog extends Animal {}\
const d = new Dog();\
d instanceof Dog;    // true\
d instanceof Animal; // true — vì Dog extends Animal\
```\
\
Lưu ý: qua `iframe`/`vm` khác realm, `instanceof` có thể cho kết quả không như mong đợi.

## Detailed Answer (EN)
`obj instanceof Foo` checks whether `Foo.prototype` exists in `obj`'s prototype chain.\
\
```javascript\
[] instanceof Array;   // true\
[] instanceof Object;  // true (Array.prototype.__proto__ === Object.prototype)\
{} instanceof Array;   // false\
\
// Chain traversal:\
class Animal {}\
class Dog extends Animal {}\
const d = new Dog();\
d instanceof Dog;    // true\
d instanceof Animal; // true — because Dog extends Animal\
```\
\
Note: across different realms (`iframe`/`vm`), `instanceof` can be unreliable.
