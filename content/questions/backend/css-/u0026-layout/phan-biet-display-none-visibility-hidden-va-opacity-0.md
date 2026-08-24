---
id: phan-biet-display-none-visibility-hidden-va-opacity-0
position: backend
technology: css-\u0026-layout
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `display: none`, `visibility: hidden` và `opacity: 0`?

## Question (EN)
What is the difference between `display: none`, `visibility: hidden`, and `opacity: 0`?

## Đáp án chi tiết (VI)
Cả ba đều làm element \\"biến mất\\" nhưng khác nhau về layout, tương tác và a11y:\
\
- **`display: none`**: gỡ element khỏi **layout** — không chiếm chỗ, không render, con cháu ẩn theo và không ghi đè lại được. Bị loại khỏi **accessibility tree** (screen reader bỏ qua). Không transition được vì element bị gỡ/gắn lại.\
- **`visibility: hidden`**: element vô hình nhưng **vẫn chiếm chỗ** trong layout. Không nhận sự kiện chuột, không focus được, ẩn khỏi screen reader. Con cháu có thể tự hiện lại bằng `visibility: visible`.\
- **`opacity: 0`**: chỉ trong suốt về mặt hình ảnh — **vẫn chiếm chỗ, vẫn nhận click và focus**, vẫn nằm trong accessibility tree. Animate mượt được (chạy trên compositor).\
\
Thực hành: toggle hẳn một khối → `display: none`; giữ layout ổn định khi ẩn/hiện → `visibility`; hiệu ứng fade → `opacity` (nhớ chặn tương tác bằng `pointer-events: none` hoặc kết hợp `visibility` khi đã ẩn hoàn toàn).

## Detailed Answer (EN)
All three make an element \\"disappear\\" but differ in layout, interaction, and a11y:\
\
- **`display: none`**: removes the element from the **layout** — takes no space, is not rendered, descendants are hidden with no way to opt back in. Removed from the **accessibility tree** (screen readers skip it). Cannot be transitioned since the element is detached/reattached.\
- **`visibility: hidden`**: the element is invisible but **still occupies space** in the layout. It receives no mouse events, cannot be focused, and is hidden from screen readers. Descendants can re-show themselves with `visibility: visible`.\
- **`opacity: 0`**: only visually transparent — it **still takes space, still receives clicks and focus**, and stays in the accessibility tree. Animates smoothly (runs on the compositor).\
\
In practice: fully toggling a block → `display: none`; keeping layout stable while hiding → `visibility`; fade effects → `opacity` (block interaction with `pointer-events: none` or combine with `visibility` once fully hidden).
