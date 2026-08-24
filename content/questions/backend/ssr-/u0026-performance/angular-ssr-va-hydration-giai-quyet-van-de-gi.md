---
id: angular-ssr-va-hydration-giai-quyet-van-de-gi
position: backend
technology: ssr-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Angular SSR và hydration giải quyết vấn đề gì?

## Question (EN)
What problems do Angular SSR and hydration solve?

## Đáp án chi tiết (VI)
SSR render HTML trên server để cải thiện first content, SEO và perceived performance.\
\
Cấu hình hydration phía client thường nằm ở bootstrap:\
```typescript\
bootstrapApplication(AppComponent, {\
  providers: [provideClientHydration(withEventReplay())],\
})\
```\
Hydration tái sử dụng HTML đã render thay vì vẽ lại toàn bộ trên client. Cần đảm bảo server/client render deterministic; code dùng `window`, random, timezone hoặc DOM measurement phải chạy đúng browser-only guard.

## Detailed Answer (EN)
SSR renders HTML on the server to improve first content, SEO and perceived performance.\
\
Client hydration is usually configured at bootstrap:\
```typescript\
bootstrapApplication(AppComponent, {\
  providers: [provideClientHydration(withEventReplay())],\
})\
```\
Hydration reuses server-rendered HTML instead of redrawing everything on the client. Ensure server/client rendering is deterministic; code using `window`, randomness, time zones or DOM measurement must run behind browser-only guards.
