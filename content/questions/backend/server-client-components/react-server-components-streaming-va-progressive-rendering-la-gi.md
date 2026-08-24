---
id: react-server-components-streaming-va-progressive-rendering-la-gi
position: backend
technology: server-client-components
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Server Components streaming và progressive rendering là gì?

## Question (EN)
What is streaming and progressive rendering with React Server Components?

## Đáp án chi tiết (VI)
Next.js stream HTML theo từng phần thay vì đợi toàn page ready. Server components có thể wrap trong Suspense, phần xung quanh stream trước, khi data ready phần trong Suspense stream tiếp. User thấy content nhanh hơn. TTFB tốt hơn. Cần design components để render độc lập và không block lẫn nhau.

## Detailed Answer (EN)
Next.js streams HTML in chunks rather than waiting for the full page to be ready. Server components wrapped in Suspense allow the surrounding content to stream first; when data is ready, the Suspense content streams next. Users see content faster and TTFB improves. Design components to render independently so they do not block each other.
