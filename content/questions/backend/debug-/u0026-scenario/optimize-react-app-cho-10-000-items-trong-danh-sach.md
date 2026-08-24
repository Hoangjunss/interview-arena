---
id: optimize-react-app-cho-10-000-items-trong-danh-sach
position: backend
technology: debug-\u0026-scenario
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Optimize React app cho 10,000+ items trong danh sách?

## Question (EN)
How do you optimize a React app displaying 10,000+ items in a list?

## Đáp án chi tiết (VI)
Để hiển thị danh sách hàng chục nghìn items mà không giật lag, giải pháp quan trọng nhất là dùng virtual list với react-window hoặc @tanstack/virtual, chỉ render khoảng 20-30 items đang hiển thị trên màn hình thay vì toàn bộ.\
\
Kết hợp thêm React.memo cho list item component để tránh re-render không cần thiết, và useMemo cho logic filter/sort để không tính toán lại mỗi lần render. Nếu có search/filter phức tạp trên tập dữ liệu lớn, nên chuyển sang Web Worker để xử lý ở background thread, tránh block main thread khiến UI không phản hồi.\
\
Mục tiêu là giữ mỗi frame render dưới 16ms (60fps), và nên đo bằng React DevTools Profiler hoặc Chrome Performance tab để xác nhận.

## Detailed Answer (EN)
The most important solution for rendering tens of thousands of items without lag is virtualization: use react-window or @tanstack/virtual to render only the ~20-30 items currently visible on screen. Combine with React.memo on list item components to prevent unnecessary re-renders, and useMemo for filter/sort logic to avoid recalculating on every render. For complex search/filter over large datasets, offload computation to a Web Worker to keep the main thread free and prevent UI freezes. Target keeping each frame render under 16ms (60fps), and verify with React DevTools Profiler or the Chrome Performance tab.
