---
id: generatestaticparams-trong-next-js-app-router-dung-de-lam-gi
position: backend
technology: app-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
generateStaticParams trong Next.js App Router dùng để làm gì?

## Question (EN)
What is generateStaticParams used for in the Next.js App Router?

## Đáp án chi tiết (VI)
generateStaticParams export từ dynamic route page để pre-generate static paths tại build time, tương đương getStaticPaths trong Pages Router. `export async function generateStaticParams() { return posts.map(p =\u003e ({ slug: p.slug })) }`. Kết hợp với Static Generation để tạo static pages cho mọi possible value.

## Detailed Answer (EN)
generateStaticParams is exported from a dynamic route page to pre-generate static paths at build time, equivalent to getStaticPaths in the Pages Router. `export async function generateStaticParams() { return posts.map(p =\u003e ({ slug: p.slug })) }`. Combined with Static Generation, it creates static pages for every possible parameter value.
