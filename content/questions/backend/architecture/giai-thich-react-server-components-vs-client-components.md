---
id: giai-thich-react-server-components-vs-client-components
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích React Server Components vs Client Components?

## Question (EN)
Explain React Server Components vs Client Components.

## Đáp án chi tiết (VI)
Server Components render trên server, gửi HTML + data (giảm client JS bundle đáng kể), có thể truy cập DB trực tiếp.\
\
Client Components render trên browser, có interactivity (hooks, events). Mặc định là Server trong Next.js App Router — thêm `'use client'` cho interactivity.

## Detailed Answer (EN)
Server Components render on the server and send HTML + data to the client (no JavaScript bundle). They reduce client bundle size and can directly access databases. Client Components render in the browser and support interactivity (hooks, event handlers). In the Next.js App Router, components are Server by default — add `'use client'` at the top for any component needing interactivity.
