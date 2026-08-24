---
id: server-side-rendering-ssr-voi-micro-frontend-khac-gi-so-voi-tich-hop-o-client
position: backend
technology: micro-frontend
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server-side rendering (SSR) với micro-frontend khác gì so với tích hợp ở client?

## Question (EN)
How does SSR with micro-frontends differ from composing on the client?

## Đáp án chi tiết (VI)
Tích hợp ở client (client-side composition) là cách đơn giản nhất — trình duyệt nạp từng mảnh rồi render — nhưng tốn thời gian first paint và yếu SEO vì nội dung đến muộn. Tích hợp ở server (server-side composition) cho mỗi micro-frontend render ra HTML riêng, rồi server hoặc edge tích hợp lại — qua Server-Side Includes / Edge-Side Includes, hoặc framework chuyên dụng (Tailor, Podium, Module Federation hỗ trợ SSR). Cách này tốt cho SEO và first paint nhưng phức tạp hơn nhiều: phải lo hydrate đúng từng mảnh, cache từng phần, và xử lý lỗi tách biệt khi một mảnh fail. Lưu ý: SSR cộng micro-frontend là một trong những setup tốn chi phí phức tạp nhất — chỉ nên làm khi SEO/performance thực sự là yêu cầu bắt buộc.

## Detailed Answer (EN)
Client-side composition is the simplest — the browser loads each piece and renders — but it costs first-paint time and weakens SEO because content arrives late. Server-side composition has each micro-frontend render its own HTML, then the server or edge stitches them together — via Server-Side Includes / Edge-Side Includes, or dedicated frameworks (Tailor, Podium, Module Federation with SSR support). This is good for SEO and first paint but much more complex: you must hydrate each piece correctly, cache partials, and isolate failures when one piece fails. Note: SSR plus micro-frontends is one of the most complexity-expensive setups — do it only when SEO/performance is a hard requirement.
