---
id: transition-va-transitiongroup-trong-vue
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transition và TransitionGroup trong Vue?

## Question (EN)
Transition and TransitionGroup in Vue?

## Đáp án chi tiết (VI)
`\u003cTransition\u003e` apply CSS classes khi element enter/leave:\
```vue\
\u003cTransition name=\\"fade\\"\u003e\
  \u003cp v-if=\\"show\\"\u003eHello\u003c/p\u003e\
\u003c/Transition\u003e\
```\
```css\
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }\
.fade-enter-from, .fade-leave-to { opacity: 0; }\
```\
`\u003cTransitionGroup\u003e` cho list animations — thêm `move` class:\
```vue\
\u003cTransitionGroup name=\\"list\\" tag=\\"ul\\"\u003e\
  \u003cli v-for=\\"item in items\\" :key=\\"item.id\\"\u003e{{ item.name }}\u003c/li\u003e\
\u003c/TransitionGroup\u003e\
```\
Modes: `mode=\\"out-in\\"` (old leaves trước, new enters sau) — tránh flickering khi swap components.

## Detailed Answer (EN)
`\u003cTransition\u003e` applies CSS classes when elements enter/leave:\
```vue\
\u003cTransition name=\\"fade\\"\u003e\
  \u003cp v-if=\\"show\\"\u003eHello\u003c/p\u003e\
\u003c/Transition\u003e\
```\
```css\
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }\
.fade-enter-from, .fade-leave-to { opacity: 0; }\
```\
`\u003cTransitionGroup\u003e` for list animations — adds `move` class:\
```vue\
\u003cTransitionGroup name=\\"list\\" tag=\\"ul\\"\u003e\
  \u003cli v-for=\\"item in items\\" :key=\\"item.id\\"\u003e{{ item.name }}\u003c/li\u003e\
\u003c/TransitionGroup\u003e\
```\
Modes: `mode=\\"out-in\\"` (old leaves first, new enters after) — prevents flickering when swapping components.
