---
id: lcp-largest-contentful-paint-la-gi-cach-cai-thien-lcp
position: backend
technology: web-vitals-\u0026-optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
LCP (Largest Contentful Paint) là gì? Cách cải thiện LCP?

## Question (EN)
What is LCP (Largest Contentful Paint)? How do you improve LCP?

## Đáp án chi tiết (VI)
LCP đo thời điểm render phần tử lớn nhất trong viewport — thường là hero image, block text lớn hoặc video poster. Good \u003c2.5s, poor \u003e4s.\
\
Cách cải thiện:\
- **Cải thiện TTFB trước** — server response time, CDN, edge caching; TTFB là phần nền của mọi LCP.\
- **Tối ưu ảnh** — serve WebP/AVIF (nhỏ hơn JPEG 25–50%), đúng kích thước container, responsive `srcset`.\
- **Preload LCP image** — `\u003clink rel='preload' as='image' href='hero.webp'\u003e` trong `\u003chead\u003e` + `fetchpriority='high'` để browser ưu tiên fetch sớm.\
- **Không lazy-load LCP image** — `loading='lazy'` trên hero image làm LCP tăng đáng kể; chỉ lazy-load below-fold.\
- **Loại bỏ render-blocking resources** — defer/async JS không critical, inline critical CSS, preconnect third-party domains.\
- **Next.js `next/image`** — tự convert format, responsive size, lazy mặc định; thêm prop `priority` cho LCP image.\
\
Lỗi hay gặp: LCP image đặt bằng CSS `background-image` bị discover trễ (browser phải parse xong CSS) — dùng `\u003cimg\u003e` cho LCP element.

## Detailed Answer (EN)
$86
