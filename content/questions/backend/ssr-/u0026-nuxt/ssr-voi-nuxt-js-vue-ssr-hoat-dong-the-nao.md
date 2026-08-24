---
id: ssr-voi-nuxt-js-vue-ssr-hoat-dong-the-nao
position: backend
technology: ssr-\u0026-nuxt
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SSR với Nuxt.js — Vue SSR hoạt động thế nào?

## Question (EN)
SSR with Nuxt.js — how does Vue SSR work?

## Đáp án chi tiết (VI)
Nuxt.js là meta-framework cho Vue với SSR/SSG built-in. SSR flow: (1) Request đến server (2) Nuxt render Vue app thành HTML string (3) HTML được gửi cho client (4) Client hydration — Vue attach event listeners lên server-rendered HTML. \
\
**Lợi ích:** SEO tốt hơn, faster First Contentful Paint. Lưu ý: (1) `window`/`document` không có ở server — wrap trong `onMounted` hoặc check `import.meta.client` (Nuxt 3 idiom; `process.client` là Nuxt 2 legacy) (2) State mismatch giữa server và client gây hydration error (3) `onMounted` không chạy server-side.

## Detailed Answer (EN)
Nuxt.js is the meta-framework for Vue with built-in SSR/SSG. SSR flow: (1) Request hits server (2) Nuxt renders Vue app to HTML string (3) HTML sent to client (4) Client hydration — Vue attaches event listeners to server-rendered HTML. \
\
**Benefits:** better SEO, faster First Contentful Paint. Pitfall: (1) `window`/`document` unavailable on server — wrap in `onMounted` or check `import.meta.client` (Nuxt 3 idiomatic; `process.client` is Nuxt 2 legacy) (2) Server/client state mismatch causes hydration errors (3) `onMounted` does not run server-side.
