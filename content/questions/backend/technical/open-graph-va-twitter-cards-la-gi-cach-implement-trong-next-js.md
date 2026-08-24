---
id: open-graph-va-twitter-cards-la-gi-cach-implement-trong-next-js
position: backend
technology: technical
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Open Graph và Twitter Cards là gì? Cách implement trong Next.js?

## Question (EN)
What are Open Graph and Twitter Cards? How do you implement them in Next.js?

## Đáp án chi tiết (VI)
Open Graph và Twitter Cards kiểm soát preview khi share link trên social media — share preview đẹp → nhiều click → nhiều traffic → nhiều backlinks → ranking tăng gián tiếp.\
\
**Open Graph (OG)**: meta tags chuẩn Facebook để kiểm soát preview trên Facebook, LinkedIn, Zalo, Telegram. Tags quan trọng: `og:title`, `og:description`, `og:image` (1200x630px recommended), `og:url`, `og:type`.\
\
**Twitter Cards**: tương tự OG nhưng cho Twitter/X — `twitter:card` ('summary_large_image' phổ biến nhất), `twitter:title`, `twitter:description`, `twitter:image`.\
\
Trong Next.js App Router: dùng `metadata` export hoặc `generateMetadata()` — Next.js tự generate OG và Twitter meta tags.

## Detailed Answer (EN)
Open Graph and Twitter Cards control how links preview on social media — a compelling share preview drives more clicks, more traffic, more backlinks, and indirectly higher rankings.\
\
**Open Graph (OG)**: Facebook's standard meta tags for controlling link previews on Facebook, LinkedIn, Zalo, Telegram. Key tags: `og:title`, `og:description`, `og:image` (1200x630px recommended), `og:url`, `og:type`.\
\
**Twitter Cards**: similar to OG but specific to Twitter/X — `twitter:card` ('summary_large_image' is most common), `twitter:title`, `twitter:description`, `twitter:image`.\
\
In Next.js App Router: use `metadata` export or `generateMetadata()` — Next.js automatically generates OG and Twitter meta tags.
