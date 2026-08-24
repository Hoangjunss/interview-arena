---
id: generics-trong-typescript-la-gi-tai-sao-can-thiet
position: backend
technology: generics
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generics trong TypeScript là gì? Tại sao cần thiết?

## Question (EN)
What are generics in TypeScript? Why are they necessary?

## Đáp án chi tiết (VI)
Generics cho phép tạo components (functions, classes, interfaces) hoạt động với nhiều kiểu dữ liệu mà vẫn type-safe. Thay dùng `any`, dùng type parameter `\u003cT\u003e`.\
```typescript\
// Không generic — mất type info\
function identity(arg: any): any { return arg; }\
\
// Generic — type-safe\
function identity\u003cT\u003e(arg: T): T { return arg; }\
\
const n = identity(42);    // n: number\
const s = identity('hi');  // s: string\
\
// Generic interface\
interface ApiResponse\u003cT\u003e {\
  data: T;\
  status: number;\
  message: string;\
}\
\
const res: ApiResponse\u003cUser[]\u003e = await fetchUsers();\
```\
Tái sử dụng code mà không mất type information.

## Detailed Answer (EN)
Generics allow creating components (functions, classes, interfaces) that work with multiple types while remaining type-safe. Instead of using `any`, use a type parameter `\u003cT\u003e`.\
```typescript\
// Non-generic — loses type info\
function identity(arg: any): any { return arg; }\
\
// Generic — type-safe\
function identity\u003cT\u003e(arg: T): T { return arg; }\
\
const n = identity(42);    // n: number\
const s = identity('hi');  // s: string\
\
// Generic interface\
interface ApiResponse\u003cT\u003e {\
  data: T;\
  status: number;\
  message: string;\
}\
\
const res: ApiResponse\u003cUser[]\u003e = await fetchUsers();\
```\
Reuse code without losing type information.
