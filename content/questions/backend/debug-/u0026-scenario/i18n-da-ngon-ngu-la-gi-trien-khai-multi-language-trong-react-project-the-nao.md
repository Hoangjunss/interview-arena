---
id: i18n-da-ngon-ngu-la-gi-trien-khai-multi-language-trong-react-project-the-nao
position: backend
technology: debug-\u0026-scenario
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
i18n (đa ngôn ngữ) là gì? Triển khai multi-language trong React project thế nào?

## Question (EN)
What is i18n (internationalization)? How do you implement multi-language support in a React project?

## Đáp án chi tiết (VI)
i18n (internationalization) là kỹ thuật giúp app hỗ trợ nhiều ngôn ngữ. Cách làm: (1) Tách tất cả text ra file JSON theo ngôn ngữ (vi.json, en.json), không hardcode text trong component. (2) Dùng thư viện react-i18next hoặc next-intl (cho Next.js) — gọi `t('greeting')` thay vì viết 'Xin chào' trực tiếp.\
\
(3) Lazy load file ngôn ngữ để không tải hết cùng lúc. (4) Dùng Intl API có sẵn trong browser để format ngày tháng, số, tiền tệ theo locale. (5) Next.js hỗ trợ routing theo locale: `/en/about`, `/vi/about` qua middleware.\
\
next-intl hiện là lựa chọn phổ biến nhất cho Next.js App Router.

## Detailed Answer (EN)
i18n (internationalization) is the practice of making an app support multiple languages. Approach: (1) Extract all text into language JSON files (vi.json, en.json) — no hardcoded strings in components. (2) Use react-i18next or next-intl (for Next.js) — call `t('greeting')` instead of writing text directly. (3) Lazy-load language files to avoid loading all languages upfront. (4) Use the built-in browser Intl API to format dates, numbers, and currency per locale. (5) Next.js supports locale-based routing: `/en/about`, `/vi/about` via middleware. next-intl is currently the most popular choice for Next.js App Router.
