---
id: event-handling-trong-jsx-khac-gi-so-voi-html-thong-thuong
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event handling trong JSX khác gì so với HTML thông thường?

## Question (EN)
How does event handling in JSX differ from standard HTML?

## Đáp án chi tiết (VI)
Event handling trong React/JSX có 3 điểm khác biệt chính so với HTML DOM:\
\
1. **Quy tắc đặt tên:** Tên sự kiện dùng **camelCase** thay vì lowercase.\
   - HTML: `onclick=\\"handleClick()\\"`\
   - React: `onClick={handleClick}`\
\
2. **Truyền giá trị:** JSX truyền một **function reference** (hàm), không phải là một chuỗi (string).\
   - **Không nên**: `onClick=\\"handleClick()\\"`\
   - **Nên**: `onClick={handleClick}` (Lưu ý: Không có cặp ngoặc `()` ở cuối, nếu có sẽ chạy ngay lúc render).\
\
3. **Ngăn chặn hành vi mặc định:** Bạn không thể `return false` để ngăn hành vi mặc định (như submit form). Bạn bắt buộc phải gọi `e.preventDefault()` một cách rõ ràng trong handler.\
\
*(Đằng sau hậu trường, React gộp các Native Events thành Synthetic Events để đảm bảo hoạt động đồng nhất trên mọi trình duyệt và tối ưu hóa hiệu suất thông qua Event Delegation).*

## Detailed Answer (EN)
Event handling in React/JSX has 3 main differences from standard HTML DOM:\
\
1. **Naming Convention:** Event names use **camelCase** instead of lowercase.\
   - HTML: `onclick=\\"handleClick()\\"`\
   - React: `onClick={handleClick}`\
\
2. **Value Passed:** JSX passes a **function reference**, not a string.\
   - **Avoid**: `onClick=\\"handleClick()\\"`\
   - **Do**: `onClick={handleClick}` (Note: No parentheses `()` at the end, otherwise it executes immediately on render).\
\
3. **Preventing Default Behavior:** You cannot `return false` to prevent default browser behavior (like form submission). You must explicitly call `e.preventDefault()` within your handler.\
\
*(Behind the scenes, React wraps native browser events in SyntheticEvents to ensure cross-browser consistency and optimizes performance via Event Delegation).*
