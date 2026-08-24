---
id: proxy-va-reflect-trong-es6-la-gi
position: backend
technology: es6+
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Proxy và Reflect trong ES6 là gì?

## Question (EN)
What are Proxy and Reflect in ES6?

## Đáp án chi tiết (VI)
Proxy bọc object và chặn các operation (get, set, has, deleteProperty...) bằng handler traps. Reflect cung cấp methods tương ứng với các traps. Dùng để tạo reactive objects (Vue 3), validation, logging, lazy initialization, hay implement Observable.\
\
```javascript\
const handler = {\
  get(target, key) {\
    console.log(`Getting ${key}`);\
    return Reflect.get(target, key);\
  }\
};\
const obj = new Proxy({ name: 'Alice' }, handler);\
console.log(obj.name); // logs \\"Getting name\\" then \\"Alice\\"\
```

## Detailed Answer (EN)
Proxy wraps an object and intercepts operations (get, set, has, deleteProperty...) via handler traps. Reflect provides methods corresponding to the traps. Used to create reactive objects (Vue 3), validation, logging, lazy initialization, or to implement Observable.\
\
```javascript\
const handler = {\
  get(target, key) {\
    console.log(`Getting ${key}`);\
    return Reflect.get(target, key);\
  }\
};\
const obj = new Proxy({ name: 'Alice' }, handler);\
console.log(obj.name); // logs \\"Getting name\\" then \\"Alice\\"\
```
