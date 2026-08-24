---
id: third-party-libraries-va-server-components-co-van-de-gi
position: backend
technology: server-client-components
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Third-party libraries và Server Components có vấn đề gì?

## Question (EN)
What issues can arise with third-party libraries and Server Components?

## Đáp án chi tiết (VI)
Nhiều npm packages cũ dùng browser APIs hay React client features mà không có 'use client'. Giải pháp: tạo wrapper Client Component import library đó, thêm 'use client' ở wrapper. Next.js có boundary tự động cho packages với 'use client' trong package.json exports. Kiểm tra compatibility trước khi dùng library mới.

## Detailed Answer (EN)
Many older npm packages use browser APIs or React client features without including a 'use client' directive. \
\
**Solution:** create a wrapper Client Component that imports the library and add 'use client' to the wrapper. Next.js automatically handles packages that declare 'use client' in their package.json exports. Always check library compatibility before adding a new dependency.
