---
id: trong-angular-lam-sao-dua-async-data-http-vao-signal-based-code-tosignal-khac-re
position: backend
technology: signals-\u0026-change-detection
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Angular, làm sao đưa async data (HTTP) vào signal-based code? `toSignal()` khác `resource()` thế nào?

## Question (EN)
In Angular, how do you bring async (HTTP) data into signal-based code? How does `toSignal()` differ from `resource()`?

## Đáp án chi tiết (VI)
**`toSignal()`** (stable, `@angular/core/rxjs-interop`) chuyển một Observable thành signal — cách phổ biến nhất để dùng RxJS/`HttpClient` data trong component signal-based.\
```typescript\
user = toSignal(this.http.get\u003cUser\u003e(`/api/users/${id}`), { initialValue: null })\
userName = computed(() =\u003e this.user()?.name ?? \\"Loading\\")\
```\
**`resource()` / `httpResource()`** (experimental) tạo resource phản ứng theo params, expose sẵn `value`, `isLoading`, `error`, `status`, `reload` — gần với React Query hơn.\
```typescript\
userResource = httpResource\u003cUser\u003e(() =\u003e `/api/users/${userId()}`)\
```\
**Khác biệt:** `toSignal` chỉ là cầu nối Observable→signal (tự lo loading/error); `resource` quản lý cả lifecycle. Production hiện nên dùng `toSignal` (stable); `resource` còn experimental — cần đánh giá cancellation/caching trước khi adopt.

## Detailed Answer (EN)
**`toSignal()`** (stable, `@angular/core/rxjs-interop`) converts an Observable into a signal — the most common way to use RxJS/`HttpClient` data in signal-based components.\
```typescript\
user = toSignal(this.http.get\u003cUser\u003e(`/api/users/${id}`), { initialValue: null })\
userName = computed(() =\u003e this.user()?.name ?? \\"Loading\\")\
```\
**`resource()` / `httpResource()`** (experimental) create a resource that reacts to params and exposes `value`, `isLoading`, `error`, `status`, `reload` — closer to React Query.\
```typescript\
userResource = httpResource\u003cUser\u003e(() =\u003e `/api/users/${userId()}`)\
```\
**Difference:** `toSignal` is just an Observable→signal bridge (you handle loading/error); `resource` manages the whole lifecycle. Use `toSignal` (stable) in production today; `resource` is still experimental — evaluate cancellation/caching before adopting.
