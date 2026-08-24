---
id: action-trong-redux-la-gi-cau-truc-cua-mot-action-nhu-the-nao
position: backend
technology: redux
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Action trong Redux là gì? Cấu trúc của một action như thế nào?

## Question (EN)
What is an action in Redux? What is the structure of an action?

## Đáp án chi tiết (VI)
Action là plain JavaScript object mô tả sự kiện xảy ra trong ứng dụng, bắt buộc có trường `type` (string định danh) và thường có `payload` chứa dữ liệu. Ví dụ: `{ type: 'cart/addItem', payload: { id: 1, name: 'iPhone', qty: 1 } }`. Quy ước đặt tên `type` theo format `domain/eventName` giúp dễ đọc trong DevTools. Action creator là function trả về action object: `const addItem = (item) =\u003e ({ type: 'cart/addItem', payload: item })` — giúp tránh typo và tái sử dụng. Với Redux Toolkit, `createSlice` tự động tạo action creators và action types, không cần viết tay. Lưu ý: đừng đặt non-serializable values vào action (Promise, class instance, function) vì sẽ phá vỡ DevTools time-travel và middleware như `redux-persist`.

## Detailed Answer (EN)
An action is a plain JavaScript object describing an event that occurred in the application. It must have a `type` field (a string identifier) and typically includes a `payload` with data. Example: `{ type: 'cart/addItem', payload: { id: 1, name: 'iPhone', qty: 1 } }`. The convention of naming `type` as `domain/eventName` makes it easy to read in DevTools. An action creator is a function that returns an action object: `const addItem = (item) =\u003e ({ type: 'cart/addItem', payload: item })` — prevents typos and enables reuse. With Redux Toolkit, `createSlice` automatically generates action creators and action types. Pitfall: never put non-serializable values in actions (Promises, class instances, functions) as this breaks DevTools time-travel and middleware like `redux-persist`.
