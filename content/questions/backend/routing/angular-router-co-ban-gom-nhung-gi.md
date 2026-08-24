---
id: angular-router-co-ban-gom-nhung-gi
position: backend
technology: routing
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Angular Router cơ bản gồm những gì?

## Question (EN)
What are the basics of Angular Router?

## Đáp án chi tiết (VI)
Angular Router map URL sang component thông qua route config.\
\
App standalone thường dùng `provideRouter(routes)`, template đặt `\u003crouter-outlet /\u003e` làm nơi render route hiện tại, và navigation dùng `routerLink` hoặc `Router.navigate()`. Route có thể chứa path params, query params, redirects, nested routes, lazy loading, guards và resolvers.

## Detailed Answer (EN)
Angular Router maps URLs to components through route configuration.\
\
A standalone app usually uses `provideRouter(routes)`, the template places `\u003crouter-outlet /\u003e` where the current route renders, and navigation uses `routerLink` or `Router.navigate()`. Routes can include path params, query params, redirects, nested routes, lazy loading, guards and resolvers.
