---
id: dynamic-routes-va-lazy-loading-routes
position: backend
technology: vue-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dynamic routes và lazy loading routes?

## Question (EN)
Dynamic routes and lazy loading routes?

## Đáp án chi tiết (VI)
Dynamic segment: `path: '/user/:id'` — đọc qua `route.params.id`. Lazy loading với dynamic import:\
```javascript\
const routes = [\
  {\
    path: '/dashboard',\
    component: () =\u003e import('./views/Dashboard.vue')\
  },\
  {\
    path: '/user/:id',\
    // Với Vite: không cần webpackChunkName; tên chunk cấu hình qua build.rollupOptions\
    component: () =\u003e import('./views/User.vue')\
  }\
]\
```\
Lazy loading: component chỉ được download khi navigate đến route đó — giảm initial bundle size. Lưu ý: `/* webpackChunkName */` là Webpack magic comment, không có tác dụng trong Vite. Lưu ý: đọc `route.params.id` trong `\u003cscript setup\u003e`: dùng `const route = useRoute()`.

## Detailed Answer (EN)
Dynamic segment: `path: '/user/:id'` — read via `route.params.id`. Lazy loading with dynamic import:\
```javascript\
const routes = [\
  {\
    path: '/dashboard',\
    component: () =\u003e import('./views/Dashboard.vue')\
  },\
  {\
    path: '/user/:id',\
    // Named chunk group\
    component: () =\u003e import(/* webpackChunkName: \\"user\\" */ './views/User.vue')\
  }\
]\
```\
Lazy loading: component is only downloaded when navigating to that route — reduces initial bundle size. Pitfall: to read `route.params.id` in `\u003cscript setup\u003e`: use `const route = useRoute()`.
