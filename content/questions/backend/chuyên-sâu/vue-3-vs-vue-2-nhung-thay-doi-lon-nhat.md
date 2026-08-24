---
id: vue-3-vs-vue-2-nhung-thay-doi-lon-nhat
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vue 3 vs Vue 2 — những thay đổi lớn nhất?

## Question (EN)
Vue 3 vs Vue 2 — biggest changes?

## Đáp án chi tiết (VI)
Vue 3 mang lại nhiều cải tiến căn bản về API và performance so với Vue 2. (1) Composition API + `\u003cscript setup\u003e` — thay thế Options API (vẫn supported) (2) Reactivity dùng Proxy thay Object.defineProperty — detect thêm/xóa property (3) Fragments, Teleport, Suspense — component mới (4) Multiple v-model trên component (5) `createApp()` thay `new Vue()` — tách instance tốt hơn (6) TypeScript support tốt hơn (7) Vue CLI (Webpack-based) bị deprecated; scaffolding hiện tại (`npm create vue@latest`) dùng Vite (8) Pinia thay Vuex (9) Bundle nhỏ hơn nhờ tree-shaking tốt hơn (10) v-if ưu tiên hơn v-for (ngược Vue 2).

## Detailed Answer (EN)
Vue 3 brings fundamental API and performance improvements over Vue 2. (1) Composition API + `\u003cscript setup\u003e` replacing Options API (still supported) (2) Reactivity uses Proxy instead of Object.defineProperty — detects property additions/deletions (3) Fragments, Teleport, Suspense — new components (4) Multiple v-models on components (5) `createApp()` replacing `new Vue()` — better instance isolation (6) Better TypeScript support (7) Vue CLI (Webpack-based) is deprecated; the current official scaffolding (`npm create vue@latest`) uses Vite (8) Pinia replacing Vuex (9) Smaller bundles via better tree-shaking (10) `v-if` now has higher priority than `v-for` (opposite of Vue 2).
