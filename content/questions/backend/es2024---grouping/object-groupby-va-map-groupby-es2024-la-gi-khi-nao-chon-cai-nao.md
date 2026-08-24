---
id: object-groupby-va-map-groupby-es2024-la-gi-khi-nao-chon-cai-nao
position: backend
technology: es2024---grouping
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Object.groupBy() và Map.groupBy() (ES2024) là gì? Khi nào chọn cái nào?

## Question (EN)
What are Object.groupBy() and Map.groupBy() (ES2024), and when do you pick one over the other?

## Đáp án chi tiết (VI)
Hai static method gom các phần tử của một iterable thành nhóm dựa trên giá trị callback trả về, thay cho việc tự viết `reduce` lồng nhau.\
\
- **Object.groupBy(items, fn)** → trả về object thường (`null`-prototype), key là **string/symbol** (giá trị callback bị ép về string).\
- **Map.groupBy(items, fn)** → trả về `Map`, key giữ nguyên kiểu — dùng được **object/number/boolean làm key** và an toàn với key như `__proto__`.\
\
```js\
const nums = [1, 2, 3, 4, 5];\
Object.groupBy(nums, (n) =\u003e (n % 2 ? 'odd' : 'even'));\
// { odd: [1, 3, 5], even: [2, 4] }\
\
Map.groupBy(nums, (n) =\u003e (n \u003e 3 ? bigKeyObj : smallKeyObj));\
// Map { smallKeyObj =\u003e [1,2,3], bigKeyObj =\u003e [4,5] }\
```\
\
**Chọn cái nào:** cần key dạng chuỗi đơn giản, JSON-friendly → `Object.groupBy`. Cần key là object hoặc tránh đụng prototype → `Map.groupBy`.\
\
**Lưu ý:** không có `?.groupBy` trên instance — đây là static method. Callback nhận `(element, index)`.

## Detailed Answer (EN)
Two static methods that group an iterable's elements by the value a callback returns, replacing hand-written nested `reduce`.\
\
- **Object.groupBy(items, fn)** → plain (`null`-prototype) object; keys are **strings/symbols** (callback value is coerced to string).\
- **Map.groupBy(items, fn)** → a `Map`; keys keep their type — you can use **objects/numbers/booleans as keys**, and it's safe against keys like `__proto__`.\
\
```js\
const nums = [1, 2, 3, 4, 5];\
Object.groupBy(nums, (n) =\u003e (n % 2 ? 'odd' : 'even'));\
// { odd: [1, 3, 5], even: [2, 4] }\
\
Map.groupBy(nums, (n) =\u003e (n \u003e 3 ? bigKeyObj : smallKeyObj));\
```\
\
**Which:** simple JSON-friendly string keys → `Object.groupBy`. Object keys or avoiding prototype clashes → `Map.groupBy`.\
\
**Note:** there's no instance `.groupBy` — these are static. The callback receives `(element, index)`.
