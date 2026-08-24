---
id: ssr-ssg-content-khac-client-side-hydration-mismatch
position: backend
technology: debug-\u0026-scenario
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SSR/SSG content khác client-side, hydration mismatch?

## Question (EN)
SSR/SSG content differs from the client side — what causes a hydration mismatch?

## Đáp án chi tiết (VI)
Hydration mismatch xảy ra khi HTML render từ server khác với kết quả render lần đầu trên client, khiến React báo warning và có thể gây lỗi UI. Nguyên nhân phổ biến nhất là dùng browser-only APIs như window hay localStorage trong quá trình server render (server không có window), hoặc dùng Date/time mà timezone server khác client, hay random values cho mỗi lần render ra kết quả khác nhau.\
\
Cách fix: đặt code phụ thuộc browser vào useEffect vì nó chỉ chạy trên client, dùng dynamic import với option `ssr: false` cho component cần browser APIs, hoặc thêm `suppressHydrationWarning` cho trường hợp biết trước sẽ khác nhau như timestamp.\
\
Nguyên tắc quan trọng là HTML server trả về phải khớp chính xác với kết quả initial render trên client.

## Detailed Answer (EN)
A hydration mismatch occurs when the HTML rendered on the server differs from the first render on the client, causing React warnings and potential UI bugs. Most common causes: using browser-only APIs like `window` or `localStorage` during server rendering (the server has no `window`), or using Date/time with different server/client timezones, or random values that produce different results each render. Fixes: move browser-dependent code into useEffect (client-only), use dynamic import with `ssr: false` for components needing browser APIs, or add `suppressHydrationWarning` for intentionally differing content like timestamps. Key principle: the HTML the server returns must exactly match the initial client render.
