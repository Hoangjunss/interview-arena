---
id: provide-inject-la-gi-khi-nao-dung
position: backend
technology: composition-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`provide` / `inject` là gì? Khi nào dùng?

## Question (EN)
What are `provide` / `inject`? When to use?

## Đáp án chi tiết (VI)
`provide` / `inject` cho phép truyền data qua component tree mà không cần props drilling. Parent provide, bất kỳ descendant nào có thể inject:\
```javascript\
// Parent\
import { provide, ref } from 'vue'\
const theme = ref('dark')\
provide('theme', theme)\
\
// Child (bất kỳ cấp)\
import { inject } from 'vue'\
const theme = inject('theme', 'light') // 'light' là default\
```\
Dùng khi: (1) Shared state cho subtree (theme, locale, auth) (2) Plugin/library cung cấp context. Lưu ý: khó debug hơn props vì data flow không explicit — dùng Symbol key để tránh naming collision.

## Detailed Answer (EN)
`provide` / `inject` passes data through the component tree without prop drilling. Parent provides, any descendant can inject:\
```javascript\
// Parent\
import { provide, ref } from 'vue'\
const theme = ref('dark')\
provide('theme', theme)\
\
// Any child\
import { inject } from 'vue'\
const theme = inject('theme', 'light') // 'light' is default\
```\
Use when: (1) Shared state for a subtree (theme, locale, auth) (2) Plugin/library providing context. Pitfall: harder to debug than props since data flow is not explicit — use Symbol keys to avoid naming collisions.
