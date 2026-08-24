---
id: destructuring-assignment-la-gi-cho-vi-du-voi-array-va-object
position: backend
technology: es6+
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Destructuring assignment là gì? Cho ví dụ với array và object.

## Question (EN)
What is destructuring assignment? Give examples with arrays and objects.

## Đáp án chi tiết (VI)
Destructuring cho phép giải nén giá trị từ array/object vào biến riêng lẻ. Hỗ trợ default values, alias, và nested destructuring.\
\
```javascript\
// Object destructuring:\
const { name, age = 18, address: { city } } = user;\
\
// Array destructuring (bỏ qua phần tử):\
const [first, , third] = [1, 2, 3];\
\
// Trong function parameter:\
function greet({ name, role = 'user' }) {\
  return `Hi ${name} (${role})`;\
}\
```

## Detailed Answer (EN)
Destructuring unpacks values from arrays/objects into separate variables. Supports default values, aliases, and nested destructuring.\
\
```javascript\
// Object destructuring:\
const { name, age = 18, address: { city } } = user;\
\
// Array destructuring (skip elements):\
const [first, , third] = [1, 2, 3];\
\
// In function parameter:\
function greet({ name, role = 'user' }) {\
  return `Hi ${name} (${role})`;\
}\
```
