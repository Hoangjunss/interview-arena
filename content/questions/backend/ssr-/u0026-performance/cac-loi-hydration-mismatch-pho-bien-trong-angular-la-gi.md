---
id: cac-loi-hydration-mismatch-pho-bien-trong-angular-la-gi
position: backend
technology: ssr-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các lỗi hydration mismatch phổ biến trong Angular là gì?

## Question (EN)
What are common hydration mismatch issues in Angular?

## Đáp án chi tiết (VI)
Các lỗi phổ biến: render dựa vào `Date.now()`/random, đọc `window` hoặc `localStorage` khi server render, format ngày theo timezone khác nhau, mutate DOM bằng library ngoài Angular trước hydration, hoặc API trả data khác giữa server và client.\
\
Guard browser-only code:\
```typescript\
const platformId = inject(PLATFORM_ID)\
if (isPlatformBrowser(platformId)) {\
  localStorage.setItem(\\"seen\\

## Detailed Answer (EN)
Common issues include rendering from `Date.now()`/random values, reading `window` or `localStorage` during server rendering, formatting dates in different time zones, mutating DOM with non-Angular libraries before hydration, or getting different API data on server and client.\
\
Guard browser-only code:\
```typescript\
const platformId = inject(PLATFORM_ID)\
if (isPlatformBrowser(platformId)) {\
  localStorage.setItem(\\"seen\\
