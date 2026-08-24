---
id: prototype-pattern-la-gi-khi-nao-dung-trong-javascript-typescript
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prototype pattern là gì? Khi nào dùng trong JavaScript/TypeScript?

## Question (EN)
What is the Prototype pattern? When should you use it in JavaScript/TypeScript?

## Đáp án chi tiết (VI)
Prototype cho phép copy (clone) object hiện có mà không phụ thuộc vào class của nó — tạo object mới bằng cách sao chép prototype. JavaScript đặc biệt phù hợp vì có prototype-based inheritance tự nhiên. \
\
**Ví dụ:** `const config = { timeout: 3000, retries: 3 }; const apiConfig = { ...config, baseURL: '/api' }` — spread operator là Shallow Prototype. Dùng khi: khởi tạo object tốn kém (DB query, file I/O) và muốn clone thay vì tạo mới; khi có nhiều preset configuration chỉ khác nhau vài thuộc tính. Chú ý Shallow vs Deep clone: `Object.assign()` và spread `{...}` chỉ shallow clone, object nested vẫn shared reference — dùng `structuredClone()` (ES2022) hoặc `JSON.parse(JSON.stringify())` cho deep clone. Không dùng khi object có circular reference hoặc function (JSON.stringify sẽ mất).

## Detailed Answer (EN)
Prototype allows cloning an existing object without depending on its class — creating new objects by copying a prototype. JavaScript is especially well-suited for this because of its native prototype-based inheritance. \
\
**Example:** `const config = { timeout: 3000, retries: 3 }; const apiConfig = { ...config, baseURL: '/api' }` — the spread operator is a shallow Prototype clone. Use it when object initialization is expensive (DB queries, file I/O) and you'd rather clone than recreate; or when you have many preset configurations that differ by only a few properties. Be aware of shallow vs deep clone: `Object.assign()` and spread `{...}` only shallow clone, so nested objects still share references — use `structuredClone()` (ES2022) or `JSON.parse(JSON.stringify())` for deep clones. Avoid it when objects have circular references or functions, since `JSON.stringify` will lose those.
