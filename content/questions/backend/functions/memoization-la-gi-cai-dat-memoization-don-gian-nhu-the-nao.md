---
id: memoization-la-gi-cai-dat-memoization-don-gian-nhu-the-nao
position: backend
technology: functions
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Memoization là gì? Cài đặt memoization đơn giản như thế nào?

## Question (EN)
What is memoization? How do you implement a simple memoize function?

## Đáp án chi tiết (VI)
Memoization là kỹ thuật cache kết quả của hàm dựa trên input để tránh tính toán lại. Hiệu quả với pure functions có tính toán nặng hoặc đệ quy như Fibonacci.\
\
```javascript\
function memoize(fn) {\
  const cache = new Map();\
  return function(...args) {\
    const key = JSON.stringify(args);\
    if (cache.has(key)) return cache.get(key);\
    const result = fn.apply(this, args);\
    cache.set(key, result);\
    return result;\
  };\
}\
\
const expensiveFib = memoize(function fib(n) {\
  if (n \u003c= 1) return n;\
  return expensiveFib(n - 1) + expensiveFib(n - 2);\
});\
expensiveFib(40); // nhanh — cache hit sau lần đầu\
```\
\
Lưu ý: JSON.stringify không phù hợp nếu args là object có circular reference.

## Detailed Answer (EN)
Memoization caches a function's result based on its input to avoid recomputation. Effective for pure functions with heavy computation or recursion like Fibonacci.\
\
```javascript\
function memoize(fn) {\
  const cache = new Map();\
  return function(...args) {\
    const key = JSON.stringify(args);\
    if (cache.has(key)) return cache.get(key);\
    const result = fn.apply(this, args);\
    cache.set(key, result);\
    return result;\
  };\
}\
\
const expensiveFib = memoize(function fib(n) {\
  if (n \u003c= 1) return n;\
  return expensiveFib(n - 1) + expensiveFib(n - 2);\
});\
expensiveFib(40); // fast — cache hits after first call\
```\
\
Note: JSON.stringify is not suitable if args contain circular references.
