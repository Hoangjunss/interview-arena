---
id: hierarchical-injectors-anh-huong-the-nao-den-state-va-memory-leak
position: backend
technology: dependency-injection
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hierarchical injectors ảnh hưởng thế nào đến state và memory leak?

## Question (EN)
How do hierarchical injectors affect state and memory leaks?

## Đáp án chi tiết (VI)
Angular có injector hierarchy: root/environment injector, route injector và element/component injectors.\
\
Cleanup theo đúng scope bằng `DestroyRef`:\
```typescript\
@Injectable()\
export class RouteScopedStream {\
  private destroyRef = inject(DestroyRef)\
\
  start() {\
    interval(1000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()\
  }\
}\
```\
Provider ở scope càng thấp thì càng nhiều instance được tạo và bị destroy theo lifecycle của scope đó. Đây là lợi thế để cô lập feature state, nhưng nếu service giữ subscription/timer/WebSocket mà không cleanup thì leak theo route hoặc component.

## Detailed Answer (EN)
Angular has an injector hierarchy: root/environment injector, route injectors and element/component injectors.\
\
Clean up at the correct scope with `DestroyRef`:\
```typescript\
@Injectable()\
export class RouteScopedStream {\
  private destroyRef = inject(DestroyRef)\
\
  start() {\
    interval(1000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()\
  }\
}\
```\
The lower the provider scope, the more instances are created and destroyed with that scope lifecycle. This is useful for isolating feature state, but if a service holds subscriptions, timers or WebSockets without cleanup, it can leak at route or component scope.
