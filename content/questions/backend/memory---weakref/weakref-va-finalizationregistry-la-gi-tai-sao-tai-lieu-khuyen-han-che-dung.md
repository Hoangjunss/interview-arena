---
id: weakref-va-finalizationregistry-la-gi-tai-sao-tai-lieu-khuyen-han-che-dung
position: backend
technology: memory---weakref
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WeakRef và FinalizationRegistry là gì? Tại sao tài liệu khuyên hạn chế dùng?

## Question (EN)
What are WeakRef and FinalizationRegistry, and why do the docs advise restraint?

## Đáp án chi tiết (VI)
$85

## Detailed Answer (EN)
Both let you interact with the **garbage collector**, but both are advisory (no timing guarantees).\
\
- **WeakRef** holds a **weak** reference to an object: it doesn't stop GC from reclaiming it. Call `.deref()` to get the object back — `undefined` if already collected.\
- **FinalizationRegistry** registers a callback that runs **after** an object is GC'd, to clean up associated resources (cache entry, file handle).\
\
```js\
const reg = new FinalizationRegistry((held) =\u003e console.log('collected:', held));\
let obj = { id: 42 };\
const ref = new WeakRef(obj);\
reg.register(obj, 'obj#42');\
ref.deref();   // {id:42} or undefined if collected\
```\
\
**Why restraint:** when, or whether, the callback runs is **not guaranteed** — it varies by engine and may never fire (e.g. tab closed). Correctness must not depend on it. Fine for backing caches, not for mandatory cleanup (use `try/finally` or `using`/`Symbol.dispose`).\
\
**Note:** don't call `deref()` repeatedly in one tick and assume consistent later results.
