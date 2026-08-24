---
id: toref-torefs-tovalue-dung-khi-nao
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`toRef`, `toRefs`, `toValue` — dùng khi nào?

## Question (EN)
`toRef`, `toRefs`, `toValue` — when to use?

## Đáp án chi tiết (VI)
`toRef`: tạo ref từ một property của reactive object — giữ reactive connection:\
```javascript\
const state = reactive({ count: 0, name: 'Vue' })\
const countRef = toRef(state, 'count') // linked to state.count\
```\
`toRefs`: convert toàn bộ reactive object thành object of refs — dùng khi destructure:\
```javascript\
const { count, name } = toRefs(state)\
```\
`toValue` (Vue 3.3+): unwrap ref hoặc getter — dùng trong composables để accept cả ref và plain value:\
```javascript\
function useFeature(id: MaybeRefOrGetter\u003cstring\u003e) {\
  const resolvedId = toValue(id) // unwrap nếu là ref\
}\
```

## Detailed Answer (EN)
`toRef`: creates a ref from a property of a reactive object — maintains reactive connection:\
```javascript\
const state = reactive({ count: 0, name: 'Vue' })\
const countRef = toRef(state, 'count') // linked to state.count\
```\
`toRefs`: converts the entire reactive object into an object of refs — use when destructuring:\
```javascript\
const { count, name } = toRefs(state)\
```\
`toValue` (Vue 3.3+): unwraps a ref or getter — use in composables to accept both ref and plain values:\
```javascript\
function useFeature(id: MaybeRefOrGetter\u003cstring\u003e) {\
  const resolvedId = toValue(id) // unwraps if ref\
}\
```
