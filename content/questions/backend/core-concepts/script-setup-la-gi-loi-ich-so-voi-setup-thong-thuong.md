---
id: script-setup-la-gi-loi-ich-so-voi-setup-thong-thuong
position: backend
technology: core-concepts
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`\u003cscript setup\u003e` là gì? Lợi ích so với `setup()` thông thường?

## Question (EN)
What is `\u003cscript setup\u003e`? Benefits over regular `setup()`?

## Đáp án chi tiết (VI)
`\u003cscript setup\u003e` là syntactic sugar cho Composition API — tất cả code bên trong tự động expose ra template mà không cần `return`. (1) Gọn hơn: không cần `export default`, không cần `return` (2) Hiệu năng tốt hơn: compiler tối ưu hóa tốt hơn (3) TypeScript integration tốt hơn (4) `defineProps`, `defineEmits`, `defineExpose` thay cho options props/emits. Lưu ý: biến và function trong `\u003cscript setup\u003e` khác file KHÔNG cần export — tự exposed.

## Detailed Answer (EN)
`\u003cscript setup\u003e` is syntactic sugar for Composition API — all top-level bindings are automatically exposed to the template without needing `return`. (1) Less boilerplate: no `export default`, no `return` (2) Better performance: compiler optimizations (3) Better TypeScript integration (4) `defineProps`, `defineEmits`, `defineExpose` replace option-based equivalents. Pitfall: unlike regular `setup()`, there is no `return` — everything is auto-exposed.
