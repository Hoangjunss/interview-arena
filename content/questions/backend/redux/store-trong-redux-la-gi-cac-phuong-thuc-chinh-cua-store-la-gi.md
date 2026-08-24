---
id: store-trong-redux-la-gi-cac-phuong-thuc-chinh-cua-store-la-gi
position: backend
technology: redux
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Store trong Redux là gì? Các phương thức chính của store là gì?

## Question (EN)
What is the Store in Redux? What are its main methods?

## Đáp án chi tiết (VI)
Store lưu toàn bộ state tree trong một object duy nhất — dùng configureStore() (RTK) thay vì createStore() (legacy); useSelector/useDispatch là interface chính cho React components. Store là object trung tâm lưu trữ toàn bộ state tree của ứng dụng, được tạo bằng `configureStore()` (RTK) hoặc `createStore()` (legacy). Ba phương thức chính: `getState()` trả về state hiện tại, `dispatch(action)` gửi action qua middleware rồi đến reducer để cập nhật state, `subscribe(listener)` đăng ký callbac"])</script><script>self.__next_f.push([1,"k được gọi sau mỗi dispatch. Trong thực tế với React, bạn hiếm khi gọi trực tiếp các phương thức này vì `react-redux` đã wrap chúng qua `useSelector` (thay getState + subscribe) và `useDispatch` (thay dispatch). Lưu ý: chỉ nên có MỘT store duy nhất trong app — nhiều store phá vỡ nguyên tắc single source of truth và làm DevTools không hoạt động đúng. Với RTK, `configureStore` tự động setup Redux DevTools, thunk middleware, và development checks (phát hiện accidental mutation).

## Detailed Answer (EN)
$88
