---
id: error-boundary-trong-react-cach-implement-use-case
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error boundary trong React. Cách implement, use case?

## Question (EN)
Error boundaries in React. How do you implement them, and what are the use cases?

## Đáp án chi tiết (VI)
Error boundary là component đặc biệt dùng để bắt lỗi JavaScript trong cây component con, ngăn không cho toàn bộ ứng dụng bị crash trắng màn hình. Cách implement: tạo class component với method componentDidCatch và static getDerivedStateFromError, khi có lỗi sẽ hiển thị fallback UI thay vì crash.\
\
Lưu ý error boundary không bắt được lỗi trong: event handler, code bất đồng bộ (setTimeout, Promise), server-side rendering, và lỗi của chính error boundary.\
\
Use case phổ biến: bọc quanh từng section quan trọng của trang để khi một phần lỗi thì các phần khác vẫn hoạt động bình thường, kèm nút retry để người dùng thử lại.

## Detailed Answer (EN)
An error boundary is a special component that catches JavaScript errors in its child component tree, preventing a full app crash (blank screen). Implementation: a class component with `componentDidCatch` and `static getDerivedStateFromError` — when an error occurs, it renders a fallback UI instead of crashing. \
\
**Note:** error boundaries do NOT catch errors in: event handlers, async code (setTimeout, Promises), server-side rendering, or the boundary itself. Common use case: wrap each major page section independently — if one section errors, the rest of the page still works. Include a retry button so users can recover.
