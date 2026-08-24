---
id: su-khac-nhau-co-ban-giua-props-va-state-trong-react-la-gi
position: backend
technology: props-\u0026-state
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau cơ bản giữa props và state trong React là gì?

## Question (EN)
What is the fundamental difference between props and state in React?

## Đáp án chi tiết (VI)
Props là dữ liệu được truyền từ component cha xuống con, read-only và không thể thay đổi bởi component nhận. State là dữ liệu nội bộ của component, có thể thay đổi theo thời gian và kích hoạt re-render. Props giống như tham số hàm, state giống như biến cục bộ của component.

## Detailed Answer (EN)
Props are data passed from a parent component to a child, read-only and immutable by the receiving component. State is a component's internal data that can change over time and triggers a re-render when updated. Props are like function parameters; state is like a component's local variables.
