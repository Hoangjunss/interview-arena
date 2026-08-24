---
id: deploy-next-js-len-vercel-hoat-dong-ra-sao-va-nhung-tinh-nang-nao-vercel-xu-ly-t
position: backend
technology: deployment---vercel
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deploy Next.js lên Vercel hoạt động ra sao, và những tính năng nào Vercel xử lý tự động mà nếu self-host bạn phải tự lo?

## Question (EN)
How does deploying Next.js on Vercel work, and which features does Vercel handle automatically that you'd have to manage yourself when self-hosting?

## Đáp án chi tiết (VI)
Vercel là hãng tạo ra Next.js nên là nền tảng chạy Next.js ít phải cấu hình nhất: push code lên Git → Vercel build và deploy tự động.\
\
**Vercel làm sẵn cho bạn:**\
- **Server Components / SSR / Route Handlers** chạy trên **Serverless/Edge Functions** — tự scale theo request.\
- **Static assets + ISR** phục vụ qua **CDN toàn cầu**, tự đặt cache header.\
- **`next/image`** optimize ảnh on-the-fly.\
- **Preview deployment** cho mỗi PR, rollback 1 click.\
\
**Nếu self-host bạn phải tự dựng:** một Node server (`next start`), CDN/reverse proxy đứng trước, cơ chế lưu cache cho ISR (`revalidate`), tối ưu ảnh (cần `sharp`), và auto-scale.\
\
**Lưu ý:** Vercel functions có giới hạn thời gian chạy và payload — tác vụ dài (vd export PDF nặng) nên tách ra background job, đừng chạy trong request handler.

## Detailed Answer (EN)
Vercel is built by the makers of Next.js, so it's the most optimized target: push to Git → Vercel builds and deploys automatically.\
\
**Vercel does for you:**\
- **Server Components / SSR / Route Handlers** run on **Serverless/Edge Functions** — auto-scaling per request.\
- **Static assets + ISR** served via a **global CDN** with cache headers set automatically.\
- **`next/image`** optimizes images on the fly.\
- **Preview deployments** per PR, one-click rollback.\
\
**Self-hosting, you build all this yourself:** a Node server (`next start`), a CDN/reverse proxy in front, a cache store for ISR (`revalidate`), image optimization (needs `sharp`), and auto-scaling.\
\
**Note:** Vercel functions have execution-time and payload limits — long tasks (e.g. heavy PDF export) belong in a background job, not the request handler.
