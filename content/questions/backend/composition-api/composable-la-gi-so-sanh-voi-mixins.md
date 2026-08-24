---
id: composable-la-gi-so-sanh-voi-mixins
position: backend
technology: composition-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Composable là gì? So sánh với Mixins?

## Question (EN)
What is a Composable? Compare with Mixins.

## Đáp án chi tiết (VI)
Composable là function dùng Composition API để đóng gói và tái sử dụng stateful logic. \
\
**Ví dụ:**\
```javascript\
// useFetch.js\
export function useFetch(url) {\
  const data = ref(null)\
  const loading = ref(true)\
  fetch(url).then(r =\u003e r.json()).then(d =\u003e { data.value = d; loading.value = false })\
  return { data, loading }\
}\
```\
So với Mixins: (1) Không có naming collision — return value rõ ràng (2) Source rõ ràng — biết data từ đâu (3) Có thể nhận arguments (dynamic) (4) Không có implicit state sharing. Mixins vẫn được hỗ trợ trong Vue 3 nhưng bị discouraged — Composition API là alternative được khuyến nghị.

## Detailed Answer (EN)
A composable is a function using Composition API to encapsulate and reuse stateful logic. \
\
**Example:**\
```javascript\
// useFetch.js\
export function useFetch(url) {\
  const data = ref(null)\
  const loading = ref(true)\
  fetch(url).then(r =\u003e r.json()).then(d =\u003e { data.value = d; loading.value = false })\
  return { data, loading }\
}\
```\
Vs Mixins: (1) No naming collisions — explicit return values (2) Clear source — know where data comes from (3) Can accept arguments (dynamic) (4) No implicit state sharing. Mixins are still supported in Vue 3 but discouraged — Composition API is the recommended alternative.
