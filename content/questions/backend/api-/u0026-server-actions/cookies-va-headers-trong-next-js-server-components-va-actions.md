---
id: cookies-va-headers-trong-next-js-server-components-va-actions
position: backend
technology: api-\u0026-server-actions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cookies và Headers trong Next.js Server Components và Actions?

## Question (EN)
How do you work with cookies and headers in Next.js Server Components and Actions?

## Đáp án chi tiết (VI)
Import từ next/headers, cả hai đều là async kể từ Next.js 15+: `const cookieStore = await cookies()` và `const headersList = await headers()`. Đọc cookie: `cookieStore.get('session')`, `cookieStore.set('session', value)`. Đọc header: `headersList.get('user-agent')`. Trong Server Components: read-only. Trong Server Actions và Route Handlers: có thể read và write.

## Detailed Answer (EN)
Import from next/headers. Both are async since Next.js 15+: `const cookieStore = await cookies()` and `const headersList = await headers()`. Read a cookie: `cookieStore.get('session')`. Set a cookie: `cookieStore.set('session', value)`. Read a header: `headersList.get('user-agent')`. In Server Components they are read-only. In Server Actions and Route Handlers you can both read and write.
