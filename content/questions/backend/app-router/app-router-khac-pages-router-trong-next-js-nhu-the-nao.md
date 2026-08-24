---
id: app-router-khac-pages-router-trong-next-js-nhu-the-nao
position: backend
technology: app-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
App Router khác Pages Router trong Next.js như thế nào?

## Question (EN)
How does the App Router differ from the Pages Router in Next.js?

## Đáp án chi tiết (VI)
Sự khác biệt chính bao gồm:\
\
- **Kiến trúc (Architecture):** App Router (Next.js 13+) dùng thư mục `app/` và hỗ trợ **React Server Components** mặc định. Pages Router dùng thư mục `pages/` nơi mọi component được xử lý như Client Component.\
- **Data Fetching:** App Router fetch trực tiếp trong Server Components (async/await). Pages Router dùng `getStaticProps` hoặc `getServerSideProps`.\
- **Layouts:** App Router có nested layouts (`layout.tsx`) giữ state khi chuyển trang. Pages Router layout phức tạp hơn (`_app.tsx`).\
\
App Router là kiến trúc hiện đại và được khuyên dùng cho các dự án Next.js mới.

## Detailed Answer (EN)
Key differences include:\
\
- **Architecture:** App Router (Next.js 13+) uses the `app/` directory and supports **React Server Components** by default. Pages Router uses the `pages/` directory where every component is treated as a Client Component.\
- **Data Fetching:** App Router fetches directly in Server Components (async/await). Pages Router uses `getStaticProps` or `getServerSideProps`.\
- **Layouts:** App Router has built-in nested layouts (`layout.tsx`) that preserve state across navigations. Pages Router layouts are more complex (`_app.tsx`).\
\
The App Router is the modern architecture and is recommended for new Next.js projects.
