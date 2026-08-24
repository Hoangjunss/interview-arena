---
id: shallow-copy-va-deep-copy-khac-nhau-the-nao-sao-chep-sau-bang-cach-nao
position: backend
technology: javascript-cốt-lõi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Shallow copy và deep copy khác nhau thế nào? Sao chép sâu bằng cách nào?

## Question (EN)
Shallow copy vs deep copy — how do you deep-copy in JavaScript?

## Đáp án chi tiết (VI)
Object/array là **kiểu tham chiếu**; gán `b = a` chỉ chép tham chiếu, sửa `b` là sửa luôn `a`.\
\
- **Shallow copy**: sao chép **một cấp**; property lồng bên trong vẫn dùng chung tham chiếu.\
  - Cách: `{ ...obj }`, `Object.assign({}, obj)`, `arr.slice()`, `[...arr]`.\
  - Đủ khi dữ liệu phẳng (thường gặp khi cập nhật state bất biến trong React).\
- **Deep copy**: sao chép **đệ quy mọi cấp**, hoàn toàn tách biệt.\
  - `structuredClone(obj)` — API chuẩn, xử lý được `Date`, `Map`, `Set`, vòng tham chiếu.\
  - `JSON.parse(JSON.stringify(obj))` — nhanh gọn nhưng **mất** `undefined`, `function`, `Date` (thành string), và ném lỗi khi gặp vòng tham chiếu (circular reference).\
\
Chọn: state phẳng → shallow (nhanh, đủ); cấu trúc lồng sâu → `structuredClone`.

## Detailed Answer (EN)
Objects/arrays are **reference types**; `b = a` copies only the reference, so mutating `b` also mutates `a`.\
\
- **Shallow copy**: copies **one level**; nested properties still share references.\
  - How: `{ ...obj }`, `Object.assign({}, obj)`, `arr.slice()`, `[...arr]`.\
  - Enough for flat data (common when doing immutable state updates in React).\
- **Deep copy**: copies **recursively at every level**, fully independent.\
  - `structuredClone(obj)` — the standard API, handles `Date`, `Map`, `Set`, and circular references.\
  - `JSON.parse(JSON.stringify(obj))` — quick but **loses** `undefined`, functions, and `Date` (becomes a string), and throws on circular references.\
\
Choose: flat state → shallow (fast, enough); deeply nested structures → `structuredClone`.
