---
id: call-apply-bind-khac-nhau-ra-sao-bind-hai-lan-thi-this-la-cua-lan-nao
position: backend
technology: call-apply-bind
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`call`, `apply`, `bind` khác nhau ra sao? `bind` hai lần thì `this` là của lần nào?

## Question (EN)
How do `call`, `apply`, and `bind` differ? If you `bind` twice, which `this` wins?

## Đáp án chi tiết (VI)
`call(thisArg, a, b)` và `apply(thisArg, [a, b])` **gọi hàm ngay**, chỉ khác cách truyền đối số. `bind(thisArg, ...)` **không gọi**, nó trả về một hàm mới đã gắn cứng `this`.\
\
```js\
function show(prefix) { return prefix + this.name; }\
const user = { name: 'An' };\
\
show.call(user, 'Xin chào ');   // gọi ngay\
show.apply(user, ['Xin chào ']); // gọi ngay, đối số dạng mảng\
const bound = show.bind(user);    // trả hàm mới\
```\
\
**`bind` hai lần: lần đầu thắng.** Hàm đã bound trở thành *exotic bound function*, mọi lần bind sau chỉ bọc thêm một lớp nhưng `this` bên trong vẫn là giá trị của lần bind đầu tiên.\
\
```js\
const f = show.bind({ name: 'A' }).bind({ name: 'B' });\
f(''); // 'A'\
```\
\
Cùng lý do, `bound.call(other)` cũng không đổi được `this`.\
\
**Ngoại lệ `new`:** gọi `new BoundFn()` bỏ qua `this` đã bind (nhưng vẫn giữ các đối số đã bind trước — partial application).\
\
**Arrow function không có `this` riêng** nên `call`/`apply`/`bind` không đổi được `this` của nó; nó luôn lấy `this` từ scope nơi được định nghĩa.

## Detailed Answer (EN)
$82
