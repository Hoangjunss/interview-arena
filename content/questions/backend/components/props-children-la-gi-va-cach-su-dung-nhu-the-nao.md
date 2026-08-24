---
id: props-children-la-gi-va-cach-su-dung-nhu-the-nao
position: backend
technology: components
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
props.children là gì và cách sử dụng như thế nào?

## Question (EN)
What is props.children and how do you use it?

## Đáp án chi tiết (VI)
`props.children` là một prop đặc biệt chứa toàn bộ nội dung được nhúng giữa **thẻ mở** và **thẻ đóng** của một component.\
\
**Ví dụ sử dụng:**\
```jsx\
// Ở Component cha:\
\u003cModal\u003e\
  \u003ch2\u003eTiêu đề\u003c/h2\u003e\
  \u003cp\u003eNội dung mô tả.\u003c/p\u003e\
\u003c/Modal\u003e\
\
// Ở Component Modal:\
function Modal({ children }) {\
  return (\
    \u003cdiv className=\\"modal-wrapper\\"\u003e\
      \u003cdiv className=\\"modal-content\\"\u003e\
        {children} {/* \u003ch2\u003e và \u003cp\u003e sẽ được render tại đây */}\
      \u003c/div\u003e\
    \u003c/div\u003e\
  );\
}\
```\
\
**Lợi ích:**\
Mẫu thiết kế này (Composition) dùng để tạo ra các \\"Wrapper Component\\" linh hoạt như Layout, Modal, Card, Button... mà component đó không cần biết trước cấu trúc dữ liệu con của nó là gì.

## Detailed Answer (EN)
`props.children` is a special prop containing whatever content is nested between a component's **opening** and **closing** tags.\
\
**Usage Example:**\
```jsx\
// In the Parent Component:\
\u003cModal\u003e\
  \u003ch2\u003eTitle\u003c/h2\u003e\
  \u003cp\u003eDescription text.\u003c/p\u003e\
\u003c/Modal\u003e\
\
// In the Modal Component:\
function Modal({ children }) {\
  return (\
    \u003cdiv className=\\"modal-wrapper\\"\u003e\
      \u003cdiv className=\\"modal-content\\"\u003e\
        {children} {/* The \u003ch2\u003e and \u003cp\u003e are rendered here */}\
      \u003c/div\u003e\
    \u003c/div\u003e\
  );\
}\
```\
\
**Benefits:**\
This design pattern (Composition) is highly useful for creating flexible \\"Wrapper Components\\" like Layouts, Modals, Cards, or specialized Buttons... where the wrapper component doesn't need to know the exact structure of its children in advance.
