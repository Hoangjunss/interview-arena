---
id: teleport-component-la-gi-use-case
position: backend
technology: performance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Teleport component là gì? Use case?

## Question (EN)
What is the Teleport component? Use cases?

## Đáp án chi tiết (VI)
`\u003cTeleport\u003e` render content vào một DOM node nằm ngoài component tree — nhưng vẫn là con về mặt logic (data flow, events hoạt động bình thường):\
```vue\
\u003cTeleport to=\\"body\\"\u003e\
  \u003cdiv class=\\"modal-overlay\\" v-if=\\"showModal\\"\u003e\
    \u003cdiv class=\\"modal\\"\u003e...\u003c/div\u003e\
  \u003c/div\u003e\
\u003c/Teleport\u003e\
```\
Use cases: (1) Modals, drawers, tooltips — tránh z-index/overflow issues (2) Notifications/toasts — render ở root level (3) Bất kỳ UI cần break khỏi parent overflow/stacking context. Lưu ý: Teleport content vẫn share reactive state với parent component — props, emits, provide/inject hoạt động bình thường.

## Detailed Answer (EN)
`\u003cTeleport\u003e` renders content into a DOM node outside the component tree — while remaining a logical child (data flow, events work normally):\
```vue\
\u003cTeleport to=\\"body\\"\u003e\
  \u003cdiv class=\\"modal-overlay\\" v-if=\\"showModal\\"\u003e\
    \u003cdiv class=\\"modal\\"\u003e...\u003c/div\u003e\
  \u003c/div\u003e\
\u003c/Teleport\u003e\
```\
Use cases: (1) Modals, drawers, tooltips — avoids z-index/overflow issues (2) Notifications/toasts — rendered at root level (3) Any UI needing to break out of parent overflow/stacking context. Pitfall: Teleport content still shares reactive state with the parent component — props, emits, provide/inject work normally.
