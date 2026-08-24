---
id: gia-tri-truthy-falsy-la-gi-liet-ke-cac-gia-tri-falsy-trong-javascript
position: backend
technology: js-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giá trị truthy/falsy là gì? Liệt kê các giá trị falsy trong JavaScript.

## Question (EN)
What are truthy/falsy values? List the falsy values in JavaScript.

## Đáp án chi tiết (VI)
Khi một giá trị được dùng ở **ngữ cảnh boolean** (`if`, `!`, `\u0026\u0026`, `||`, toán tử ba ngôi), JS **ép** nó về `true` hoặc `false`. Giá trị ép thành `false` gọi là **falsy**, còn lại là **truthy**.\
\
Chỉ có **8 giá trị falsy** (nhớ hết là đủ):\
\
- `false`\
- `0`, `-0`, `0n` (BigInt zero)\
- `''` (chuỗi rỗng)\
- `null`\
- `undefined`\
- `NaN`\
\
**Mọi giá trị khác đều truthy** — kể cả những cái dễ nhầm: `'0'` (chuỗi), `'false'` (chuỗi), `[]` (mảng rỗng), `{}` (object rỗng), và hàm.\
\
Lưu ý: `if (arr.length)` đúng, nhưng `if (arr)` luôn true kể cả mảng rỗng. Kiểm tra số `0` hợp lệ thì đừng dùng `if (count)` (sẽ trượt `0`) — dùng `if (count != null)` hoặc kiểm tra rõ ràng.

## Detailed Answer (EN)
When a value is used in a **boolean context** (`if`, `!`, `\u0026\u0026`, `||`, the ternary operator), JS **coerces** it to `true` or `false`. Values that coerce to `false` are **falsy**; everything else is **truthy**.\
\
There are exactly **8 falsy values** (memorize them all):\
\
- `false`\
- `0`, `-0`, `0n` (BigInt zero)\
- `''` (empty string)\
- `null`\
- `undefined`\
- `NaN`\
\
**Every other value is truthy** — including deceptive ones: `'0'` (a string), `'false'` (a string), `[]` (empty array), `{}` (empty object), and functions.\
\
Common trap: `if (arr.length)` is fine, but `if (arr)` is always true even for an empty array. To accept a valid `0`, do not write `if (count)` (it drops `0`) — use `if (count != null)` or an explicit check.
