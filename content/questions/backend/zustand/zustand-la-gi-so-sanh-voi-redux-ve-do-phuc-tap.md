---
id: zustand-la-gi-so-sanh-voi-redux-ve-do-phuc-tap
position: backend
technology: zustand
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Zustand là gì? So sánh với Redux về độ phức tạp?

## Question (EN)
What is Zustand? How does it compare to Redux in terms of complexity?

## Đáp án chi tiết (VI)
Zustand là thư viện quản lý state nhỏ gọn cho React, không yêu cầu boilerplate như Redux — không cần actions, reducers, dispatch, hay Provider wrapper. API chỉ gồm hàm `create` trả về một hook, state và actions định nghĩa cùng chỗ. Bundle size ~1KB so với Redux Toolkit ~40KB khi đầy đủ. Ví dụ tạo store đơn giản: `const useStore = create(set =\u003e ({ count: 0, inc: () =\u003e set(s =\u003e ({ count: s.count + 1 })) }))`, dùng trong component: `const count = useStore(s =\u003e s.count)`. Lưu ý quan trọng: luôn dùng selector khi lấy state (`useStore(s =\u003e s.count)` thay vì `useStore()`) để tránh re-render không cần thiết khi phần state khác thay đổi.

## Detailed Answer (EN)
Zustand is a small, lightweight state management library for React that requires no boilerplate like Redux — no actions, reducers, dispatch, or Provider wrapper needed. The API consists of a single `create` function that returns a hook, with state and actions defined in the same place. Bundle size is ~1KB compared to Redux Toolkit at ~40KB fully loaded. Example of creating a simple store: `const useStore = create(set =\u003e ({ count: 0, inc: () =\u003e set(s =\u003e ({ count: s.count + 1 })) }))`, used in a component as `const count = useStore(s =\u003e s.count)`. Important pitfall: always use a selector when reading state (`useStore(s =\u003e s.count)` rather than `useStore()`) to avoid unnecessary re-renders when unrelated parts of state change.
