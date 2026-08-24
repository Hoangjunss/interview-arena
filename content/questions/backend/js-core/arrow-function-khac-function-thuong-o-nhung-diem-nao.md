---
id: arrow-function-khac-function-thuong-o-nhung-diem-nao
position: backend
technology: js-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Arrow function khác function thường ở những điểm nào?

## Question (EN)
How do arrow functions differ from regular functions?

## Đáp án chi tiết (VI)
Arrow function không chỉ là cú pháp ngắn — nó khác function thường ở bốn điểm:\
\
- **`this`**: arrow **không có `this` riêng** — nó lấy `this` từ scope bao quanh lúc định nghĩa (lexical) và không đổi được bằng `call`/`apply`/`bind`. Function thường có `this` xác định theo **cách gọi** (qua object, `new`, standalone...).\
- **`arguments`**: arrow không có object `arguments` riêng — dùng rest parameter `(...args)` thay thế.\
- **Constructor**: arrow **không dùng được với `new`** (không có `prototype`, không phải constructor).\
- **Hoisting**: function **declaration** được hoist đầy đủ nên gọi được trước dòng khai báo; arrow gán vào `const`/`let` nằm trong temporal dead zone — dùng trước khi khai báo sẽ ném lỗi.\
\
Thực hành: arrow hợp với callback ngắn và code trong class/component muốn giữ `this` bên ngoài; **tránh** dùng arrow cho method của object literal hoặc handler cần `this` là element — vì `this` sẽ không trỏ vào đối tượng mong muốn.

## Detailed Answer (EN)
Arrow functions are not just shorter syntax — they differ from regular functions in four ways:\
\
- **`this`**: an arrow **has no `this` of its own** — it captures `this` from the enclosing scope at definition time (lexical) and cannot be changed via `call`/`apply`/`bind`. A regular function's `this` is determined by **how it is called** (through an object, `new`, standalone...).\
- **`arguments`**: arrows have no own `arguments` object — use a rest parameter `(...args)` instead.\
- **Constructor**: arrows **cannot be used with `new`** (no `prototype`, not a constructor).\
- **Hoisting**: a function **declaration** is fully hoisted so it can be called before its line; an arrow assigned to `const`/`let` sits in the temporal dead zone — using it before declaration throws.\
\
In practice: arrows suit short callbacks and class/component code that should keep the outer `this`; **avoid** arrows for object-literal methods or handlers that need `this` to be the element — `this` will not point where you expect.
