---
id: internationalization-i18n-trong-next-js-duoc-implement-nhu-the-nao
position: backend
technology: optimization
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Internationalization (i18n) trong Next.js được implement như thế nào?

## Question (EN)
How is internationalization (i18n) implemented in Next.js?

## Đáp án chi tiết (VI)
App Router: không có built-in i18n, dùng middleware để detect locale từ Accept-Language header, redirect đến locale-prefixed routes `/en/about`. Dùng libraries: next-intl, next-i18next. Tạo `[locale]` dynamic segment, load messages tương ứng. Pages Router có built-in i18n config với `i18n: { locales, defaultLocale }` trong next.config.

## Detailed Answer (EN)
App Router: there is no built-in i18n — use Middleware to detect the locale from the Accept-Language header and redirect to locale-prefixed routes like `/en/about`. Popular libraries: next-intl and next-i18next. Create a `[locale]` dynamic segment and load the corresponding message files. The Pages Router has built-in i18n config via `i18n: { locales, defaultLocale }` in next.config.
