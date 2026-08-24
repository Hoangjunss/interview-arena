---
id: hydration-trong-angular-ssr-la-gi-non-destructive-hydration-hoat-dong-the-nao
position: backend
technology: ssr-\u0026-performance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hydration trong Angular SSR là gì? Non-destructive hydration hoạt động thế nào?

## Question (EN)
What is hydration in Angular SSR? How does non-destructive hydration work?

## Đáp án chi tiết (VI)
**Hydration** là quá trình Angular \\"gắn\\" app client vào HTML đã được server render (SSR), thay vì xóa và render lại từ đầu. **Non-destructive hydration** (stable từ Angular 16) tái sử dụng DOM có sẵn → tránh flicker, giữ nguyên nội dung, cải thiện Core Web Vitals (LCP/CLS).\
\
```typescript\
// app.config.ts\
provideClientHydration()\
```\
\
Trước v16: hydration \\"destructive\\" — Angular xóa toàn bộ server HTML rồi render lại → nháy màn hình.\
\
**Incremental hydration** (Angular 17+, enhancement) cho phép hoãn hydrate từng `@defer` block đến khi cần (vd scroll vào viewport) — tốt cho SSR page lớn nhiều \\"island\\":\
```typescript\
provideClientHydration(withIncrementalHydration())\
```\
```html\
@defer (hydrate on viewport) { \u003capp-comments /\u003e }\
```\
Angular queue và replay event xảy ra trước khi block hydrate xong.

## Detailed Answer (EN)
**Hydration** is the process where Angular \\"attaches\\" the client app to the server-rendered HTML (SSR) instead of destroying and re-rendering it. **Non-destructive hydration** (stable since Angular 16) reuses the existing DOM → avoids flicker, preserves content, improves Core Web Vitals (LCP/CLS).\
\
```typescript\
// app.config.ts\
provideClientHydration()\
```\
\
Before v16: hydration was \\"destructive\\" — Angular wiped the server HTML and re-rendered → screen flicker.\
\
**Incremental hydration** (Angular 17+, an enhancement) defers hydrating individual `@defer` blocks until needed (e.g. on viewport) — great for large SSR pages with many \\"islands\\":\
```typescript\
provideClientHydration(withIncrementalHydration())\
```\
```html\
@defer (hydrate on viewport) { \u003capp-comments /\u003e }\
```\
Angular queues and replays events that occur before a block finishes hydrating.
