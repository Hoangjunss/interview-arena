---
id: spread-obj-va-object-assign-co-copy-sau-khong-muon-copy-sau-thi-dung-gi
position: backend
technology: object-copy
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spread `{...obj}` và `Object.assign` có copy sâu không? Muốn copy sâu thì dùng gì?

## Question (EN)
Do spread `{...obj}` and `Object.assign` copy deeply? What do you use for a deep copy?

## Đáp án chi tiết (VI)
Cả hai đều **copy nông (shallow)**: chỉ sao chép các thuộc tính own enumerable ở tầng một. Object lồng bên trong vẫn dùng chung tham chiếu.\
\
```js\
const a = { user: { name: 'An' }, tags: ['x'] };\
const b = { ...a };\
b.user.name = 'Bình';\
console.log(a.user.name); // 'Bình'  → a bị sửa theo\
```\
\
Đây là nguồn bug thường gặp trong React/Redux: tưởng đã tạo state mới nhưng object con vẫn là cũ, so sánh tham chiếu không phát hiện thay đổi.\
\
**Copy sâu:** dùng `structuredClone` (có sẵn trong trình duyệt hiện đại và Node 17+). Nó giữ được `Date`, `Map`, `Set`, `ArrayBuffer` và cả tham chiếu vòng.\
\
```js\
const deep = structuredClone(a);\
```\
\
Cách cũ `JSON.parse(JSON.stringify(obj))` làm mất `undefined`, `Date` biến thành chuỗi, và ném lỗi với tham chiếu vòng — chỉ dùng khi dữ liệu chắc chắn là JSON thuần.\
\
**Khác biệt nhỏ giữa spread và `Object.assign`:** spread tạo object mới, `Object.assign(target, src)` **ghi vào `target`** và kích hoạt setter trên target; spread thì định nghĩa thuộc tính mới, không gọi setter.

## Detailed Answer (EN)
Both are **shallow**: they copy only own enumerable properties at the first level. Nested objects stay shared by reference.\
\
```js\
const a = { user: { name: 'An' }, tags: ['x'] };\
const b = { ...a };\
b.user.name = 'Binh';\
console.log(a.user.name); // 'Binh'  → a changed too\
```\
\
This is a classic React/Redux bug: you think you produced new state, but the nested object is the old one, so a reference check sees no change.\
\
**Deep copy:** use `structuredClone` (modern browsers and Node 17+). It preserves `Date`, `Map`, `Set`, `ArrayBuffer`, and circular references.\
\
```js\
const deep = structuredClone(a);\
```\
\
The old `JSON.parse(JSON.stringify(obj))` drops `undefined`, turns `Date` into a string, and throws on circular references — use it only when the data is guaranteed plain JSON.\
\
**One subtle difference:** spread builds a new object, while `Object.assign(target, src)` **writes into `target`** and triggers setters on it; spread defines new properties instead and never invokes setters.
