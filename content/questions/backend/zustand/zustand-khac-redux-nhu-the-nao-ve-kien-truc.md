---
id: zustand-khac-redux-nhu-the-nao-ve-kien-truc
position: backend
technology: zustand
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Zustand khác Redux như thế nào về kiến trúc?

## Question (EN)
How does Zustand differ from Redux architecturally?

## Đáp án chi tiết (VI)
Kiến trúc khác nhau căn bản: Redux theo Flux pattern — action object → dispatch → middleware → reducer → new state; Zustand không có khái niệm action types hay reducers — chỉ là functions gọi set(). Redux bắt buộc: Provider wrapper, combineReducers, action creators, selectors riêng biệt, middleware để async. Zustand không cần gì trong số đó. Redux enforces một flow dữ liệu nghiêm ngặt (tốt cho team lớn, audit), Zustand flexible hơn (tốt cho DX và speed). Về middleware: Redux có ecosystem middleware phong phú (thunk, saga, logger, sentry), Zustand có middleware nhẹ hơn (devtools, persist, immer) nhưng đủ dùng cho hầu hết cases. Về DevTools: cả hai đều kết nối được Redux DevTools Extension. Khi Zustand tỏa sáng: prototype nhanh, app vừa, team nhỏ. Khi Redux tỏa sáng: large team cần consistency, cần RTK Query, cần full audit trail, cần time-travel debugging end-to-end.

## Detailed Answer (EN)
Fundamentally different architectures: Redux follows the Flux pattern — action object → dispatch → middleware → reducer → new state; Zustand has no concept of action types or reducers — just functions calling set(). Redux requires: a Provider wrapper, combineReducers, action creators, separate selectors, and middleware for async logic. Zustand needs none of that. Redux enforces a strict data flow (good for large teams and auditing); Zustand is more flexible (better DX and speed). On middleware: Redux has a rich ecosystem (thunk, saga, logger, sentry), Zustand has lighter middleware (devtools, persist, immer) but sufficient for most use cases. Both can connect to Redux DevTools Extension. Where Zustand shines: rapid prototyping, medium-sized apps, small teams. Where Redux shines: large teams needing consistency, projects requiring RTK Query, full audit trails, or end-to-end time-travel debugging.
