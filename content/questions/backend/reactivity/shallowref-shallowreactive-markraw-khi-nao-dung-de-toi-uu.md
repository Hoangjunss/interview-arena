---
id: shallowref-shallowreactive-markraw-khi-nao-dung-de-toi-uu
position: backend
technology: reactivity
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`shallowRef`, `shallowReactive`, `markRaw` — khi nào dùng để tối ưu?

## Question (EN)
`shallowRef`, `shallowReactive`, `markRaw` — when to use for optimization?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
Deep reactivity has overhead — Vue tracks all nested properties. These APIs opt out:\
\
**`shallowRef`**: only tracks `.value` changes, no deep tracking:\
```typescript\
const bigData = shallowRef({ /* 1000 props */ })\
bigData.value = newData     // Triggers update\
bigData.value.name = 'new' // Does NOT trigger\
```\
\
**`shallowReactive`**: only top-level properties tracked:\
```typescript\
const state = shallowReactive({ user: { name: 'Alice' } })\
state.user = newUser      // Triggers\
state.user.name = 'Bob'   // Does NOT trigger\
```\
\
**`markRaw`**: never make reactive — for third-party instances:\
```typescript\
const chart = markRaw(new Chart(canvas, config))\
const state = reactive({ chart })  // chart not Proxy-wrapped\
```\
\
Use for: large non-nested data, third-party class instances (Chart.js, Mapbox), performance-critical lists.
