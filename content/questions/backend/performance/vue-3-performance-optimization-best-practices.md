---
id: vue-3-performance-optimization-best-practices
position: backend
technology: performance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vue 3 performance optimization best practices?

## Question (EN)
Vue 3 performance optimization best practices?

## Đáp án chi tiết (VI)
Vue 3 performance tập trung vào giảm unnecessary reactivity và re-renders qua directives, component patterns, và build tooling. (1) `v-memo` cho long lists với expensive renders (2) `shallowRef`/`shallowReactive` cho large data structures không cần deep reactivity (3) Lazy load routes và components với dynamic import (4) `\u003cKeepAlive\u003e` cho frequently toggled components (5) Dùng `computed` thay `methods` để cache kết quả (6) Tránh unnecessary watchers — prefer computed (7) `v-once` cho content không thay đổi (8) Tránh inline handlers phức tạp trong template (9) Tree-shaking — import chỉ những gì cần từ Vue (10) Analyze bundle với `rollup-plugin-visualizer`.

## Detailed Answer (EN)
(1) `v-memo` for long lists with expensive renders (2) `shallowRef`/`shallowReactive` for large data structures without need for deep reactivity (3) Lazy-load routes and components with dynamic import (4) `\u003cKeepAlive\u003e` for frequently toggled components (5) Use `computed` instead of `methods` to cache results (6) Avoid unnecessary watchers — prefer computed (7) `v-once` for content that never changes (8) Avoid complex inline handlers in templates (9) Tree-shaking — import only what you need from Vue (10) Analyze bundles with `rollup-plugin-visualizer`.
