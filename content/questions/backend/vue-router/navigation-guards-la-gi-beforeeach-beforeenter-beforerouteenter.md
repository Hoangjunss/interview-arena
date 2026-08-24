---
id: navigation-guards-la-gi-beforeeach-beforeenter-beforerouteenter
position: backend
technology: vue-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Navigation guards là gì? beforeEach, beforeEnter, beforeRouteEnter?

## Question (EN)
What are navigation guards? beforeEach, beforeEnter, beforeRouteEnter?

## Đáp án chi tiết (VI)
Navigation guards cho phép control navigation — xác thực, redirect, cancel.\
```javascript\
// Global guard\
router.beforeEach((to, from) =\u003e {\
  if (to.meta.requiresAuth \u0026\u0026 !isLoggedIn()) {\
    return { name: 'Login' }  // redirect\
  }\
})\
\
// Per-route guard\
{ path: '/admin', component: Admin, beforeEnter: (to, from) =\u003e { ... } }\
```\
In-component guards (Options API): `beforeRouteEnter`, `beforeRouteUpdate`, `beforeRouteLeave`. Trong Composition API dùng `onBeforeRouteLeave`, `onBeforeRouteUpdate`. Return `false` để cancel, return route location để redirect, return `undefined`/`true` để proceed.

## Detailed Answer (EN)
Navigation guards let you control navigation — auth checks, redirects, cancellation.\
```javascript\
// Global guard\
router.beforeEach((to, from) =\u003e {\
  if (to.meta.requiresAuth \u0026\u0026 !isLoggedIn()) {\
    return { name: 'Login' }  // redirect\
  }\
})\
\
// Per-route guard\
{ path: '/admin', component: Admin, beforeEnter: (to, from) =\u003e { ... } }\
```\
In-component guards (Options API): `beforeRouteEnter`, `beforeRouteUpdate`, `beforeRouteLeave`. In Composition API use `onBeforeRouteLeave`, `onBeforeRouteUpdate`. Return `false` to cancel, a route location to redirect, or `undefined`/`true` to proceed.
