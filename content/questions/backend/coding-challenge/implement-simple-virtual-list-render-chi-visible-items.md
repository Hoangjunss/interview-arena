---
id: implement-simple-virtual-list-render-chi-visible-items
position: backend
technology: coding-challenge
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement simple virtual list (render chỉ visible items)?

## Question (EN)
Implement a simple virtual list (render only visible items).

## Đáp án chi tiết (VI)
Virtual list là kỹ thuật chỉ render các items đang hiển thị trong viewport thay vì toàn bộ danh sách, giúp xử lý hàng chục nghìn items mà không lag.\
\
Cách tính: lấy `visibleStart = Math.floor(scrollTop / itemHeight)` và `visibleEnd = visibleStart + Math.ceil(containerHeight / itemHeight)` để xác định range items cần render. Container bên ngoài cần có tổng chiều cao bằng `totalItems * itemHeight` để giữ scrollbar đúng kích thước, còn mỗi item dùng `position: absolute` với `top = index * itemHeight`.\
\
Trong thực tế, nên dùng thư viện react-window hoặc @tanstack/virtual vì chúng đã xử lý tốt các edge cases như dynamic item heights, overscan (render thêm vài items ngoài viewport cho smooth scroll), và scroll restoration.

## Detailed Answer (EN)
A virtual list renders only the items currently visible in the viewport instead of the entire list, handling tens of thousands of items without lag.\
\
Calculation: `visibleStart = Math.floor(scrollTop / itemHeight)` and `visibleEnd = visibleStart + Math.ceil(containerHeight / itemHeight)`. The outer container needs a total height of `totalItems * itemHeight` to keep the scrollbar correct; each item uses `position: absolute` with `top = index * itemHeight`.\
\
In practice, use react-window or @tanstack/virtual as they handle edge cases like dynamic item heights, overscan (extra items rendered outside the viewport for smooth scrolling), and scroll restoration.
