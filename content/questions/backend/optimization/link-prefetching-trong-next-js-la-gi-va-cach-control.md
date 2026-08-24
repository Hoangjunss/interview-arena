---
id: link-prefetching-trong-next-js-la-gi-va-cach-control
position: backend
technology: optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Link prefetching trong Next.js là gì và cách control?

## Question (EN)
What is Link prefetching in Next.js and how do you control it?

## Đáp án chi tiết (VI)
Next.js tự động prefetch routes khi Link component vào viewport (production). Tải JS chunk và data cho route đó trước khi user click, tạo instant navigation. Disable: `\u003cLink prefetch={false}\u003e`. App Router prefetch RSC payload. Control cụ thể: prefetch attribute hoặc router.prefetch(). Giúp navigation cảm giác instantaneous.

## Detailed Answer (EN)
Next.js automatically prefetches routes when a Link component enters the viewport in production — loading the JS chunk and data before the user clicks, making navigation feel instant. Disable it with `\u003cLink prefetch={false}\u003e`. The App Router prefetches the RSC payload. For finer control use the prefetch attribute or `router.prefetch()`.
