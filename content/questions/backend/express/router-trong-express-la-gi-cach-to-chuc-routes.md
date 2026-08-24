---
id: router-trong-express-la-gi-cach-to-chuc-routes
position: backend
technology: express
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Router trong Express là gì? Cách tổ chức routes?

## Question (EN)
What is a Router in Express? How do you organize routes?

## Đáp án chi tiết (VI)
express.Router() tạo mini-app với routes và middleware riêng biệt — giải pháp chính để tổ chức code theo feature. Mounting pattern: `app.use('/api/v1/users', userRouter)` prefix tất cả routes trong router. Route-level middleware: `router.use(authMiddleware)` chỉ áp dụng cho routes trong router đó. Nested routers: `adminRouter.use('/users', adminUserRouter)` để nest sâu hơn. Versioned API pattern: `app.use('/api/v1', v1Router); app.use('/api/v2', v2Router)` — v1 và v2 hoàn toàn độc lập, dễ deprecate. Cấu trúc thực tế: `routes/users.ts` export router, `routes/index.ts` aggregate tất cả routers, `app.ts` chỉ `app.use('/api', mainRouter)`. Lưu ý: `router.use(middleware)` sau `router.get(...)` thì route đó không được áp dụng middleware — phải đặt middleware TRƯỚC routes.

## Detailed Answer (EN)
express.Router() creates a mini-app with its own routes and middleware — the primary way to organize code by feature. Mounting pattern: `app.use('/api/v1/users', userRouter)` prefixes all routes in the router. Route-level middleware: `router.use(authMiddleware)` applies only to routes within that router. Nested routers: `adminRouter.use('/users', adminUserRouter)` for deeper nesting. Versioned API pattern: `app.use('/api/v1', v1Router); app.use('/api/v2', v2Router)` — v1 and v2 are completely independent, easy to deprecate. Practical file structure: `routes/users.ts` exports a router, `routes/index.ts` aggregates all routers, `app.ts` simply does `app.use('/api', mainRouter)`. Pitfall: `router.use(middleware)` placed after `router.get(...)` means that route doesn't get the middleware applied — middleware must always be declared BEFORE the routes it should affect.
