---
id: vue-router-co-ban-cach-setup-va-navigate
position: backend
technology: vue-router
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vue Router cơ bản: cách setup và navigate?

## Question (EN)
Vue Router basics: setup and navigation?

## Đáp án chi tiết (VI)
Vue Router là official router cho Vue.js — quản lý navigation, URL history, route matching.\
```javascript\
// router/index.ts\
import { createRouter, createWebHistory } from 'vue-router'\
const router = createRouter({\
  history: createWebHistory(),\
  routes: [\
    { path: '/', component: Home },\
    { path: '/user/:id', component: User },\
    { path: '/:pathMatch(.*)*', component: NotFound },\
  ]\
})\
```\
Navigate: `\u003cRouterLink to=\\"/about\\"\u003e` trong template, hoặc `router.push('/about')` trong script. `\u003cRouterView /\u003e` là nơi component được render.

## Detailed Answer (EN)
Vue Router is the official router for Vue.js — manages navigation, URL history, route matching.\
```javascript\
// router/index.ts\
import { createRouter, createWebHistory } from 'vue-router'\
const router = createRouter({\
  history: createWebHistory(),\
  routes: [\
    { path: '/', component: Home },\
    { path: '/user/:id', component: User },\
    { path: '/:pathMatch(.*)*', component: NotFound },\
  ]\
})\
```\
Navigate: `\u003cRouterLink to=\\"/about\\"\u003e` in template, or `router.push('/about')` in script. `\u003cRouterView /\u003e` is where matched components render.
