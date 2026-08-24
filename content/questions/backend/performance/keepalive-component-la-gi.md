---
id: keepalive-component-la-gi
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
KeepAlive component là gì?

## Question (EN)
What is the KeepAlive component?

## Đáp án chi tiết (VI)
`\u003cKeepAlive\u003e` cache component instance khi unmount — state được giữ nguyên khi switch lại:\
```vue\
\u003cKeepAlive :include=\\"['FormStep1', 'FormStep2']\\" :max=\\"5\\"\u003e\
  \u003ccomponent :is=\\"currentTab\\" /\u003e\
\u003c/KeepAlive\u003e\
```\
Lifecycle hooks cho cached components: `onActivated` (khi cache hit, component show lại), `onDeactivated` (khi bị hide, không unmount). Dùng cho: tab views, multi-step forms, expensive components cần giữ state. Lưu ý: cached components vẫn chiếm bộ nhớ — dùng `:max` để limit, tránh cache tất cả.

## Detailed Answer (EN)
`\u003cKeepAlive\u003e` caches component instances when unmounted — state is preserved when switching back:\
```vue\
\u003cKeepAlive :include=\\"['FormStep1', 'FormStep2']\\" :max=\\"5\\"\u003e\
  \u003ccomponent :is=\\"currentTab\\" /\u003e\
\u003c/KeepAlive\u003e\
```\
Lifecycle hooks for cached components: `onActivated` (on cache hit, component shown again), `onDeactivated` (when hidden, not unmounted). Use for: tab views, multi-step forms, expensive components needing state preservation. Pitfall: cached components still consume memory — use `:max` to limit, avoid caching everything.
