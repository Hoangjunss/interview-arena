---
id: metadata-api-trong-next-js-app-router-hoat-dong-nhu-the-nao
position: backend
technology: next.js-seo
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Metadata API trong Next.js App Router hoạt động như thế nào?

## Question (EN)
How does the Metadata API work in Next.js App Router?

## Đáp án chi tiết (VI)
Next.js App Router Metadata API thay thế hoàn toàn react-helmet — type-safe, server-rendered, cascade từ layout xuống page.\
\
2 cách dùng: (1) **Static metadata**: export `const metadata: Metadata = { title: '...', description: '...' }` từ layout.tsx hoặc page.tsx. (2) **Dynamic metadata**: export `async function generateMetadata({ params }) { ... return { title, description } }` — fetch data rồi generate meta tags.\
\
Metadata cascade: layout metadata → page metadata (page override layout). Tính năng: `title.template` (pattern cho child pages, ví dụ '%s | MyApp'), `openGraph`, `twitter`, `robots`, `alternates` (canonical, hreflang), `icons` (favicon), `verification` (Google Search Console).\
\
Next.js tự động generate `\u003ctitle\u003e`, `\u003cmeta\u003e`, OG tags, Twitter cards, canonical URL từ metadata object — không cần thư viện bên ngoài.

## Detailed Answer (EN)
Next.js App Router Metadata API fully replaces react-helmet — type-safe, server-rendered, cascades from layout down to page.\
\
Two approaches: (1) **Static metadata**: export `const metadata: Metadata = { title: '...', description: '...' }` from layout.tsx or page.tsx. (2) **Dynamic metadata**: export `async function generateMetadata({ params }) { ... return { title, description } }` — fetch data and generate meta tags dynamically.\
\
Metadata cascade: layout metadata → page metadata (page-level overrides layout). Features: `title.template` (pattern for child pages, e.g., '%s | MyApp'), `openGraph`, `twitter`, `robots`, `alternates` (canonical, hreflang), `icons` (favicon), `verification` (Google Search Console).\
\
Next.js automatically generates `\u003ctitle\u003e`, `\u003cmeta\u003e`, OG tags, Twitter cards, and canonical URLs from the metadata object — no external library needed.
