---
id: thiet-ke-infinite-scroll-feed-nhu-facebook-twitter
position: system-design
technology: interview-scenarios
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế infinite scroll feed (như Facebook/Twitter)?

## Question (EN)
How would you design an infinite scroll feed (like Facebook/Twitter)?

## Đáp án chi tiết (VI)
Infinite scroll feed cần kết hợp nhiều kỹ thuật để vừa mượt vừa hiệu quả. Dùng Intersection Observer gắn vào một sentinel element ở cuối danh sách, khi element này xuất hiện trong viewport thì tự động trigger load thêm dữ liệu.\
\
Để hiển thị hàng nghìn items mà không lag, dùng virtual list với react-window hoặc @tanstack/virtual để chỉ render những items đang nhìn thấy trên màn hình. Về phía API, nên dùng cursor-based pagination thay vì offset vì cursor không bị trùng lặp data khi có bài viết mới, kết hợp React Query useInfiniteQuery để quản lý cache và fetch states.\
\
Ngoài ra cần xử lý restore scroll position khi user navigate đi rồi quay lại, hiển thị skeleton loading cho UX tốt hơn, và debounce scroll events để tránh gọi API quá nhiều lần.

## Detailed Answer (EN)
An infinite scroll feed requires combining several techniques for smooth and efficient rendering. Use Intersection Observer attached to a sentinel element at the bottom of the list — when it enters the viewport, automatically trigger the next data load. For rendering thousands of items without lag, use a virtual list (react-window or @tanstack/virtual) to only render what is visible on screen. For the API, prefer cursor-based pagination over offset — cursors avoid duplicate data when new posts are inserted. Combine with React Query's useInfiniteQuery for cache and fetch state management. Additionally: restore scroll position on navigation, show skeleton loaders for better UX, and debounce scroll events to avoid excessive API calls.
