---
id: redux-la-gi-tai-sao-chung-ta-can-su-dung-redux
position: backend
technology: redux
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redux là gì? Tại sao chúng ta cần sử dụng Redux?

## Question (EN)
What is Redux? Why do we need to use it?

## Đáp án chi tiết (VI)
Redux phù hợp cho complex global state cần time-travel debug; RTK là cách dùng Redux 2025. Redux là thư viện quản lý state tập trung cho JavaScript, thường dùng với React. Nó lưu toàn bộ state ứng dụng trong một store duy nhất, giúp dễ dàng theo dõi, debug và chia sẻ state giữa các component không liên kết trực tiếp. Ví dụ thực tế: trong app có UserProfile ở header và ShoppingCart ở sidebar cùng cần thông tin user đang đăng nhập — không cần prop drilling qua nhiều cấp, cả hai đọc thẳng từ Redux store. Redux đặc biệt có giá trị khi dùng Redux DevTools để time-travel debug, replay lại từng action để tái hiện bug. Lưu ý: nhiều team dùng Redux cho mọi thứ kể cả state local của form — điều đó làm code phức tạp không cần thiết, chỉ nên dùng Redux cho state thật sự cần chia sẻ toàn app.

## Detailed Answer (EN)
Redux suits complex global state needing time-travel debugging; RTK is the recommended way to write Redux in 2025. Redux is a centralized state management library for JavaScript, commonly used with React. It stores the entire application state in a single store, making it easy to track, debug, and share state between components that are not directly connected. Practical example: an app with a UserProfile in the header and a ShoppingCart in the sidebar both need the currently logged-in user's info — instead of prop drilling through multiple levels, both components read directly from the Redux store. Redux is especially valuable when using Redux DevTools for time-travel debugging, replaying each action to reproduce bugs. Pitfall: many teams use Redux for everything including local form state — this adds unnecessary complexity. Redux should only be used for state that genuinely needs to be shared across the entire app.
