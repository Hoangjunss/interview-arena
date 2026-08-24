---
id: cach-dung-de-fetch-data-va-xu-ly-race-conditions-trong-useeffect
position: backend
technology: usestate-\u0026-useeffect
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách đúng để fetch data và xử lý race conditions trong useEffect?

## Question (EN)
What is the correct way to fetch data and handle race conditions in useEffect?

## Đáp án chi tiết (VI)
Dùng AbortController để cancel fetch request cũ khi effect re-run: `const controller = new AbortController(); fetch(url, { signal: controller.signal }); return () =\u003e controller.abort()`. Hoặc dùng boolean flag `let cancelled = false` trong cleanup. React Query và SWR tự động handle race conditions.

## Detailed Answer (EN)
Use AbortController to cancel the previous request when the effect re-runs: `const controller = new AbortController(); fetch(url, { signal: controller.signal }); return () =\u003e controller.abort()`. Alternatively, use a boolean cancelled flag and check it in the cleanup. React Query and SWR handle race conditions automatically and are the recommended choice for production apps.
