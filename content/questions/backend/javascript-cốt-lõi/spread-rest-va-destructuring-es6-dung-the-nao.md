---
id: spread-rest-va-destructuring-es6-dung-the-nao
position: backend
technology: javascript-cốt-lõi
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spread, rest và destructuring (ES6+) dùng thế nào?

## Question (EN)
How do spread, rest, and destructuring (ES6+) work?

## Đáp án chi tiết (VI)
- **Destructuring**: rút giá trị từ mảng/object ra biến.\
  - `const [a, b] = arr`, `const { x, y } = obj`.\
  - Đổi tên `{ x: newX }`, mặc định `{ x = 0 }`, lồng nhau, dùng cho tham số hàm.\
- **Spread `...`**: \\"trải\\" phần tử ra.\
  - Sao chép nông + gộp: `[...a, ...b]`, `{ ...o1, ...o2 }` (key sau đè key trước).\
  - Truyền mảng làm đối số: `fn(...args)`.\
- **Rest `...`**: \\"gom\\" phần còn lại thành một biến.\
  - Tham số biến thiên: `function f(first, ...others)`.\
  - Trong destructuring: `const [head, ...tail] = arr`.\
\
Phân biệt: cùng ký hiệu `...` nhưng **spread trải ra** ở vế phải/lời gọi, **rest gom lại** ở vế trái/tham số. Lưu ý spread chỉ **sao chép nông** (nested object vẫn dùng chung tham chiếu).

## Detailed Answer (EN)
- **Destructuring**: pull values out of arrays/objects into variables.\
  - `const [a, b] = arr`, `const { x, y } = obj`.\
  - Rename `{ x: newX }`, defaults `{ x = 0 }`, nesting, and function parameters.\
- **Spread `...`**: \\"spreads\\" elements out.\
  - Shallow copy + merge: `[...a, ...b]`, `{ ...o1, ...o2 }` (later keys override earlier).\
  - Pass an array as arguments: `fn(...args)`.\
- **Rest `...`**: \\"gathers\\" the remainder into one variable.\
  - Variadic params: `function f(first, ...others)`.\
  - In destructuring: `const [head, ...tail] = arr`.\
\
Distinction: same `...` token, but **spread expands** on the right side / in a call, while **rest collects** on the left side / in parameters. Note spread is a **shallow copy** (nested objects still share references).
