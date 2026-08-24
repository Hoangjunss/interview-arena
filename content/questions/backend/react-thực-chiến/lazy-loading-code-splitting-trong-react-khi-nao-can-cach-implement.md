---
id: lazy-loading-code-splitting-trong-react-khi-nao-can-cach-implement
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lazy loading \u0026 code splitting trong React. Khi nào cần? Cách implement?

## Question (EN)
Lazy loading and code splitting in React. When is it needed? How do you implement it?

## Đáp án chi tiết (VI)
Lazy loading là kỹ thuật chỉ tải component khi thực sự cần thiết, giúp giảm kích thước bundle ban đầu và tăng tốc trang. Cách implement: dùng React.lazy() kết hợp Suspense, ví dụ const Dashboard = lazy(() =\u003e import('./Dashboard')) rồi bọc trong \u003cSuspense fallback={\u003cLoading /\u003e}\u003e. Thường áp dụng cho route component, modal nặng, hoặc tab ít được xem. Đánh đổi là người dùng sẽ thấy loading delay khi truy cập lần đầu, nhưng bù lại initial load nhanh hơn đáng kể.

## Detailed Answer (EN)
Lazy loading only loads a component when it is actually needed, reducing the initial bundle size and speeding up the page. Implementation: use React.lazy() with Suspense — e.g., `const Dashboard = lazy(() =\u003e import('./Dashboard'))` wrapped in `\u003cSuspense fallback={\u003cLoading /\u003e}\u003e`. Apply to route-level components, heavy modals, or rarely-viewed tabs. The tradeoff is a loading delay on first visit, but the initial page load is significantly faster.
