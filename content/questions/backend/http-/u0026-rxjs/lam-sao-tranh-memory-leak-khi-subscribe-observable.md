---
id: lam-sao-tranh-memory-leak-khi-subscribe-observable
position: backend
technology: http-\u0026-rxjs
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao tránh memory leak khi subscribe Observable?

## Question (EN)
How do you avoid memory leaks when subscribing to Observables?

## Đáp án chi tiết (VI)
Ưu tiên `async` pipe trong template vì tự unsubscribe.\
\
Khi phải subscribe trong class, dùng `takeUntilDestroyed()` với `DestroyRef`:\
```typescript\
private destroyRef = inject(DestroyRef)\
\
ngOnInit() {\
  this.router.events\
    .pipe(takeUntilDestroyed(this.destroyRef))\
    .subscribe(event =\u003e this.trackNavigation(event))\
}\
```\
Không cần unsubscribe với HTTP Observable hoàn tất một lần, nhưng vẫn cần cẩn thận với streams dài như router events, form valueChanges, interval, WebSocket hoặc Subject từ service.

## Detailed Answer (EN)
Prefer the `async` pipe in templates because it unsubscribes automatically.\
\
When subscribing in a class, use `takeUntilDestroyed()` with `DestroyRef`:\
```typescript\
private destroyRef = inject(DestroyRef)\
\
ngOnInit() {\
  this.router.events\
    .pipe(takeUntilDestroyed(this.destroyRef))\
    .subscribe(event =\u003e this.trackNavigation(event))\
}\
```\
One-shot HTTP Observables complete on their own, but long-lived streams such as router events, form valueChanges, intervals, WebSockets or service Subjects still need care.
