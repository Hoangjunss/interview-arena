---
id: v-once-va-v-pre-dung-khi-nao-de-skip-rendering
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`v-once` và `v-pre` — dùng khi nào để skip rendering?

## Question (EN)
`v-once` and `v-pre` — when to use them to skip rendering?

## Đáp án chi tiết (VI)
`v-once`: render element/component **một lần duy nhất** — skip future updates. Sau khi render, element được xử lý như static content:\
\
```vue\
\u003c!-- Static content không bao giờ thay đổi --\u003e\
\u003ch1 v-once\u003e{{ appName }}\u003c/h1\u003e\
\
\u003c!-- Expensive initial render, không bao giờ update --\u003e\
\u003cStaticBanner v-once :data=\\"bannerConfig\\" /\u003e\
\
\u003c!-- Kết hợp với v-for — freeze sau render đầu --\u003e\
\u003cdiv v-for=\\"item in list\\" :key=\\"item.id\\" v-once\u003e\
  {{ item.name }}\
\u003c/div\u003e\
```\
\
`v-pre`: **skip compilation** toàn bộ subtree — dùng cho content muốn hiển thị mustache syntax như raw text:\
\
```vue\
\u003c!-- Hiển thị '{{ this is NOT compiled }}' --\u003e\
\u003cspan v-pre\u003e{{ this is NOT compiled }}\u003c/span\u003e\
\
\u003c!-- Dùng trong docs/code display components --\u003e\
\u003ccode v-pre\u003econst x = ref(0)\u003c/code\u003e\
```\
\
**Khác nhau**: `v-once` render rồi freeze (tốt cho performance). `v-pre` skip compile entirely (tốt cho mustache syntax display).\
\
Lưu ý: `v-once` trong component vẫn chạy `setup()` và reactive setup — chỉ DOM update bị skip.

## Detailed Answer (EN)
`v-once`: render **once only** — skip future updates:\
```vue\
\u003ch1 v-once\u003e{{ appName }}\u003c/h1\u003e  \u003c!-- Never re-renders --\u003e\
\u003cStaticBanner v-once :data=\\"config\\" /\u003e\
```\
\
`v-pre`: **skip compilation** — display mustache syntax as raw text:\
```vue\
\u003c!-- Shows '{{ this is NOT compiled }}' literally --\u003e\
\u003cspan v-pre\u003e{{ this is NOT compiled }}\u003c/span\u003e\
```\
\
**Difference**: `v-once` renders then freezes (performance). `v-pre` skips compilation entirely (for displaying template syntax).\
\
Pitfall: `v-once` still runs `setup()` — only DOM updates are skipped.
