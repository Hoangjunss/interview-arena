---
id: output-export-trong-next-js-lam-gi-va-nhung-tinh-nang-nao-khong-dung-duoc-khi-st
position: backend
technology: static-export
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`output: 'export'` trong Next.js làm gì, và những tính năng nào KHÔNG dùng được khi static export?

## Question (EN)
What does `output: 'export'` do in Next.js, and which features are NOT available with static export?

## Đáp án chi tiết (VI)
`output: 'export'` build app thành **HTML/CSS/JS tĩnh thuần** trong thư mục `out/`, deploy được lên bất kỳ static host nào (S3, GitHub Pages, Nginx) — không cần Node server.\
\
```js\
// next.config.js\
module.exports = { output: 'export' }\
```\
\
**Hình dung:** giống xuất một website ra file rồi bê đặt lên ổ đĩa — không còn server chạy logic.\
\
**Vì không có server runtime, những thứ sau KHÔNG dùng được:**\
- **Server-side rendering động** / `cookies()`, `headers()`, `dynamic = 'force-dynamic'`.\
- **Route Handlers** chạy server (API routes) và **Server Actions**.\
- **ISR / on-demand revalidation** — không có server để re-generate.\
- **Middleware**, **rewrites/redirects** động, **`next/image`** với loader mặc định (phải dùng `unoptimized` hoặc loader ngoài).\
- **Dynamic routes** phải khai báo trước qua `generateStaticParams`.\
\
**Khi nào dùng:** site nội dung tĩnh, docs, landing — mọi data biết trước lúc build.

## Detailed Answer (EN)
`output: 'export'` builds the app into **pure static HTML/CSS/JS** in an `out/` folder, deployable to any static host (S3, GitHub Pages, Nginx) — no Node server needed.\
\
```js\
// next.config.js\
module.exports = { output: 'export' }\
```\
\
**Picture it:** like exporting a website to files and dropping them on a drive — no server runs logic anymore.\
\
**Because there's no server runtime, these are NOT available:**\
- **Dynamic SSR** / `cookies()`, `headers()`, `dynamic = 'force-dynamic'`.\
- **Route Handlers** that run on the server (API routes) and **Server Actions**.\
- **ISR / on-demand revalidation** — no server to re-generate.\
- **Middleware**, dynamic **rewrites/redirects**, and **`next/image`** with the default loader (must use `unoptimized` or a custom loader).\
- **Dynamic routes** must be pre-declared via `generateStaticParams`.\
\
**When to use:** static-content sites, docs, landing pages — all data known at build time.
