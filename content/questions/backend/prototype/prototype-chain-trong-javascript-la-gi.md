---
id: prototype-chain-trong-javascript-la-gi
position: backend
technology: prototype
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prototype chain trong JavaScript là gì?

## Question (EN)
What is the prototype chain in JavaScript?

## Đáp án chi tiết (VI)
Prototype chain là đường JavaScript đi tìm thuộc tính. Nếu `obj.name` không có trên `obj`, JS tìm tiếp trên prototype... cho tới khi gặp `null` thì dừng.\
\
```javascript\
const animal = { breathes: true };\
const dog = Object.create(animal);\
dog.bark = true;\
\
console.log(dog.bark);     // true  — own property\
console.log(dog.breathes); // true  — inherited from animal\
console.log(dog.__proto__ === animal); // true\
\
// hasOwnProperty kiểm tra chỉ own property:\
console.log(dog.hasOwnProperty('breathes')); // false\
```

## Detailed Answer (EN)
The prototype chain is the path JavaScript follows to find a property. If `obj.name` is not on `obj`, JS checks the prototype, and so on until `null`.\
\
```javascript\
const animal = { breathes: true };\
const dog = Object.create(animal);\
dog.bark = true;\
\
console.log(dog.bark);     // true  — own property\
console.log(dog.breathes); // true  — inherited from animal\
console.log(dog.__proto__ === animal); // true\
\
// hasOwnProperty only checks own properties:\
console.log(dog.hasOwnProperty('breathes')); // false\
```
