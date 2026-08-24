---
id: tai-sao-moi-component-react-chi-co-the-return-mot-element-duy-nhat-o-cap-cao-nha
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao mỗi component React chỉ có thể return một element duy nhất ở cấp cao nhất?

## Question (EN)
Why can a React component only return a single root element?

## Đáp án chi tiết (VI)
Bởi vì JSX dưới nền tảng thực chất được compile thành các lời gọi hàm JavaScript (`React.createElement()`).\
\
Trong JavaScript, **một hàm chỉ có thể return về một giá trị duy nhất** (một object). Bạn không thể bắt một hàm return về hai object độc lập xếp liền nhau trừ khi bạn gói chúng vào một mảng hoặc một object lớn hơn.\
\
**Cách giải quyết:**\
Để trả về nhiều element song song, bạn cần nhóm chúng lại:\
1. Sử dụng thẻ HTML wrapper như `\u003cdiv className=\\"wrapper\\"\u003e...\u003c/div\u003e` (nếu phù hợp với UI).\
2. Hoặc sử dụng **React Fragment** (`\u003c\u003e...\u003c/\u003e`) để nhóm lại trên Virtual DOM nhưng tránh sinh ra node dư thừa trên HTML DOM thật.

## Detailed Answer (EN)
Because JSX is syntactical sugar that ultimately compiles down to plain JavaScript function calls (`React.createElement()`).\
\
In JavaScript, **a function can only return a single value** (a single object). You cannot make a function return two independent sibling objects at once unless you wrap them inside an array or a larger containing object.\
\
**How to solve this:**\
To return multiple sibling elements, you must group them:\
1. Use an HTML wrapper tag like a `\u003cdiv className=\\"wrapper\\"\u003e...\u003c/div\u003e` (if it makes semantic sense for your UI).\
2. Use a **React Fragment** (`\u003c\u003e...\u003c/\u003e`) to group them structurally in the Virtual DOM without adding an extra unnecessary node to the actual HTML DOM.
