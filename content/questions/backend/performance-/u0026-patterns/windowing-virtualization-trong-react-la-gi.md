---
id: windowing-virtualization-trong-react-la-gi
position: backend
technology: performance-\u0026-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Windowing/virtualization trong React là gì?

## Question (EN)
What is windowing/virtualization in React?

## Đáp án chi tiết (VI)
Virtualization chỉ render items hiện trong viewport, không render toàn bộ danh sách hàng nghìn items. Thư viện: react-window (lightweight), react-virtualized (feature-rich). Giảm DOM nodes từ hàng nghìn xuống chỉ ~20-50. Cần thiết khi render danh sách lớn (\u003e100 items) gây performance issues.

## Detailed Answer (EN)
Virtualization renders only the items currently visible in the viewport instead of the entire list of thousands. Libraries: react-window (lightweight) and react-virtualized (feature-rich). This reduces DOM nodes from thousands down to roughly 20-50 at any moment. It is essential when rendering large lists (100+ items) that cause noticeable performance issues.
