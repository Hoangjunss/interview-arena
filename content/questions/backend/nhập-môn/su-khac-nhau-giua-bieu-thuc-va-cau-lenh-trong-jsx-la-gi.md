---
id: su-khac-nhau-giua-bieu-thuc-va-cau-lenh-trong-jsx-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa biểu thức và câu lệnh trong JSX là gì?

## Question (EN)
What is the difference between expressions and statements in JSX?

## Đáp án chi tiết (VI)
Trong dấu ngoặc nhọn `{}` của JSX, bạn **chỉ có thể đặt biểu thức (expressions)** — tức là đoạn code có thể trả về một giá trị.\
\
Bạn **không thể dùng câu lệnh (statements)** như `if`, `for`, `while` bên trong JSX. Nguyên nhân là do JSX sẽ được transpile thành một lời gọi hàm trả về object, bạn không thể nhúng câu lệnh `if` vào giữa các đối số của một hàm.\
\
**Cách xử lý trong JSX:**\
- Thay vì `if/else`: Dùng toán tử ba ngôi (`? :`) hoặc logical AND (`\u0026\u0026`).\
- Thay vì vòng lặp `for`: Dùng hàm `Array.prototype.map()`.\
\
**Ví dụ hợp lệ (Expression):**\
```jsx\
{items.map(i =\u003e \u003cli key={i.id}\u003e{i.name}\u003c/li\u003e)}\
```\
\
**Ví dụ KHÔNG hợp lệ (Statement):**\
```jsx\
{ for (let i of items) { ... } } // BAD: Báo lỗi cú pháp\
```\
*(Mẹo: Nếu logic quá phức tạp, hãy tính toán lưu vào một biến phía trên lệnh `return`, sau đó nhúng biến đó vào JSX).*

## Detailed Answer (EN)
Inside JSX curly braces `{}`, you can **only use expressions** — pieces of code that evaluate to a value.\
\
You **cannot use statements** like `if`, `for`, or `while` inside JSX. This is because JSX transpiles into a function call returning an object, and you cannot place an `if` statement in the middle of function arguments.\
\
**How to handle logic in JSX:**\
- Instead of `if/else`: Use the ternary operator (`? :`) or logical AND (`\u0026\u0026`).\
- Instead of `for` loops: Use `Array.prototype.map()`.\
\
**Valid Example (Expression):**\
```jsx\
{items.map(i =\u003e \u003cli key={i.id}\u003e{i.name}\u003c/li\u003e)}\
```\
\
**INVALID Example (Statement):**\
```jsx\
{ for (let i of items) { ... } } // BAD: Syntax Error\
```\
*(Tip: If the logic is too complex, compute it and store it in a variable above the `return` statement, then interpolate the variable inside your JSX).*
