---
id: lifecycle-hooks-trong-composition-api
position: backend
technology: composition-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lifecycle hooks trong Composition API?

## Question (EN)
Lifecycle hooks in Composition API?

## Đáp án chi tiết (VI)
Trong `\u003cscript setup\u003e`, lifecycle hooks được import và dùng như functions:\
```javascript\
import { onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount } from 'vue'\
\
onMounted(() =\u003e { console.log('mounted') })\
onUnmounted(() =\u003e { /* cleanup */ })\
```\
Mapping từ Options API (bao gồm Vue 2 → Vue 3): `beforeCreate`/`created` → code trong `setup()` chạy thay thế, `mounted` → `onMounted`, `updated` → `onUpdated`, `beforeUpdate` → `onBeforeUpdate`, `unmounted` → `onUnmounted`, `beforeMount` → `onBeforeMount`. Vue 2: `beforeDestroy` → `onBeforeUnmount`, `destroyed` → `onUnmounted`. Lưu ý: `onMounted` trong SSR (Nuxt) không chạy server-side — dùng cho browser-only code.

## Detailed Answer (EN)
In `\u003cscript setup\u003e`, lifecycle hooks are imported and used as functions:\
```javascript\
import { onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount } from 'vue'\
\
onMounted(() =\u003e { console.log('mounted') })\
onUnmounted(() =\u003e { /* cleanup */ })\
```\
Mapping from Options API (including Vue 2 → Vue 3): `beforeCreate`/`created` → code in `setup()` runs instead. `mounted` → `onMounted`, `updated` → `onUpdated`, `beforeUpdate` → `onBeforeUpdate`, `unmounted` → `onUnmounted`, `beforeMount` → `onBeforeMount`. From Vue 2: `beforeDestroy` → `onBeforeUnmount`, `destroyed` → `onUnmounted`. Pitfall: `onMounted` in SSR (Nuxt) does not run server-side — use for browser-only code.
