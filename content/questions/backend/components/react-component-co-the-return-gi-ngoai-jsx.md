---
id: react-component-co-the-return-gi-ngoai-jsx
position: backend
technology: components
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React component có thể return gì ngoài JSX?

## Question (EN)
What can a React component return besides JSX?

## Đáp án chi tiết (VI)
Một React component không bắt buộc phải trả về một JSX element thông thường. Các kiểu trả về hợp lệ bao gồm:\
\
- **`null` hoặc `false`:** Render ra một node rỗng (rất hữu ích để conditional rendering mà không làm hỏng cấu trúc tree).\
- **String hoặc Number:** Sẽ được React render trực tiếp thành các text node trên DOM.\
- **Array hoặc Fragment (`\u003c\u003e\u003c/\u003e`):** Trả về nhiều phần tử cùng cấp. (Nếu dùng Array, mỗi phần tử cần có prop `key`).\
- **Portal:** Dùng `createPortal()` để render một phần tử con vào một DOM node khác hoàn toàn bên ngoài component hiện tại (thường dùng cho Modal, Tooltip).

## Detailed Answer (EN)
A React component is not strictly required to return a typical JSX element. Valid return types include:\
\
- **`null` or `false`:** Renders an empty node (highly useful for conditional rendering without altering the tree structure).\
- **String or Number:** These are rendered directly as text nodes in the DOM.\
- **Array or Fragment (`\u003c\u003e\u003c/\u003e`):** Returns multiple sibling elements. (If returning an array, each element must have a `key` prop).\
- **Portal:** Created via `createPortal()`, this allows rendering children into a different DOM node entirely outside the current component hierarchy (often used for Modals or Tooltips).
