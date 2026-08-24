---
id: css-grid-template-areas-lam-sao-layout-dashboard-responsive-ma-khong-thay-doi-ht
position: backend
technology: css-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSS Grid template areas. Làm sao layout dashboard responsive mà không thay đổi HTML?

## Question (EN)
What are CSS Grid template areas? How do you make a responsive dashboard layout without changing the HTML?

## Đáp án chi tiết (VI)
CSS Grid template-areas cho phép đặt tên cho các vùng trong grid và gán phần tử vào bằng property grid-area, tạo ra layout trực quan và dễ đọc. \
\
**Ví dụ:** grid-template-areas: 'header header' 'sidebar main' 'footer footer' rồi gán mỗi phần tử với grid-area: header, grid-area: sidebar, v.v. Để responsive, chỉ cần dùng @media query thay đổi grid-template-areas mà không cần sửa HTML — ví dụ trên mobile chuyển thành layout một cột. Đây là ưu điểm lớn nhất: thay đổi layout hoàn toàn chỉ bằng CSS, giữ nguyên cấu trúc HTML, dễ bảo trì và dễ hiểu.

## Detailed Answer (EN)
CSS Grid `template-areas` lets you name regions in the grid and assign elements to them via `grid-area`, creating a visual and readable layout definition. \
\
**Example:** `grid-template-areas: 'header header' 'sidebar main' 'footer footer'` with each element assigned `grid-area: header`, `grid-area: sidebar`, etc. For responsive behavior, simply use a `@media` query to change `grid-template-areas` — no HTML changes needed, just rearrange the named areas. This is the biggest advantage: completely change the layout with CSS alone while keeping the HTML unchanged — easy to maintain and understand.
