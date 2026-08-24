---
id: mapped-types-trong-typescript-la-gi
position: backend
technology: generics
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mapped types trong TypeScript là gì?

## Question (EN)
What are mapped types in TypeScript?

## Đáp án chi tiết (VI)
Mapped types tạo type mới bằng cách biến đổi properties của type khác: `{ [K in keyof T]: ... }`.\
```typescript\
// Giải thích cách hoạt động qua ví dụ\
type User = { id: number; name: string; email: string };\
\
// Tương đương Partial\u003cT\u003e\
type MyPartial\u003cT\u003e = { [K in keyof T]?: T[K] };\
\
// Tương đương Readonly\u003cT\u003e\
type MyReadonly\u003cT\u003e = { readonly [K in keyof T]: T[K] };\
\
// Biến đổi value type\
type Nullable\u003cT\u003e = { [K in keyof T]: T[K] | null };\
\
// Xóa modifier: -readonly, -?\
type Mutable\u003cT\u003e = { -readonly [K in keyof T]: T[K] };\
type Required\u003cT\u003e = { [K in keyof T]-?: T[K] };\
\
// Remap key với as\
type Getters\u003cT\u003e = {\
  [K in keyof T as `get${Capitalize\u003cstring \u0026 K\u003e}`]: () =\u003e T[K]\
};\
```\
Là nền tảng của nhiều built-in utility types (Partial, Readonly, Record, Pick, Omit).

## Detailed Answer (EN)
Mapped types create new types by transforming properties of another type: `{ [K in keyof T]: ... }`.\
```typescript\
// Understanding through examples\
type User = { id: number; name: string; email: string };\
\
// Equivalent to Partial\u003cT\u003e\
type MyPartial\u003cT\u003e = { [K in keyof T]?: T[K] };\
\
// Equivalent to Readonly\u003cT\u003e\
type MyReadonly\u003cT\u003e = { readonly [K in keyof T]: T[K] };\
\
// Transform value types\
type Nullable\u003cT\u003e = { [K in keyof T]: T[K] | null };\
\
// Remove modifiers: -readonly, -?\
type Mutable\u003cT\u003e = { -readonly [K in keyof T]: T[K] };\
type Required\u003cT\u003e = { [K in keyof T]-?: T[K] };\
\
// Remap key with as\
type Getters\u003cT\u003e = {\
  [K in keyof T as `get${Capitalize\u003cstring \u0026 K\u003e}`]: () =\u003e T[K]\
};\
```\
They are the foundation of many built-in utility types (Partial, Readonly, Record, Pick, Omit).
