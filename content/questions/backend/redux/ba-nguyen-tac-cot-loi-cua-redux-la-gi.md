---
id: ba-nguyen-tac-cot-loi-cua-redux-la-gi
position: backend
technology: redux
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ba nguyên tắc cốt lõi của Redux là gì?

## Question (EN)
What are the three core principles of Redux?

## Đáp án chi tiết (VI)
RTK eliminates Redux boilerplate via createSlice, createAsyncThunk, và RTK Query. Ba nguyên tắc cốt lõi của Redux: (1) Single source of truth — toàn bộ state nằm trong một store duy nhất, giúp đồng bộ data giữa các component và dễ serialize/restore state (ví dụ: lưu state vào localStorage rồi hydrate lại khi reload). (2) State is read-only — không được mutate state trực tiếp, chỉ thay đổi qua dispatch action, điều này tạo ra audit trail rõ ràng cho mọi thay đổi, là nền tảng để Redux DevTools time-travel hoạt động. (3) Changes are made with pure functions — reducer phải là pure function, cùng input luôn cho cùng output, không có side effects. Lưu ý phổ biến: vi phạm nguyên tắc (3) bằng cách gọi API hoặc `Date.now()` trong reducer — side effects phải nằm trong middleware (thunk/saga). Nhiều developer mới cũng vi phạm nguyên tắc (2) bằng cách `state.items.push(item)` trong Redux thuần — chỉ Redux Toolkit với Immer mới cho phép cú pháp này.

## Detailed Answer (EN)
RTK eliminates Redux boilerplate via createSlice, createAsyncThunk, and RTK Query. The three core principles of Redux: (1) Single source of truth — all state lives in a single store, keeping data in sync across components and making it easy to serialize/restore state (e.g., saving to localStorage and rehydrating on reload). (2) State is read-only — state must never be mutated directly; changes happen only by dispatching actions, creating a clear audit trail and enabling Redux DevTools time-travel. (3) Changes are made with pure functions — reducers must be pure functions: same input always produces same output, no side effects. Common pitfalls: violating principle (3) by calling an API or `Date.now()` inside a reducer — side effects belong in middleware (thunk/saga). Many new developers also violate principle (2) by writing `state.items.push(item)` in plain Redux — only Redux Toolkit with Immer permits that syntax.
