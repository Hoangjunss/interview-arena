---
id: keyof-operator-la-gi
position: backend
technology: generics
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
keyof operator là gì?

## Question (EN)
What is the keyof operator?

## Đáp án chi tiết (VI)
`keyof T` trả về union type của tất cả keys của T: `keyof {a: number, b: string}` cho ra `'a' | 'b'`. Dùng với generics để type-safe property access: `function get\u003cT, K extends keyof T\u003e(obj: T, key: K): T[K]` đảm bảo key tồn tại và return đúng kiểu. `keyof typeof obj` lấy keys của object value (không phải type). Hay gặp trong utility types như `Pick`, `Record`, và khi build form hay table components cần truy cập dynamic property một cách an toàn.

## Detailed Answer (EN)
`keyof T` returns a union type of all keys of T: `keyof {a: number, b: string}` gives `'a' | 'b'`. Used with generics for type-safe property access: `function get\u003cT, K extends keyof T\u003e(obj: T, key: K): T[K]` ensures the key exists and returns the correct type. `keyof typeof obj` gets the keys of an object value (not a type). Commonly seen in utility types like `Pick`, `Record`, and when building form or table components that need dynamic property access safely.
