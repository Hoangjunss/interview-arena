---
id: protected-routes-trong-react-router-duoc-implement-nhu-the-nao
position: backend
technology: context-\u0026-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Protected routes trong React Router được implement như thế nào?

## Question (EN)
How do you implement protected routes in React Router?

## Đáp án chi tiết (VI)
Tạo wrapper component kiểm tra auth rồi redirect nếu chưa đăng nhập: `function PrivateRoute({ children }) { const { user } = useAuth(); return user ? children : \u003cNavigate to='/login' state={{ from: location }} replace /\u003e; }`. Truyền `state={{ from: location }}` để sau khi login có thể redirect về trang user định vào. Dùng trong Route: `\u003cRoute path='/dashboard' element={\u003cPrivateRoute\u003e\u003cDashboard /\u003e\u003c/PrivateRoute\u003e} /\u003e`. Navigate replace thay Redirect của React Router v5.

## Detailed Answer (EN)
Create a wrapper component that checks authentication and redirects if the user is not logged in: `function PrivateRoute({ children }) { const { user } = useAuth(); return user ? children : \u003cNavigate to='/login' state={{ from: location }} replace /\u003e; }`. Pass `state={{ from: location }}` so after login the user can be redirected back to their intended page. Use it in a Route: `\u003cRoute path='/dashboard' element={\u003cPrivateRoute\u003e\u003cDashboard /\u003e\u003c/PrivateRoute\u003e} /\u003e`. The Navigate component replaces the Redirect from React Router v5.
