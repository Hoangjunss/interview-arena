---
id: uncontrolled-component-va-useref-trong-form-la-gi
position: backend
technology: forms-\u0026-error
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Uncontrolled component và useRef trong form là gì?

## Question (EN)
What is an uncontrolled component and how does useRef fit into forms?

## Đáp án chi tiết (VI)
Uncontrolled component lưu giá trị trong DOM, không sync với React state. Dùng ref để đọc khi cần (submit): `const inputRef = useRef(null); \u003cinput ref={inputRef} /\u003e`. Kể từ React 19, useRef yêu cầu truyền giá trị khởi tạo (thường là null cho DOM refs). Đơn giản hơn cho form không cần real-time validation, nhưng khó tích hợp với validation libraries.

## Detailed Answer (EN)
An uncontrolled component stores its value in the DOM rather than syncing with React state. Use a ref to read the value when needed (e.g., on submit): `const inputRef = useRef(null); \u003cinput ref={inputRef} /\u003e`. Since React 19, useRef requires an initial value (typically null for DOM refs). This is simpler for forms that do not need real-time validation, but harder to integrate with validation libraries.
