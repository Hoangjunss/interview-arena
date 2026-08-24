---
id: scroll-behavior-trong-vue-router-restore-scroll-position
position: backend
technology: vue-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Scroll behavior trong Vue Router — restore scroll position?

## Question (EN)
Scroll behavior in Vue Router — restoring scroll position?

## Đáp án chi tiết (VI)
Vue Router cho phép kiểm soát scroll behavior khi navigate:\
\
```typescript\
const router = createRouter({\
  history: createWebHistory(),\
  routes,\
  scrollBehavior(to, from, savedPosition) {\
    // savedPosition: vị trí scroll trước đó khi dùng browser back/forward\
    if (savedPosition) {\
      return savedPosition  // Restore khi back/forward\
    }\
\
    // Scroll đến named anchor\
    if (to.hash) {\
      return {\
        el: to.hash,\
        behavior: 'smooth',\
        top: 80,  // Offset cho fixed header\
      }\
    }\
\
    // Scroll về đầu trang khi navigate thường\
    return { top: 0, behavior: 'smooth' }\
  },\
})\
\
// Async scroll — chờ transition xong\
scrollBehavior(to, from, savedPosition) {\
  return new Promise((resolve) =\u003e {\
    setTimeout(() =\u003e {\
      resolve({ top: 0, behavior: 'smooth' })\
    }, 300)  // Chờ page transition 300ms\
  })\
}\
```\
\
Dùng `savedPosition` để implement proper back/forward scroll restoration — trải nghiệm native-like.

## Detailed Answer (EN)
Vue Router controls scroll behavior on navigation:\
\
```typescript\
const router = createRouter({\
  scrollBehavior(to, from, savedPosition) {\
    if (savedPosition) return savedPosition  // Restore on back/forward\
\
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }\
\
    return { top: 0, behavior: 'smooth' }  // Scroll to top\
  },\
})\
\
// Async scroll — wait for transition\
scrollBehavior(to, from, savedPosition) {\
  return new Promise(resolve =\u003e {\
    setTimeout(() =\u003e resolve({ top: 0 }), 300)\
  })\
}\
```
