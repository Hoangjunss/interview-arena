---
id: su-khac-biet-giua-mount-update-va-unmount-trong-vong-doi-component-la-gi
position: backend
technology: components
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa mount, update và unmount trong vòng đời component là gì?

## Question (EN)
What is the difference between mount, update, and unmount in a component's lifecycle?

## Đáp án chi tiết (VI)
Trong vòng đời (lifecycle) của một component React, có 3 giai đoạn chính:\
\
1. **Mount (Gắn kết):** Là khoảnh khắc component được tạo ra và chèn vào DOM thật lần đầu tiên. \
   - *Hook tương ứng:* `useEffect` với dependency array rỗng `[]`.\
\
2. **Update (Cập nhật):** Xảy ra khi component cần phải vẽ lại (re-render). Điều này xảy ra do 3 nguyên nhân chính: state thay đổi, props từ cha truyền xuống thay đổi, hoặc component cha bị re-render.\
   - *Hook tương ứng:* `useEffect` có chứa dependencies (chạy khi dependencies thay đổi).\
\
3. **Unmount (Tháo gỡ):** Là lúc component bị xóa hoàn toàn khỏi DOM (vd: khi chuyển trang hoặc điều kiện render bị `false`). \
   - *Hook tương ứng:* Hàm `cleanup` (return function) bên trong `useEffect`. Đây là nơi dọn dẹp các side effects như hủy bỏ timer (`clearTimeout`), hủy listener (`removeEventListener`) để tránh rò rỉ bộ nhớ.

## Detailed Answer (EN)
In a React component's lifecycle, there are 3 main phases:\
\
1. **Mount:** The moment when a component is created and inserted into the actual DOM for the first time.\
   - *Corresponding Hook:* `useEffect` with an empty dependency array `[]`.\
\
2. **Update:** Occurs when the component needs to re-render. This is triggered by three main events: a state change, a change in props passed from the parent, or the parent component re-rendering itself.\
   - *Corresponding Hook:* `useEffect` with specific dependencies (runs when those dependencies change).\
\
3. **Unmount:** The moment when the component is completely removed from the DOM (e.g., navigating to another page, or a conditional render evaluating to `false`).\
   - *Corresponding Hook:* The `cleanup` function (return function) inside `useEffect`. This is crucial for cleaning up side effects like timers (`clearTimeout`) or event listeners (`removeEventListener`) to prevent memory leaks.
