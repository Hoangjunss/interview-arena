---
id: implement-promise-all-tu-dau
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement Promise.all từ đầu?

## Question (EN)
Implement Promise.all from scratch.

## Đáp án chi tiết (VI)
Promise.all resolve khi tất cả promises resolve; reject ngay khi có 1 promise reject.\
\
```js\
function promiseAll(promises) {\
  return new Promise((resolve, reject) =\u003e {\
    if (promises.length === 0) { resolve([]); return; }\
    const results = [];\
    let count = 0;\
    promises.forEach((p, i) =\u003e {\
      Promise.resolve(p)\
        .then(val =\u003e { results[i] = val; if (++count === promises.length) resolve(results); })\
        .catch(reject);\
    });\
  });\
}\
```\
\
**Lưu ý:** handle empty array (resolve ngay []). Reject ngay khi 1 promise reject.

## Detailed Answer (EN)
`function promiseAll(promises) { return new Promise((resolve, reject) =\u003e { if (promises.length === 0) { resolve([]); return; } const results = []; let count = 0; promises.forEach((p, i) =\u003e { Promise.resolve(p).then(val =\u003e { results[i] = val; if (++count === promises.length) resolve(results); }).catch(reject); }); }); }` Edge cases: handle the empty array (resolve immediately with []). Reject as soon as any single promise rejects.
