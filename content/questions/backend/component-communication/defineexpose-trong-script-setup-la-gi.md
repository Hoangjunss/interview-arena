---
id: defineexpose-trong-script-setup-la-gi
position: backend
technology: component-communication
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`defineExpose` trong `\u003cscript setup\u003e` là gì?

## Question (EN)
What is `defineExpose` in `\u003cscript setup\u003e`?

## Đáp án chi tiết (VI)
Trong `\u003cscript setup\u003e`, component instance mặc định không expose properties ra ngoài (không access được qua template ref). `defineExpose` cho phép explicitly expose các methods/properties để parent gọi qua `ref`. \
\
**Ví dụ:** `defineExpose({ focus, reset })` — parent gọi `childRef.value.focus()`. Dùng khi cần imperative control (focus, scroll, reset form). Lưu ý: không expose quá nhiều — tránh biến component thành \\"god object\\

## Detailed Answer (EN)
In `\u003cscript setup\u003e`, component instances do not expose properties by default (not accessible via template ref). `defineExpose` explicitly exposes methods/properties for parent access via `ref`. \
\
**Example:** `defineExpose({ focus, reset })` — parent calls `childRef.value.focus()`. Use for imperative control (focus, scroll, form reset). Pitfall: do not over-expose — avoid turning components into \\"god objects\\"; prefer event-based communication.
