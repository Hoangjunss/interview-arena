---
id: dung-object-thuong-lam-cache-voi-key-la-object-thi-co-van-de-gi-khi-nao-phai-dun
position: backend
technology: object-vs-map
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng object thường làm cache với key là object thì có vấn đề gì? Khi nào phải dùng `Map`?

## Question (EN)
What goes wrong when you use a plain object as a cache keyed by objects? When must you use `Map`?

## Đáp án chi tiết (VI)
Key của object thường **luôn bị ép về chuỗi** (hoặc `Symbol`). Mọi object dùng làm key đều thành `'[object Object]'`, nên các entry khác nhau ghi đè lẫn nhau.\
\
```js\
const cache = {};\
const u1 = { id: 1 };\
const u2 = { id: 2 };\
cache[u1] = 'a';\
cache[u2] = 'b';\
Object.keys(cache);   // ['[object Object]'] — chỉ 1 key\
cache[u1];            // 'b' — đã bị u2 ghi đè\
\
cache[1] === cache['1'];   // true — số cũng bị ép về chuỗi\
```\
\
**Dùng `Map` khi:**\
- Key không phải chuỗi (object, số, hàm) — `Map` so khớp key bằng **tham chiếu/giá trị gốc**, không ép kiểu.\
- Cần biết **số lượng** (`map.size`) và duyệt **theo thứ tự chèn** (`for...of`).\
- Key do người dùng nhập, tránh đụng key kế thừa từ prototype (`toString`, `constructor`).\
\
Dùng object thường khi key là chuỗi cố định do code quyết định (config, lookup table) và cần `JSON.stringify` trực tiếp — `Map` không serialize được bằng `JSON.stringify`.

## Detailed Answer (EN)
Plain-object keys are **always coerced to strings** (or `Symbol`s). Every object used as a key becomes `'[object Object]'`, so distinct entries overwrite each other.\
\
```js\
const cache = {};\
const u1 = { id: 1 };\
const u2 = { id: 2 };\
cache[u1] = 'a';\
cache[u2] = 'b';\
Object.keys(cache);   // ['[object Object]'] — a single key\
cache[u1];            // 'b' — overwritten by u2\
\
cache[1] === cache['1'];   // true — numbers get stringified too\
```\
\
**Use `Map` when:**\
- Keys are not strings (objects, numbers, functions) — `Map` matches keys by **reference/original value**, with no coercion.\
- You need the **size** (`map.size`) and iteration in **insertion order** (`for...of`).\
- Keys come from user input, so you avoid colliding with inherited prototype keys (`toString`, `constructor`).\
\
Stick with a plain object when keys are fixed strings decided by your code (config, lookup tables) and you need direct `JSON.stringify` — a `Map` does not serialize with `JSON.stringify`.
