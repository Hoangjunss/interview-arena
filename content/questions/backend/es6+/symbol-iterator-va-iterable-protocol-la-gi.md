---
id: symbol-iterator-va-iterable-protocol-la-gi
position: backend
technology: es6+
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Symbol.iterator và iterable protocol là gì?

## Question (EN)
What are Symbol.iterator and the iterable protocol?

## Đáp án chi tiết (VI)
Iterable protocol yêu cầu object có method Symbol.iterator trả về iterator object (có next() trả về {value, done}).\
\
Arrays, Strings, Maps, Sets implement sẵn. Custom iterables cho phép dùng for...of, spread, destructuring. Generator functions tự động tạo iterable.\
\
```javascript\
class Range {\
  constructor(start, end) { this.start = start; this.end = end; }\
  [Symbol.iterator]() {\
    let current = this.start;\
    const end = this.end;\
    return {\
      next() {\
        return current \u003c= end\
          ? { value: current++, done: false }\
          : { value: undefined, done: true };\
      }\
    };\
  }\
}\
for (const n of new Range(1, 3)) console.log(n); // 1, 2, 3\
```

## Detailed Answer (EN)
The iterable protocol requires an object to have a Symbol.iterator method that returns an iterator object (with next() returning {value, done}).\
\
Arrays, Strings, Maps, and Sets implement this by default. Custom iterables allow using for...of, spread, and destructuring. Generator functions automatically create iterables.\
\
```javascript\
class Range {\
  constructor(start, end) { this.start = start; this.end = end; }\
  [Symbol.iterator]() {\
    let current = this.start;\
    const end = this.end;\
    return {\
      next() {\
        return current \u003c= end\
          ? { value: current++, done: false }\
          : { value: undefined, done: true };\
      }\
    };\
  }\
}\
for (const n of new Range(1, 3)) console.log(n); // 1, 2, 3\
```
