---
id: storetorefs-la-gi-tai-sao-can
position: backend
technology: pinia
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`storeToRefs` là gì? Tại sao cần?

## Question (EN)
What is `storeToRefs`? Why is it needed?

## Đáp án chi tiết (VI)
Pinia store là reactive object — destructuring trực tiếp sẽ mất reactivity (tương tự `reactive()`). `storeToRefs()` convert state và getters thành refs để destructure an toàn: `const { count, name } = storeToRefs(store)`. Methods (actions) không cần `storeToRefs` — destructure thường: `const { increment } = store`. Lưu ý: nếu dùng `storeToRefs` với methods, chúng trở thành refs — không gọi được như function.

## Detailed Answer (EN)
A Pinia store is a reactive object — direct destructuring loses reactivity (same as `reactive()`). `storeToRefs()` converts state and getters into refs for safe destructuring: `const { count, name } = storeToRefs(store)`. Actions (methods) do not need `storeToRefs` — destructure normally: `const { increment } = store`. Pitfall: if `storeToRefs` is applied to actions, they become refs and cannot be called as functions.
