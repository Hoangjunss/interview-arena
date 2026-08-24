---
id: structured-data-schema-org-la-gi-loi-ich-cho-seo
position: backend
technology: technical
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Structured Data (Schema.org) là gì? Lợi ích cho SEO?

## Question (EN)
What is Structured Data (Schema.org)? What are the SEO benefits?

## Đáp án chi tiết (VI)
Structured Data (JSON-LD) là cách mark up content để Google hiểu semantic context và có thể hiển thị Rich Results. Format phổ biến: JSON-LD trong `\u003cscript type='application/ld+json'\u003e`.\
\
**Lợi ích:** **Rich Results** — kết quả tìm kiếm đặc biệt với rating stars, price, availability, breadcrumbs, sitelinks — giúp kết quả nổi bật hơn trên SERP. Lưu ý: từ tháng 8/2023 Google giới hạn FAQ rich results (chỉ hiển thị cho site chính phủ/y tế có thẩm quyền) và gỡ bỏ HowTo rich results — đừng coi `FAQPage` schema là cách giành rich snippet cho site thông thường. Schema phổ biến cho frontend: `Article` (blog), `Product` (e-commerce), `BreadcrumbList` (breadcrumbs), `Organization` (company info), `WebSite` (search box trong Google). Trong Next.js: tạo component `\u003cJsonLd\u003e` render `\u003cscript\u003e` tag với JSON.stringify(data). Validate bằng Google Rich Results Test.

## Detailed Answer (EN)
Structured Data (JSON-LD) marks up content so Google understands semantic context and may display Rich Results. The most common format: JSON-LD embedded in a `\u003cscript type='application/ld+json'\u003e` tag.\
\
**Benefits:** **Rich Results** — enhanced search results featuring star ratings, price, availability, breadcrumbs, and sitelinks — making results stand out on the SERP. Note: since August 2023 Google restricted FAQ rich results (now shown only for authoritative government/health sites) and removed HowTo rich results — do not treat `FAQPage` schema as a way for regular sites to win a rich snippet. Common schemas for frontend developers: `Article` (blog), `Product` (e-commerce), `BreadcrumbList` (breadcrumbs), `Organization` (company info), `WebSite` (Google sitelinks search box). In Next.js: create a `\u003cJsonLd\u003e` component that renders a `\u003cscript\u003e` tag with JSON.stringify(data). Validate using Google's Rich Results Test.
