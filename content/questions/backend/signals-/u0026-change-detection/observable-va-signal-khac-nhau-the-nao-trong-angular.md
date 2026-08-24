---
id: observable-va-signal-khac-nhau-the-nao-trong-angular
position: backend
technology: signals-\u0026-change-detection
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Observable và Signal khác nhau thế nào trong Angular?

## Question (EN)
How do Observables and Signals differ in Angular?

## Đáp án chi tiết (VI)
Observable biểu diễn stream theo thời gian, có cancellation, operators mạnh và phù hợp với HTTP, WebSocket, router events hoặc async pipelines.\
\
Bridge khi cần đưa stream vào template signal-based:\
```typescript\
const user$ = this.http.get\u003cUser\u003e(\\"/api/me\\")\
const user = toSignal(user$, { initialValue: null })\
const userChanges$ = toObservable(user)\
```\
Signal biểu diễn current value đồng bộ, đọc trực tiếp trong template và phù hợp với local UI state. Trong app thực tế thường dùng cả hai: Observable cho event/data stream, Signal cho state hiển thị.

## Detailed Answer (EN)
An Observable represents a stream over time, supports cancellation, has powerful operators and fits HTTP, WebSocket, router events or async pipelines.\
\
Bridge when a stream needs to feed signal-based UI:\
```typescript\
const user$ = this.http.get\u003cUser\u003e(\\"/api/me\\")\
const user = toSignal(user$, { initialValue: null })\
const userChanges$ = toObservable(user)\
```\
A Signal represents a synchronous current value, is read directly in templates and fits local UI state. Real apps often use both: Observables for event/data streams, Signals for displayed state.
