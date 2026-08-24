---
id: phan-biet-csr-ssr-va-ssg-khi-nao-dung-cai-nao
position: backend
technology: react
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt CSR, SSR và SSG? Khi nào dùng cái nào?

## Question (EN)
CSR vs SSR vs SSG — what is the difference and when to use each?

## Đáp án chi tiết (VI)
Khác nhau ở **HTML được dựng ở đâu và lúc nào**:\
\
- **CSR (Client-Side Rendering)**: server trả HTML gần rỗng + bundle JS; trình duyệt render toàn bộ. → TTFB nhanh nhưng **first paint chậm**, **SEO yếu** (nội dung phụ thuộc JS). Hợp app nội bộ sau đăng nhập (dashboard).\
- **SSR (Server-Side Rendering)**: server dựng HTML **theo từng request**, gửi trang đã có nội dung rồi **hydrate** ở client. → **SEO tốt**, dữ liệu luôn mới, nhưng tải server mỗi request. Hợp trang cá nhân hóa / dữ liệu thay đổi liên tục (feed, giá).\
- **SSG (Static Site Generation)**: dựng HTML sẵn **lúc build**, phục vụ như file tĩnh qua CDN. → **Nhanh nhất, rẻ nhất, SEO tốt**, nhưng nội dung \\"đóng băng\\" tới lần build sau. Hợp blog, docs, landing, marketing.\
\
Biến thể: **ISR** (regenerate tĩnh theo chu kỳ) và **RSC/streaming** trong Next.js App Router — trộn được: tĩnh phần ít đổi, server-render phần động, client-render phần tương tác.

## Detailed Answer (EN)
The difference is **where and when the HTML is built**:\
\
- **CSR (Client-Side Rendering)**: the server returns near-empty HTML + a JS bundle; the browser renders everything. → Fast TTFB but **slow first paint** and **weak SEO** (content depends on JS). Good for post-login internal apps (dashboards).\
- **SSR (Server-Side Rendering)**: the server builds HTML **per request**, sends a content-filled page, then it **hydrates** on the client. → **Good SEO**, always-fresh data, but a server load per request. Good for personalized / frequently-changing data (feeds, prices).\
- **SSG (Static Site Generation)**: HTML is prebuilt **at build time** and served as static files via CDN. → **Fastest, cheapest, good SEO**, but content is \\"frozen\\" until the next build. Good for blogs, docs, landing/marketing pages.\
\
Variants: **ISR** (periodically regenerate static pages) and **RSC/streaming** in the Next.js App Router — you can mix: static for stable parts, server-render for dynamic parts, client-render for interactive parts.
