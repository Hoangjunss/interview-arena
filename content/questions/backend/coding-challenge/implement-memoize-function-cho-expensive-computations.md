---
id: implement-memoize-function-cho-expensive-computations
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement memoize function cho expensive computations?

## Question (EN)
Implement a memoize function for expensive computations.

## Đáp án chi tiết (VI)
Memoize caches kết quả function theo argument key, tránh tính toán lại những lần sau.\
\
```js\
function memoize(fn) {\
  const cache = new Map();\
  return (...args) =\u003e {\
    const key = JSON.stringify(args);\
    if (cache.has(key)) return cache.get(key);\
    const result = fn(...args);\
    cache.set(key, result);\
    return result;\
  };\
}\
```\
\
**Lưu ý:** JSON.stringify chậm cho args lớn. Production dùng WeakMap cho object args, LRU cache giới hạn size.

## Detailed Answer (EN)
`function memoize(fn) { const cache = new Map(); return (...args) =\u003e { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn(...args); cache.set(key, result); return result; }; }` \
\
**Note:** JSON.stringify is slow for large arguments. In production, use WeakMap for object arguments and an LRU cache with a size limit.
