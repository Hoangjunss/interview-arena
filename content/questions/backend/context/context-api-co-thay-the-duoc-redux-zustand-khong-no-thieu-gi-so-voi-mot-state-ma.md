---
id: context-api-co-thay-the-duoc-redux-zustand-khong-no-thieu-gi-so-voi-mot-state-ma
position: backend
technology: context
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context API có thay thế được Redux/Zustand không? Nó thiếu gì so với một state manager?

## Question (EN)
Can the Context API replace Redux/Zustand? What does it lack compared to a state manager?

## Đáp án chi tiết (VI)
Context là cơ chế **truyền giá trị xuống cây component** (dependency injection), không phải state manager. Bản thân nó không lưu state — state vẫn nằm ở `useState`/`useReducer` của Provider.\
\
Ba thứ nó không có:\
\
- **Không có selector.** Mọi consumer của một context re-render khi giá trị context đổi, dù chỉ đọc một field. Store thật cho phép `useStore(s =\u003e s.count)` để chỉ subscribe phần cần.\
- **Không có tối ưu cập nhật.** Nếu `value={{ user, setUser }}` là object mới mỗi lần render Provider, toàn bộ subtree consumer re-render theo.\
- **Không có hệ sinh thái** — devtools/time-travel, middleware, persist, đọc state ngoài React.\
\
Cách dùng đúng: Context hợp cho dữ liệu **ít thay đổi và cần ở khắp nơi** (theme, locale, session). Với state đổi liên tục, hoặc tách một context \\"giá trị\\" và một context \\"hàm dispatch\\" (hàm ổn định nên consumer chỉ-dispatch không re-render), hoặc dùng store có selector.

## Detailed Answer (EN)
Context is a mechanism for **passing a value down the tree** (dependency injection), not a state manager. It stores nothing itself — the state still lives in the Provider's `useState`/`useReducer`.\
\
Three things it lacks:\
\
- **No selectors.** Every consumer re-renders when the context value changes, even if it reads a single field. A real store lets you write `useStore(s =\u003e s.count)` and subscribe to just that slice.\
- **No update optimization.** If `value={{ user, setUser }}` is a fresh object on every Provider render, the whole consumer subtree re-renders.\
- **No ecosystem** — devtools/time-travel, middleware, persistence, reading state outside React.\
\
Correct usage: Context suits data that **changes rarely and is needed everywhere** (theme, locale, session). For frequently changing state, either split into a \\"value\\" context and a \\"dispatch\\" context (dispatch functions are stable, so dispatch-only consumers stop re-rendering) or use a store with selectors.
