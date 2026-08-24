---
id: zoneless-angular-la-gi-va-khi-nao-nen-can-nhac
position: backend
technology: signals-\u0026-change-detection
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Zoneless Angular là gì và khi nào nên cân nhắc?

## Question (EN)
What is zoneless Angular and when should you consider it?

## Đáp án chi tiết (VI)
Zoneless Angular chạy change detection không phụ thuộc Zone.js monkey-patching async APIs; Angular v21+ dùng zoneless mặc định, còn Angular v20 có thể bật bằng provider:\
```typescript\
bootstrapApplication(AppComponent, {\
  providers: [provideZonelessChangeDetection()],\
})\
```\
Lợi ích: ít overhead, stack trace dễ hiểu hơn và control update rõ hơn, đặc biệt khi dùng signals. Đổi lại team phải đảm bảo state changes thông báo cho Angular qua signal updates, async pipe, host/template events hoặc `markForCheck`; một số legacy package dựa vào Zone.js có thể cần sửa. Nên thử ở app mới hoặc module cô lập trước khi migrate toàn bộ enterprise app.

## Detailed Answer (EN)
Zoneless Angular runs change detection without relying on Zone.js monkey-patching async APIs; Angular v21+ is zoneless by default, while Angular v20 can opt in with a provider:\
```typescript\
bootstrapApplication(AppComponent, {\
  providers: [provideZonelessChangeDetection()],\
})\
```\
Benefits include less overhead, clearer stack traces and more explicit update control, especially with signals. The trade-off is that teams must ensure state changes notify Angular through signal updates, async pipe, host/template events or `markForCheck`; some legacy Zone.js-dependent packages may need fixes. Try it in new apps or isolated modules before migrating an entire enterprise app.
