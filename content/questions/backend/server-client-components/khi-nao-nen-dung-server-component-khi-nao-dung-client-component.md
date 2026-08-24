---
id: khi-nao-nen-dung-server-component-khi-nao-dung-client-component
position: backend
technology: server-client-components
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng Server Component, khi nào dùng Client Component?

## Question (EN)
When should you use a Server Component vs a Client Component?

## Đáp án chi tiết (VI)
Server Component khi cần: data fetching, access backend resources, keep sensitive info (API keys), reduce client bundle. Client Component khi cần: onClick, onChange event handlers, useState/useEffect, browser APIs, real-time updates, custom hooks. Default là Server, chỉ dùng 'use client' khi thực sự cần interactivity.

## Detailed Answer (EN)
Use a Server Component when you need: data fetching, access to backend resources, keeping sensitive data (API keys) off the client, or reducing the client bundle. Use a Client Component when you need: onClick/onChange event handlers, useState/useEffect, browser APIs, real-time updates, or custom hooks. Default to Server; only add 'use client' when interactivity is truly required.
