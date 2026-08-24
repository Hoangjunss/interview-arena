---
id: su-khac-biet-giua-null-undefined-false-va-chuoi-rong-khi-render-trong-jsx-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa null, undefined, false và chuỗi rỗng khi render trong JSX là gì?

## Question (EN)
What is the difference between null, undefined, false, and an empty string when rendering in JSX?

## Đáp án chi tiết (VI)
Trong JSX:\
- `null`, `undefined`, `true`, và `false`: React sẽ **bỏ qua hoàn toàn** và không render ra bất kỳ thứ gì trên DOM. (Điều này cho phép dùng `\u0026\u0026` để conditional rendering).\
- **Chuỗi rỗng (`\\"\\"`)**: Sẽ render ra một text node rỗng.\
\
**Cạm bẫy với số 0 (Falsy values):**\
Mặc dù số `0` hoặc `NaN` là falsy trong JavaScript, React **vẫn sẽ render chúng thành text**.\
\
**Ví dụ lỗi:**\
```jsx\
{count \u0026\u0026 \u003cList /\u003e} // Nếu count = 0, màn hình sẽ in ra số \\"0\\"\
```\
**Cách khắc phục:**\
Đảm bảo biểu thức bên trái toán tử `\u0026\u0026` luôn là một Boolean (true/false) bằng cách dùng phép so sánh hoặc ép kiểu:\
```jsx\
{count \u003e 0 \u0026\u0026 \u003cList /\u003e} \
// Hoặc:\
{!!count \u0026\u0026 \u003cList /\u003e}\
```

## Detailed Answer (EN)
In JSX:\
- `null`, `undefined`, `true`, and `false`: React **completely ignores them** and renders nothing to the DOM. (This is what makes the `\u0026\u0026` operator work for conditional rendering).\
- **Empty string (`\\"\\"`)**: Renders an empty text node.\
\
**The pitfall with the number 0 (Falsy values):**\
Although `0` or `NaN` are falsy in JavaScript, React **will still render them as text strings** on the screen.\
\
**Bug Example:**\
```jsx\
{count \u0026\u0026 \u003cList /\u003e} // If count = 0, it renders \\"0\\" to the UI.\
```\
**How to fix:**\
Ensure the expression on the left side of the `\u0026\u0026` operator evaluates to a strict Boolean (true/false) by using a comparison or casting:\
```jsx\
{count \u003e 0 \u0026\u0026 \u003cList /\u003e}\
// Or:\
{!!count \u0026\u0026 \u003cList /\u003e}\
```
