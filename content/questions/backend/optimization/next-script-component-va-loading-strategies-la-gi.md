---
id: next-script-component-va-loading-strategies-la-gi
position: backend
technology: optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
next/script component và loading strategies là gì?

## Question (EN)
What is the next/script component and what are its loading strategies?

## Đáp án chi tiết (VI)
next/script tối ưu loading third-party scripts. Strategies: `beforeInteractive` (trước hydration, cho critical scripts), `afterInteractive` (sau hydration, default), `lazyOnload` (idle time), `worker` (web worker với Partytown). Tránh dùng thẻ script thông thường trong App Router, dùng next/script thay thế.

## Detailed Answer (EN)
next/script optimizes third-party script loading. Strategies: `beforeInteractive` (before hydration, for critical scripts), `afterInteractive` (after hydration, the default), `lazyOnload` (during browser idle time), `worker` (offload to a web worker via Partytown). Avoid raw script tags in the App Router — use next/script instead.
