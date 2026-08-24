---
id: readonly-t-va-readonlyarray-t-la-gi
position: backend
technology: utility-types
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Readonly\u003cT\u003e` và `ReadonlyArray\u003cT\u003e` là gì?

## Question (EN)
What are `Readonly\u003cT\u003e` and `ReadonlyArray\u003cT\u003e`?

## Đáp án chi tiết (VI)
`Readonly\u003cT\u003e` làm tất cả properties của T thành readonly (shallow). `ReadonlyArray\u003cT\u003e` là array không thể modify (push, pop, sort không available). Dùng với as const, Redux state, functional programming.\
\
```typescript\
const nums: ReadonlyArray\u003cnumber\u003e = [1, 2, 3];\
nums.push(4);    // Error! Property 'push' does not exist\
nums[0] = 99;   // Error! Index signature is readonly\
\
const state: Readonly\u003c{ count: number }\u003e = { count: 0 };\
state.count = 1; // Error!\
```\
\
Deep readonly cần custom type: `DeepReadonly\u003cT\u003e` với recursive mapped type.

## Detailed Answer (EN)
`Readonly\u003cT\u003e` makes all properties of T readonly (shallow). `ReadonlyArray\u003cT\u003e` is an array that cannot be modified (push, pop, sort are unavailable). Used with as const, Redux state, and functional programming.\
\
```typescript\
const nums: ReadonlyArray\u003cnumber\u003e = [1, 2, 3];\
nums.push(4);    // Error! Property 'push' does not exist\
nums[0] = 99;   // Error! Index signature is readonly\
\
const state: Readonly\u003c{ count: number }\u003e = { count: 0 };\
state.count = 1; // Error!\
```\
\
Deep readonly requires a custom type: `DeepReadonly\u003cT\u003e` using a recursive mapped type.
