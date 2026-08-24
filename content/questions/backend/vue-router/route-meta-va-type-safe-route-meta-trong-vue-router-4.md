---
id: route-meta-va-type-safe-route-meta-trong-vue-router-4
position: backend
technology: vue-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Route meta và type-safe route meta trong Vue Router 4?

## Question (EN)
Route meta and type-safe route meta in Vue Router 4?

## Đáp án chi tiết (VI)
Route `meta` cho phép đính kèm custom data vào routes — thường dùng cho auth, breadcrumbs, page titles:\
\
```typescript\
// router/index.ts — declare meta type\
import 'vue-router'\
\
declare module 'vue-router' {\
  interface RouteMeta {\
    requiresAuth?: boolean\
    roles?: string[]\
    title?: string\
    breadcrumb?: string\
  }\
}\
\
const routes = [\
  {\
    path: '/admin',\
    component: AdminLayout,\
    meta: { requiresAuth: true, roles: ['admin'], title: 'Admin Panel' },\
    children: [\
      {\
        path: 'users',\
        component: UsersView,\
        meta: { breadcrumb: 'Users Management' },\
      }\
    ]\
  },\
]\
\
// Global guard dùng meta\
router.beforeEach((to) =\u003e {\
  if (to.meta.requiresAuth \u0026\u0026 !isAuthenticated()) {\
    return { name: 'Login', query: { redirect: to.fullPath } }\
  }\
})\
\
// Component access\
const route = useRoute()\
console.log(route.meta.title)  // Type-safe nhờ declaration merging\
```\
\
Lưu ý: `to.meta` tổng hợp metadata từ tất cả matched routes (parent + child) — child ghi đè parent.

## Detailed Answer (EN)
Route `meta` attaches custom data to routes — commonly used for auth, breadcrumbs, titles:\
\
```typescript\
// Type-safe via declaration merging\
declare module 'vue-router' {\
  interface RouteMeta {\
    requiresAuth?: boolean\
    roles?: string[]\
    title?: string\
  }\
}\
\
const routes = [{\
  path: '/admin',\
  meta: { requiresAuth: true, roles: ['admin'] },\
}]\
\
// Global guard\
router.beforeEach((to) =\u003e {\
  if (to.meta.requiresAuth \u0026\u0026 !isAuthenticated())\
    return { name: 'Login', query: { redirect: to.fullPath } }\
})\
\
// In component\
const route = useRoute()\
console.log(route.meta.title)  // Fully typed\
```
