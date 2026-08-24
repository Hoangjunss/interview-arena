---
id: object-assign-va-spread-operator-khi-copy-object-khac-nhau-nhu-the-nao
position: backend
technology: es6+
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Object.assign() và spread operator khi copy object khác nhau như thế nào?

## Question (EN)
How do Object.assign() and the spread operator differ when copying objects?

## Đáp án chi tiết (VI)
Cả hai đều shallow copy. Object.assign() copy vào object đích hiện có, trigger setters trên target. Spread tạo plain object mới, không trigger setters.\
\
Object.assign() copy enumerable own properties bao gồm cả Symbol. Với nested objects, cả hai chỉ copy reference, không deep copy.\
\
```javascript\
const target = { a: 1 };\
const result = Object.assign(target, { b: 2 }); // mutates target\
const spread = { ...target, c: 3 };             // new object\
```

## Detailed Answer (EN)
Both perform shallow copies. Object.assign() copies into an existing target object and triggers setters on the target. Spread creates a new plain object without triggering setters.\
\
Object.assign() copies enumerable own properties including Symbols. For nested objects, both only copy the reference — neither performs a deep copy.\
\
```javascript\
const target = { a: 1 };\
const result = Object.assign(target, { b: 2 }); // mutates target\
const spread = { ...target, c: 3 };             // new object\
```
