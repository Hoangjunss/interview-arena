---
id: nuxt-3-data-fetching-usefetch-vs-useasyncdata-vs-fetch
position: backend
technology: ssr-\u0026-nuxt
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nuxt 3 data fetching — useFetch vs useAsyncData vs $fetch?

## Question (EN)
Nuxt 3 data fetching — useFetch vs useAsyncData vs $fetch?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
**`useFetch`**: convenience wrapper — auto-deduplicates, cache key from URL:\
```typescript\
const { data, pending, error, refresh } = await useFetch('/api/users', {\
  lazy: false,\
  transform: (d) =\u003e d.users,\
})\
```\
\
**`useAsyncData`**: flexible for custom async logic with multiple requests:\
```typescript\
const { data } = await useAsyncData('key', async () =\u003e {\
  const [users, posts] = await Promise.all([$fetch('/api/users'), $fetch('/api/posts')])\
  return { users, posts }\
})\
```\
\
**`$fetch`**: raw ofetch — no auto-caching:\
```typescript\
async function submit() {\
  const result = await $fetch('/api/users', { method: 'POST', body: form.value })\
}\
```\
\
**Rule**: navigation data → `useFetch`/`useAsyncData`. User actions → `$fetch`.
