---
id: lazy-loading-route-trong-angular-hien-dai-lam-the-nao
position: backend
technology: routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lazy loading route trong Angular hiện đại làm thế nào?

## Question (EN)
How do you lazy load routes in modern Angular?

## Đáp án chi tiết (VI)
Với standalone component, route có thể dùng `loadComponent`; với feature có nhiều child routes, dùng `loadChildren` để import route array.\
\
Ví dụ:\
```typescript\
export const routes: Routes = [\
  {\
    path: \\"admin\\

## Detailed Answer (EN)
With standalone components, use `loadComponent`; for a feature with many child routes, use `loadChildren` to import a route array.\
\
Example:\
```typescript\
export const routes: Routes = [\
  {\
    path: \\"admin\\
