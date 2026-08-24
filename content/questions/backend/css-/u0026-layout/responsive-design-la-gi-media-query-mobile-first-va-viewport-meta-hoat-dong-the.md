---
id: responsive-design-la-gi-media-query-mobile-first-va-viewport-meta-hoat-dong-the
position: backend
technology: css-\u0026-layout
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Responsive design là gì? Media query, mobile-first và viewport meta hoạt động thế nào?

## Question (EN)
What is responsive design? How do media queries, mobile-first, and the viewport meta tag work?

## Đáp án chi tiết (VI)
Responsive design = **một codebase** hiển thị tốt trên mọi kích thước màn hình, thay vì làm site riêng cho mobile. Ba mảnh ghép chính:\
\
- **Viewport meta**: `\u003cmeta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\"\u003e` — bảo trình duyệt mobile render theo **bề rộng thật của thiết bị** thay vì giả lập viewport desktop ~980px rồi thu nhỏ. Thiếu tag này thì mọi media query gần như vô nghĩa trên điện thoại.\
- **Media query**: `@media (min-width: 768px) { ... }` áp CSS **theo điều kiện** — bề rộng viewport, hướng xoay, `prefers-color-scheme`, `prefers-reduced-motion`...\
- **Mobile-first**: viết style mặc định cho **màn hình nhỏ nhất**, rồi dùng `min-width` mở rộng dần lên tablet/desktop — CSS gọn hơn và thiết bị yếu tải ít override hơn so với desktop-first (`max-width`).\
\
Bổ trợ: layout co giãn bằng **flexbox/grid** + đơn vị tương đối (`%`, `rem`, `clamp()`), ảnh responsive bằng `srcset`/`sizes`. Xu hướng mới: **container query** — respond theo bề rộng của container thay vì viewport.

## Detailed Answer (EN)
$7b
