---
id: jotai-provider-la-gi-khi-nao-can-dung
position: backend
technology: jotai
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Jotai Provider là gì? Khi nào cần dùng?

## Question (EN)
What is a Jotai Provider? When do you need to use it?

## Đáp án chi tiết (VI)
Provider-less (mặc định): Jotai dùng global WeakMap store — mọi component trong app share cùng atom values mà không cần wrap Provider. Khi nào cần Provider: (1) Testing — `\u003cProvider store={createStore()}\u003e` tạo isolated store mỗi test, tránh state leak giữa tests; (2) Micro-frontend — mỗi app widget có store riêng; (3) Reset toàn bộ atoms khi component unmount (ví dụ modal dialog). Store API: `const myStore = createStore(); myStore.get(atom); myStore.set(atom, value); myStore.sub(atom, callback)` — dùng để interact với atoms ngoài React (WebSocket handlers, analytics). Đánh đổi: Provider-less tiện nhưng dễ gây test pollution nếu không reset; with-Provider an toàn hơn cho testing nhưng cần boilerplate. `\u003cProvider store={store}\u003e` cũng là cách implement DevTools hoặc persist toàn bộ store state.

## Detailed Answer (EN)
Provider-less (default): Jotai uses a global WeakMap store — all components in the app share atom values without wrapping a Provider. When you DO need a Provider: (1) Testing — `\u003cProvider store={createStore()}\u003e` creates an isolated store per test, preventing state leaking between tests; (2) Micro-frontends — each app widget has its own store; (3) Resetting all atoms when a component unmounts (e.g., a modal dialog). Store API: `const myStore = createStore(); myStore.get(atom); myStore.set(atom, value); myStore.sub(atom, callback)` — useful for interacting with atoms outside React (WebSocket handlers, analytics). Trade-off: Provider-less is convenient but can cause test pollution if not reset; with-Provider is safer for testing but requires boilerplate. `\u003cProvider store={store}\u003e` is also the pattern for implementing DevTools or persisting the entire store state.
