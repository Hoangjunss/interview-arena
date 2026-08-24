---
id: su-khac-biet-giua-controlled-vs-uncontrolled-component-trong-react-form-nen-dung
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa controlled vs uncontrolled component trong React form. Nên dùng cái nào?

## Question (EN)
What is the difference between controlled and uncontrolled components in React forms? Which should you use?

## Đáp án chi tiết (VI)
Controlled component là component mà giá trị input được quản lý bởi React state thông qua value và onChange — cho phép kiểm soát hoàn toàn dữ liệu và validate real-time. Uncontrolled component dùng ref để lấy giá trị trực tiếp từ DOM khi cần, ví dụ lúc submit form — đơn giản hơn nhưng ít kiểm soát hơn.\
\
Trong thực tế, controlled component phù hợp cho form phức tạp cần validate, format hoặc hiển thị điều kiện. Uncontrolled component phù hợp cho form đơn giản hoặc khi tích hợp với thư viện bên ngoài không hỗ trợ React state.

## Detailed Answer (EN)
A controlled component has its input value managed by React state via `value` and `onChange` — giving you full control over the data and enabling real-time validation. An uncontrolled component uses a ref to read the value directly from the DOM on demand (e.g., at submit time) — simpler but less control. In practice: controlled components are better for complex forms needing validation, formatting, or conditional display. Uncontrolled components are fine for simple forms or when integrating with third-party libraries that don't support React state.
