---
id: facade-pattern-la-gi-ung-dung-trong-frontend-development
position: backend
technology: structural
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Facade pattern là gì? Ứng dụng trong frontend development?

## Question (EN)
What is the Facade pattern? How is it applied in frontend development?

## Đáp án chi tiết (VI)
Facade cung cấp simplified interface cho một hệ thống phức tạp, subsystem hoặc library — giảm dependency giữa client code và internals phức tạp. \
\
**Ví dụ:** thay vì client gọi trực tiếp 5 service (AuthService, UserService, ProfileService, CacheService, LogService), ta tạo `UserFacade` với method đơn giản như `getUserProfile(id)` tự phối hợp các service. Trong frontend: custom hook là Facade xuất sắc — `useAuth()` ẩn đi chi tiết của JWT storage, API call, state management; component chỉ gọi `const { user, login, logout } = useAuth()`. Facade không ngăn client access subsystem trực tiếp nếu cần — khác với Proxy. Dùng khi: có subsystem phức tạp cần đơn giản hóa; khi muốn layer hóa architecture (presentation → service facade → domain). Không dùng khi: tạo ra 'God Facade' ôm quá nhiều thứ — vi phạm SRP.

## Detailed Answer (EN)
Facade provides a simplified interface to a complex system, subsystem, or library — reducing the coupling between client code and complex internals. \
\
**Example:** instead of a client calling five services directly (AuthService, UserService, ProfileService, CacheService, LogService), you create a `UserFacade` with a simple method like `getUserProfile(id)` that coordinates the services internally. In frontend: custom hooks are an excellent Facade — `useAuth()` hides the details of JWT storage, API calls, and state management; the component just calls `const { user, login, logout } = useAuth()`. Facade doesn't prevent clients from accessing the subsystem directly if needed — unlike Proxy. Use it when a complex subsystem needs simplification or when you want to layer your architecture (presentation → service facade → domain). Avoid it when the result is a 'God Facade' that absorbs too many responsibilities — a violation of SRP.
