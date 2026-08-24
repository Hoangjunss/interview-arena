---
id: defineprops-va-defineemits-trong-script-setup
position: backend
technology: composition-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`defineProps` và `defineEmits` trong `\u003cscript setup\u003e`?

## Question (EN)
`defineProps` and `defineEmits` in `\u003cscript setup\u003e`?

## Đáp án chi tiết (VI)
`defineProps` khai báo props mà component nhận, `defineEmits` khai báo events mà component emit:\
```javascript\
// TypeScript style (recommended)\
const props = defineProps\u003c{\
  title: string\
  count?: number\
}\u003e()\
\
const emit = defineEmits\u003c{\
  (e: 'update', value: number): void\
  (e: 'close'): void\
}\u003e()\
\
// Sử dụng\
emit('update', 42)\
```\
Lưu ý: `defineProps` không thể destructure trực tiếp mà giữ reactivity trong Vue 3.4 trở về trước — dùng `toRefs(props)`. Từ Vue 3.5+: destructure props với `const { title } = defineProps()` giữ reactivity.

## Detailed Answer (EN)
`defineProps` declares the props a component receives; `defineEmits` declares events it can emit:\
```javascript\
// TypeScript style (recommended)\
const props = defineProps\u003c{\
  title: string\
  count?: number\
}\u003e()\
\
const emit = defineEmits\u003c{\
  (e: 'update', value: number): void\
  (e: 'close'): void\
}\u003e()\
\
// Usage\
emit('update', 42)\
```\
Pitfall: In Vue ≤ 3.4, destructuring `defineProps` loses reactivity — use `toRefs(props)`. From Vue 3.5+: destructuring props with `const { title } = defineProps()` preserves reactivity.
