---
id: cach-optimize-infinite-scroll-list-giai-thich-virtual-scrolling-concept
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách optimize infinite scroll list. Giải thích virtual scrolling concept.

## Question (EN)
How do you optimize an infinite scroll list? Explain the virtual scrolling concept.

## Đáp án chi tiết (VI)
Virtual scrolling là kỹ thuật chỉ render những item đang hiển thị trong viewport, còn những item ngoài tầm nhìn sẽ bị loại khỏi DOM. Nhờ vậy dù danh sách có hàng chục ngàn item, trình duyệt chỉ cần xử lý vài chục DOM node tại một thời điểm, tiết kiệm bộ nhớ và giữ hiệu năng mượt mà. Các thư viện phổ biến để implement gồm react-window và @tanstack/react-virtual. Đánh đổi là code phức tạp hơn, khó styling các item có chiều cao động, và cần tính toán vị trí scroll chính xác.

## Detailed Answer (EN)
Virtual scrolling renders only the items currently visible in the viewport, removing off-screen items from the DOM. This means the browser only processes a few dozen DOM nodes at any time, regardless of the total list size — saving memory and keeping performance smooth. Popular libraries: react-window and @tanstack/react-virtual. Tradeoffs: more complex code, harder to style items with dynamic heights, and requires accurate scroll position calculations.
