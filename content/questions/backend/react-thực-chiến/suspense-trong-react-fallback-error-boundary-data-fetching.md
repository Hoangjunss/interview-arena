---
id: suspense-trong-react-fallback-error-boundary-data-fetching
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Suspense trong React. Fallback, error boundary, data fetching?

## Question (EN)
What is Suspense in React? Explain fallback, error boundary integration, and data fetching.

## Đáp án chi tiết (VI)
Suspense là cơ chế cho phép React tạm dừng render một component và hiển thị fallback UI (ví dụ loading spinner) cho đến khi component đó sẵn sàng. Hiện tại Suspense hoạt động tốt nhất với React.lazy() cho lazy loading component và với các framework như Next.js, Remix cho data fetching phía server.\
\
Khi kết hợp với Error Boundary, Suspense xử lý trạng thái loading còn Error Boundary xử lý trạng thái lỗi, tạo nên trải nghiệm hoàn chỉnh cho người dùng.\
\
Trong React 19 (stable từ tháng 12/2024) đã hỗ trợ Suspense cho data fetching phía client thông qua use() hook, cho phép đọc Promise trực tiếp trong component mà không cần thư viện bổ sung.

## Detailed Answer (EN)
Suspense lets React pause rendering a component and show a fallback UI (e.g., a loading spinner) until the component is ready. It works best with React.lazy() for component lazy loading and within frameworks like Next.js and Remix for server-side data fetching.\
\
Combined with Error Boundary — Suspense handles the loading state while Error Boundary handles errors — they create a complete async UI experience.\
\
React 19 (stable since December 2024) supports Suspense for client-side data fetching natively via the use() hook, which lets you read a Promise directly inside a component without an external library.
