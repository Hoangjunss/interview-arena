---
id: template-literal-types-trong-typescript-la-gi
position: backend
technology: generics
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Template literal types trong TypeScript là gì?

## Question (EN)
What are template literal types in TypeScript?

## Đáp án chi tiết (VI)
Template literal types tạo string types từ combinations. Kết hợp với union cực kỳ mạnh cho type-safe event names, CSS properties, API endpoints. Intrinsic types: Uppercase, Lowercase, Capitalize, Uncapitalize.\
\
```typescript\
type EventName = `on${Capitalize\u003cstring\u003e}`;\
type Side = 'top' | 'bottom' | 'left' | 'right';\
type Padding = `padding-${Side}`; // \\"padding-top\\" | \\"padding-bottom\\" | ...\
\
type Handlers = { [K in EventName]?: () =\u003e void };\
// Dùng trong event bus, styled-components, API path generation\
```

## Detailed Answer (EN)
Template literal types create string types from combinations. Combined with unions they are extremely powerful for type-safe event names, CSS properties, and API endpoints. Intrinsic types: Uppercase, Lowercase, Capitalize, Uncapitalize.\
\
```typescript\
type EventName = `on${Capitalize\u003cstring\u003e}`;\
type Side = 'top' | 'bottom' | 'left' | 'right';\
type Padding = `padding-${Side}`; // \\"padding-top\\" | \\"padding-bottom\\" | ...\
\
type Handlers = { [K in EventName]?: () =\u003e void };\
// Used in event buses, styled-components, API path generation\
```
