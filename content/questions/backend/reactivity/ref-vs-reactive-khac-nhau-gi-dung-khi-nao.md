---
id: ref-vs-reactive-khac-nhau-gi-dung-khi-nao
position: backend
technology: reactivity
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ref` vs `reactive` — khác nhau gì? Dùng khi nào?

## Question (EN)
`ref` vs `reactive` — what's the difference? When to use each?

## Đáp án chi tiết (VI)
`ref`: wrap bất kỳ giá trị nào (primitives, objects) thành reactive container — truy cập qua `.value` trong script, tự unwrap trong template.\
`reactive`: wrap object/array thành reactive Proxy — truy cập trực tiếp, không cần `.value`.\
\
**Khuyến nghị hiện tại (Vue 3.2+):** Dùng `ref` cho tất cả — kể cả objects. Vue core team đã cập nhật docs ưu tiên `ref` universally vì `reactive` có nhiều bẫy: mất reactivity khi destructure, mất reactivity khi re-assign cả object. `reactive` chỉ nên dùng khi cần nhóm nhiều state liên quan.\
Lưu ý: destructure từ `reactive` sẽ mất reactivity — dùng `toRefs()`:\
```javascript\
const state = reactive({ count: 0, name: 'Vue' })\
const { count, name } = toRefs(state) // giữ reactivity\
```

## Detailed Answer (EN)
`ref`: wraps any value (primitives or objects) into a reactive container — accessed via `.value` in script, auto-unwrapped in template.\
`reactive`: wraps objects/arrays into a reactive Proxy — accessed directly, no `.value` needed.\
\
**Current recommendation (Vue 3.2+):** Prefer `ref` for everything — including objects. The Vue core team updated docs to favor `ref` universally because `reactive` has gotchas: loses reactivity on destructure, loses reactivity on whole-object re-assignment. Only use `reactive` to group closely related state.\
Pitfall: destructuring from `reactive` loses reactivity — use `toRefs()`:\
```javascript\
const state = reactive({ count: 0, name: 'Vue' })\
const { count, name } = toRefs(state) // preserves reactivity\
```
