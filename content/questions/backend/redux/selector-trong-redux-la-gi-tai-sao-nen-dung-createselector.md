---
id: selector-trong-redux-la-gi-tai-sao-nen-dung-createselector
position: backend
technology: redux
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Selector trong Redux là gì? Tại sao nên dùng createSelector?

## Question (EN)
What is a selector in Redux? Why should you use createSelector?

## Đáp án chi tiết (VI)
createSelector memoize kết quả selector — chỉ recompute khi input thay đổi, tránh re-render không cần thiết khi filter/map trả về reference mới. Selector là function nhận toàn bộ Redux state và trích xuất/tính toán phần data cần thiết, ví dụ: `const selectActiveTodos = state =\u003e state.todos.filter(t =\u003e !t.completed)`. Vấn đề: `filter()` tạo array mới mỗi lần gọi → `useSelector` thấy reference khác → component re-render dù data không đổi. `createSelector` từ Reselect giải quyết bằng memoization: chỉ tính toán lại khi input selectors trả về giá trị khác. Ví dụ: `createSelector([selectTodos, selectFilter], (todos, filter) =\u003e todos.filter(t =\u003e t.status === filter))` — nếu todos và filter không đổi, trả về kết quả cached. Lưu ý phổ biến: tạo selector bên trong component khiến memoization không hoạt động vì selector mới được tạo mỗi render — luôn định nghĩa selector bên ngoài component hoặc dùng `useMemo`. Trong app lớn, selector composition (selector dùng selector khác) giúp tái sử dụng logic tính toán.

## Detailed Answer (EN)
$89
