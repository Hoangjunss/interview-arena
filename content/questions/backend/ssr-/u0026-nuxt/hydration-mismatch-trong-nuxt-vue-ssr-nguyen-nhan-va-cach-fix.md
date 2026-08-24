---
id: hydration-mismatch-trong-nuxt-vue-ssr-nguyen-nhan-va-cach-fix
position: backend
technology: ssr-\u0026-nuxt
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hydration mismatch trong Nuxt/Vue SSR — nguyên nhân và cách fix?

## Question (EN)
Hydration mismatch in Nuxt/Vue SSR — causes and fixes?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
Hydration mismatch occurs when server-rendered HTML differs from what Vue client tries to render.\
\
**Common causes**:\
1. Browser-only APIs in setup: `localStorage`, `window`, `document` don't exist on server\
2. Random/Date values: `Math.random()`, `Date.now()` return different values\
3. User agent/cookie-based conditionals\
\
**Fixes**:\
```typescript\
// 1. \u003cClientOnly\u003e wrapper in Nuxt (Vue/Nuxt has no suppressHydrationWarning — that's React)\
\u003cClientOnly fallback-tag=\\"span\\"\u003e\
  \u003cComponentThatUsesWindow /\u003e\
\u003c/ClientOnly\u003e\
\
// 2. import.meta.client (Nuxt 3 idiomatic; process.client is Nuxt 2 legacy)\
const val = ref(import.meta.client ? localStorage.getItem('key') : null)\
\
// 3. onMounted for browser-only code\
onMounted(() =\u003e {\
  state.value = localStorage.getItem('key')\
})\
```
