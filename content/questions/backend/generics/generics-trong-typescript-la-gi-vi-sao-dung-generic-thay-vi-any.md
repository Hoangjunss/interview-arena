---
id: generics-trong-typescript-la-gi-vi-sao-dung-generic-thay-vi-any
position: backend
technology: generics
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generics trong TypeScript là gì? Vì sao dùng generic thay vì `any`?

## Question (EN)
What are generics in TypeScript? Why use a generic instead of `any`?

## Đáp án chi tiết (VI)
Generic = **tham số hóa kiểu**: viết hàm/class/type hoạt động trên nhiều kiểu mà vẫn **giữ quan hệ giữa các kiểu**.\
\
- `function identity\u003cT\u003e(x: T): T` — `T` được **suy ra** từ đối số truyền vào, giá trị trả về giữ đúng kiểu đó.\
- **Constraint**: `\u003cT extends { id: number }\u003e` giới hạn `T` phải có shape nhất định.\
- **Default**: `\u003cT = string\u003e`.\
\
Khác `any`: generic **giữ nguyên kiểm tra kiểu** ở nơi gọi (call site vẫn biết kiểu cụ thể), còn `any` **tắt** kiểm tra và làm mất autocomplete. Dùng nhiều cho collection, response API, và hook (`useState\u003cT\u003e`).

## Detailed Answer (EN)
A generic **parameterizes types**: you write a function/class/type that works over many types while **preserving the relationship between them**.\
\
- `function identity\u003cT\u003e(x: T): T` — `T` is **inferred** from the argument, and the return keeps that exact type.\
- **Constraint**: `\u003cT extends { id: number }\u003e` requires `T` to have a certain shape.\
- **Default**: `\u003cT = string\u003e`.\
\
Unlike `any`, a generic **keeps type checking** at the call site (the caller still knows the concrete type), whereas `any` **turns checking off** and loses autocomplete. Common in collections, API responses, and hooks (`useState\u003cT\u003e`).
