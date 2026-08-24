---
id: jsx-la-gi-va-tai-sao-react-su-dung-no
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JSX là gì và tại sao React sử dụng nó?

## Question (EN)
What is JSX and why does React use it?

## Đáp án chi tiết (VI)
JSX (JavaScript XML) là cú pháp mở rộng của JavaScript cho phép viết mã tương tự HTML bên trong JavaScript.\
\
React sử dụng JSX vì:\
- **Trực quan:** Giúp mô tả UI dễ hiểu và gần gũi với HTML.\
- **Đóng gói:** Cho phép kết hợp logic (JavaScript) và markup (HTML) trong cùng một file component (Sự phân tách mối quan tâm theo component thay vì theo công nghệ).\
\
Lưu ý: Trình duyệt không hiểu JSX. Babel (hoặc SWC) sẽ transpile JSX thành các lời gọi `React.createElement()` trước khi chạy.

## Detailed Answer (EN)
JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript.\
\
React uses JSX because it:\
- **Intuitive:** Makes describing UI more intuitive and closer to HTML.\
- **Encapsulation:** Allows combining logic (JavaScript) and markup (HTML) in the same component file (Separation of concerns by component instead of by technology).\
\
Note: Browsers do not understand JSX. Babel (or SWC) transpiles JSX into `React.createElement()` calls before the code runs.
