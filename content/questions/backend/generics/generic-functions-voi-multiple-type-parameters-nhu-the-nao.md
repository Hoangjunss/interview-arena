---
id: generic-functions-voi-multiple-type-parameters-nhu-the-nao
position: backend
technology: generics
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generic functions với multiple type parameters như thế nào?

## Question (EN)
How do generic functions with multiple type parameters work?

## Đáp án chi tiết (VI)
Hàm có thể có nhiều type params. Inference hoạt động independently cho mỗi param. Đặt tên rõ ràng (TKey, TValue) thay chỉ T, U, V khi có nhiều params.\
\
```typescript\
function zip\u003cT, U\u003e(a: T[], b: U[]): [T, U][] {\
  return a.map((item, i) =\u003e [item, b[i]]);\
}\
const pairs = zip([1, 2], ['a', 'b']); // [number, string][]\
\
function getEntry\u003cTObj, TKey extends keyof TObj\u003e(obj: TObj, key: TKey): TObj[TKey] {\
  return obj[key];\
}\
```

## Detailed Answer (EN)
Functions can have multiple type params. Inference works independently for each param. Use descriptive names (TKey, TValue) instead of just T, U, V when there are multiple params.\
\
```typescript\
function zip\u003cT, U\u003e(a: T[], b: U[]): [T, U][] {\
  return a.map((item, i) =\u003e [item, b[i]]);\
}\
const pairs = zip([1, 2], ['a', 'b']); // [number, string][]\
\
function getEntry\u003cTObj, TKey extends keyof TObj\u003e(obj: TObj, key: TKey): TObj[TKey] {\
  return obj[key];\
}\
```
