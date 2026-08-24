---
id: next-font-trong-next-js-hoat-dong-nhu-the-nao
position: backend
technology: optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
next/font trong Next.js hoạt động như thế nào?

## Question (EN)
How does next/font work in Next.js?

## Đáp án chi tiết (VI)
next/font tự động: download Google Fonts tại build time (không request runtime đến Google), host fonts trên cùng server, zero layout shift với automatic size adjustment, privacy tốt hơn. Dùng: `import { Inter } from 'next/font/google'; const inter = Inter({ subsets: ['latin'] })`. Apply qua className. Hỗ trợ local fonts qua next/font/local.

## Detailed Answer (EN)
next/font automatically: downloads Google Fonts at build time (no runtime requests to Google), self-hosts them on the same server, eliminates layout shift with automatic size adjustment, and improves privacy. Usage: `import { Inter } from 'next/font/google'; const inter = Inter({ subsets: ['latin'] })`. Apply via className. Local fonts are supported through next/font/local.
