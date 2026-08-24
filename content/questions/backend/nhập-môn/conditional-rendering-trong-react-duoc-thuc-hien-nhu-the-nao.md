---
id: conditional-rendering-trong-react-duoc-thuc-hien-nhu-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Conditional rendering trong React được thực hiện như thế nào?

## Question (EN)
How is conditional rendering handled in React?

## Đáp án chi tiết (VI)
Trong React, conditional rendering được thực hiện bằng các biểu thức JavaScript thông thường. Các cách phổ biến:\
\
1. **Toán tử ba ngôi (Ternary operator):** Dùng để toggle giữa 2 thành phần.\
```jsx\
{isLoggedIn ? \u003cDashboard /\u003e : \u003cLogin /\u003e}\
```\
\
2. **Toán tử Logical AND (`\u0026\u0026`):** Dùng để hiển thị hoặc ẩn một thành phần.\
```jsx\
{isLoading \u0026\u0026 \u003cSpinner /\u003e}\
```\
*(Cảnh báo: Tránh dùng `count \u0026\u0026 \u003cList /\u003e`. Nếu `count` là `0`, React sẽ render số `0`. Hãy dùng `count \u003e 0 \u0026\u0026 \u003cList /\u003e`)*\
\
3. **Lệnh `if/else` (hoặc `switch`):** Dùng bên ngoài câu lệnh `return` cho các logic phức tạp, thường gán kết quả vào một biến rồi render.

## Detailed Answer (EN)
In React, conditional rendering is handled using standard JavaScript expressions. Common approaches include:\
\
1. **Ternary operator:** Used to toggle between two components.\
```jsx\
{isLoggedIn ? \u003cDashboard /\u003e : \u003cLogin /\u003e}\
```\
\
2. **Logical AND (`\u0026\u0026`) operator:** Used to conditionally show or hide a component.\
```jsx\
{isLoading \u0026\u0026 \u003cSpinner /\u003e}\
```\
*(Warning: Avoid `count \u0026\u0026 \u003cList /\u003e`. If `count` is `0`, React will render the number `0`. Use `count \u003e 0 \u0026\u0026 \u003cList /\u003e` instead)*\
\
3. **`if/else` (or `switch`) statements:** Used outside the `return` statement for complex logic, often assigning the result to a variable that is then rendered.
