---
id: tai-sao-arrow-function-khong-phu-hop-lam-method-trong-object
position: backend
technology: this-\u0026-binding
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao arrow function không phù hợp làm method trong object?

## Question (EN)
Why is an arrow function unsuitable as an object method?

## Đáp án chi tiết (VI)
Arrow function không có this riêng, kế thừa this từ lexical scope nơi nó được định nghĩa. Khi dùng làm method, this không trỏ đến object chứa method.\
\
```javascript\
const obj = {\
  name: 'Alice',\
  greet: () =\u003e this // arrow: this = global/undefined\
};\
console.log(obj.greet()); // undefined (hoặc Window)\
\
const obj2 = {\
  name: 'Alice',\
  greet() { return this.name; } // regular method: OK\
};\
console.log(obj2.greet()); // 'Alice'\
```\
\
Dùng function thông thường cho methods, arrow function cho callbacks bên trong method.

## Detailed Answer (EN)
Arrow functions have no own this; they inherit this from the lexical scope where they are defined. When used as a method, this does not point to the containing object.\
\
```javascript\
const obj = {\
  name: 'Alice',\
  greet: () =\u003e this // arrow: this = global/undefined\
};\
console.log(obj.greet()); // undefined (or Window)\
\
const obj2 = {\
  name: 'Alice',\
  greet() { return this.name; } // regular method: OK\
};\
console.log(obj2.greet()); // 'Alice'\
```\
\
Use regular functions for methods, and arrow functions for callbacks inside methods.
