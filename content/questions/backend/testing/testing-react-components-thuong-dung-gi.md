---
id: testing-react-components-thuong-dung-gi
position: backend
technology: testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Testing React components thường dùng gì?

## Question (EN)
What do you typically use to test React components?

## Đáp án chi tiết (VI)
Bộ công cụ phổ biến nhất để test React components là Jest kết hợp React Testing Library (RTL), trong đó RTL theo triết lý test hành vi người dùng thay vì chi tiết implementation bên trong.\
\
Cách viết test cơ bản là dùng `render()` để mount component, `screen.getByRole()` hoặc `screen.getByText()` để tìm element, rồi `userEvent.click()` để mô phỏng tương tác. Để mock API calls, nên dùng MSW (Mock Service Worker) vì nó chặn requests ở tầng network, giúp test giống thực tế hơn so với mock trực tiếp fetch/axios.\
\
Nguyên tắc quan trọng là viết test theo luồng tương tác của user thực — ví dụ click nút submit rồi kiểm tra hiển thị thông báo thành công, thay vì kiểm tra state nội bộ có thay đổi hay không.

## Detailed Answer (EN)
The most popular tooling is Jest combined with React Testing Library (RTL). RTL's philosophy is to test user behavior rather than internal implementation details. Basic approach: `render()` to mount the component, `screen.getByRole()` or `screen.getByText()` to query elements, and `userEvent.click()` to simulate interaction. For mocking API calls, MSW (Mock Service Worker) is preferred because it intercepts requests at the network layer, making tests more realistic than mocking fetch/axios directly. The key principle: write tests that follow a real user's interaction flow — e.g., click submit and verify the success message appears, not whether internal state changed.
