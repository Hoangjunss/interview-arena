---
id: nested-routes-trong-react-router-v6-hoat-dong-nhu-the-nao
position: backend
technology: context-\u0026-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nested routes trong React Router v6 hoạt động như thế nào?

## Question (EN)
How do nested routes work in React Router v6?

## Đáp án chi tiết (VI)
Nested routes dùng `\u003cOutlet /\u003e` component để render child routes. Parent route render layout, Outlet là nơi child route render: `\u003cRoute path='/dashboard' element={\u003cDashboardLayout /\u003e}\u003e\u003cRoute index element={\u003cOverview /\u003e} /\u003e\u003cRoute path='settings' element={\u003cSettings /\u003e} /\u003e\u003c/Route\u003e`. Child route paths relative, không cần lặp lại parent path.

## Detailed Answer (EN)
Nested routes use the `\u003cOutlet /\u003e` component as a slot where child routes render. The parent route renders the shared layout and Outlet marks where the child content appears: `\u003cRoute path='/dashboard' element={\u003cDashboardLayout /\u003e}\u003e\u003cRoute index element={\u003cOverview /\u003e} /\u003e\u003cRoute path='settings' element={\u003cSettings /\u003e} /\u003e\u003c/Route\u003e`. Child route paths are relative — no need to repeat the parent path.
