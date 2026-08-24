---
id: custom-directives-trong-vue-3
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom directives trong Vue 3?

## Question (EN)
Custom directives in Vue 3?

## Đáp án chi tiết (VI)
Custom directive cho phép reuse DOM manipulation logic. Trong `\u003cscript setup\u003e`:\
```javascript\
// vFocus — auto-focus element khi mount\
const vFocus = {\
  mounted: (el) =\u003e el.focus()\
}\
\
// vTooltip với value\
const vTooltip = {\
  mounted(el, binding) {\
    el.title = binding.value\
    el.style.cursor = 'help'\
  },\
  updated(el, binding) {\
    el.title = binding.value\
  }\
}\
```\
```vue\
\u003cinput v-focus /\u003e\
\u003cspan v-tooltip=\\"'Hover me'\\"\u003e?\u003c/span\u003e\
```\
Directive hooks: `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeUnmount`, `unmounted`.

## Detailed Answer (EN)
Custom directives allow reusing DOM manipulation logic. In `\u003cscript setup\u003e`:\
```javascript\
// vFocus — auto-focus element on mount\
const vFocus = {\
  mounted: (el) =\u003e el.focus()\
}\
\
// vTooltip with value\
const vTooltip = {\
  mounted(el, binding) {\
    el.title = binding.value\
    el.style.cursor = 'help'\
  },\
  updated(el, binding) {\
    el.title = binding.value\
  }\
}\
```\
```vue\
\u003cinput v-focus /\u003e\
\u003cspan v-tooltip=\\"'Hover me'\\"\u003e?\u003c/span\u003e\
```\
Directive hooks: `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeUnmount`, `unmounted`.
