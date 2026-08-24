---
id: object-create-hoat-dong-nhu-the-nao
position: backend
technology: prototype
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Object.create() hoạt động như thế nào?

## Question (EN)
How does Object.create() work?

## Đáp án chi tiết (VI)
`Object.create(proto)` tạo object mới với prototype là `proto`. Object con dùng được method từ `proto` qua prototype chain.\
\
```javascript\
const parent = { greet() { return 'Hi!'; } };\
const child = Object.create(parent);\
child.greet(); // 'Hi!' — inherited\
child.hasOwnProperty('greet'); // false — not own\
\
// Object.create(null) — object không có prototype\
const dict = Object.create(null);\
'toString' in dict; // false — thật sự sạch\
```

## Detailed Answer (EN)
`Object.create(proto)` creates a new object whose prototype is `proto`. The child can use methods from `proto` via the prototype chain.\
\
```javascript\
const parent = { greet() { return 'Hi!'; } };\
const child = Object.create(parent);\
child.greet(); // 'Hi!' — inherited\
child.hasOwnProperty('greet'); // false — not own\
\
// Object.create(null) — object with no prototype\
const dict = Object.create(null);\
'toString' in dict; // false — truly clean\
```
