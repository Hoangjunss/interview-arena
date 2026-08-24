---
id: jsx-duoc-transpile-thanh-gi-hay-cho-vi-du-minh-hoa
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JSX được transpile thành gì? Hãy cho ví dụ minh họa.

## Question (EN)
What does JSX compile to? Give an example.

## Đáp án chi tiết (VI)
JSX được Babel (hoặc các compiler khác như SWC) transpile thành các lời gọi hàm tạo element của React.\
\
Trước React 17, nó được compile thành `React.createElement(type, props, ...children)`.\
\
**Ví dụ:**\
```jsx\
\u003ch1 className=\\"title\\"\u003eHello\u003c/h1\u003e\
```\
Sẽ trở thành:\
```javascript\
React.createElement(\\"h1\\

## Detailed Answer (EN)
JSX is transpiled by Babel (or other compilers like SWC) into React element creation function calls.\
\
Before React 17, it compiled to `React.createElement(type, props, ...children)`.\
\
**Example:**\
```jsx\
\u003ch1 className=\\"title\\"\u003eHello\u003c/h1\u003e\
```\
Becomes:\
```javascript\
React.createElement(\\"h1\\
