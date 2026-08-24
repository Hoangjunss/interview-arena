---
id: delete-obj-x-khac-obj-x-undefined-the-nao
position: backend
technology: object
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`delete obj.x` khác `obj.x = undefined` thế nào?

## Question (EN)
How does `delete obj.x` differ from `obj.x = undefined`?

## Đáp án chi tiết (VI)
`delete` **gỡ hẳn property** khỏi object; gán `undefined` giữ property lại nhưng đổi giá trị. Khác biệt lộ ra ở mọi thao tác duyệt hoặc kiểm tra sự tồn tại.\
\
```js\
const a = { x: 1 };\
const b = { x: 1 };\
delete a.x;\
b.x = undefined;\
\
'x' in a;              // false\
'x' in b;              // true\
Object.keys(a);        // []\
Object.keys(b);        // ['x']\
JSON.stringify(a);     // '{}'\
JSON.stringify(b);     // '{}'  — undefined bị bỏ khi serialize\
```\
\
Hai điểm hay bị hỏi thêm:\
- `delete` trả về `true` cả khi property không tồn tại; chỉ trả `false` với property **non-configurable** (và ném `TypeError` ở strict mode).\
- `delete` trên phần tử mảng **không giảm `length`**, chỉ tạo lỗ trống: `const arr = [1,2,3]; delete arr[1]` → `[1, \u003c1 empty item\u003e, 3]`, `arr.length` vẫn `3`. Muốn bỏ phần tử dùng `splice` hoặc `filter`.\
\
Thực tế: dùng `delete` khi cần object không còn key đó (ví dụ build query params bỏ field rỗng); dùng `= undefined` khi shape của object phải giữ nguyên.

## Detailed Answer (EN)
$82
