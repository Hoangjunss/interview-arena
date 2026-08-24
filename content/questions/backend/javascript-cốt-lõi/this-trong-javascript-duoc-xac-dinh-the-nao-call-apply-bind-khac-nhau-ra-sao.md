---
id: this-trong-javascript-duoc-xac-dinh-the-nao-call-apply-bind-khac-nhau-ra-sao
position: backend
technology: javascript-cốt-lõi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`this` trong JavaScript được xác định thế nào? `call`, `apply`, `bind` khác nhau ra sao?

## Question (EN)
How is `this` determined in JavaScript? How do `call`, `apply`, and `bind` differ?

## Đáp án chi tiết (VI)
`this` phụ thuộc **cách hàm được gọi**, không phải nơi định nghĩa (trừ arrow function). Thứ tự ưu tiên:\
\
1. **`new`** → `this` là object mới tạo.\
2. **`call`/`apply`/`bind`** → `this` là giá trị truyền vào.\
3. **Method call** `obj.fn()` → `this` là `obj`.\
4. **Gọi trơn** `fn()` → `undefined` (strict mode) hoặc `globalThis`.\
\
**Arrow function** không có `this` riêng — kế thừa `this` từ scope bao ngoài (lexical), nên hợp cho callback.\
\
Gắn `this` thủ công:\
- `call(thisArg, a, b)` — gọi ngay, đối số rời.\
- `apply(thisArg, [a, b])` — gọi ngay, đối số dạng mảng.\
- `bind(thisArg)` — **không gọi ngay**, trả về hàm mới đã khóa `this`.

## Detailed Answer (EN)
`this` depends on **how a function is called**, not where it is defined (except arrow functions). Priority:\
\
1. **`new`** → `this` is the newly created object.\
2. **`call`/`apply`/`bind`** → `this` is the value you pass.\
3. **Method call** `obj.fn()` → `this` is `obj`.\
4. **Plain call** `fn()` → `undefined` (strict mode) or `globalThis`.\
\
**Arrow functions** have no own `this` — they inherit it lexically from the enclosing scope, which is handy for callbacks.\
\
Setting `this` manually:\
- `call(thisArg, a, b)` — invokes now, args listed individually.\
- `apply(thisArg, [a, b])` — invokes now, args as an array.\
- `bind(thisArg)` — **does not invoke**; returns a new function with `this` locked in.
