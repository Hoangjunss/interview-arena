---
id: forwardref-trong-react-la-gi-va-khi-nao-can-dung
position: backend
technology: components
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Forwardref trong React là gì và khi nào cần dùng?

## Question (EN)
What is forwardRef in React and when do you need it?

## Đáp án chi tiết (VI)
React.forwardRef cho phép component nhận ref từ parent và forward xuống DOM element hoặc component con bên trong. Cần thiết khi muốn parent có thể trực tiếp access DOM node của child, ví dụ để focus input hay measure element.\
\
**React 19:** `forwardRef` là legacy — ref giờ là prop thông thường: `function Input({ label, ref, ...props }) { ... }`. Với React 18 trở về trước, dùng `React.forwardRef`:\
```tsx\
interface InputProps extends React.InputHTMLAttributes\u003cHTMLInputElement\u003e {\
  label: string\
}\
\
const Input = React.forwardRef\u003cHTMLInputElement, InputProps\u003e(\
  ({ label, ...props }, ref) =\u003e (\
    \u003clabel\u003e\
      {label}\
      \u003cinput ref={ref} {...props} /\u003e\
    \u003c/label\u003e\
  )\
)\
Input.displayName = 'Input'\
\
// Parent sử dụng ref để focus programmatically\
const LoginForm = () =\u003e {\
  const emailRef = useRef\u003cHTMLInputElement\u003e(null)\
\
  useEffect(() =\u003e {\
    emailRef.current?.focus()\
  }, [])\
\
  return \u003cInput ref={emailRef} label=\\"Email\\" type=\\"email\\" /\u003e\
}\
```

## Detailed Answer (EN)
React.forwardRef lets a component receive a ref from its parent and pass it down to a DOM element or inner component. It is needed when the parent must directly access a child's DOM node — for example, to focus an input or measure an element.\
\
**React 19:** `forwardRef` is legacy — ref is now a regular prop: `function Input({ label, ref, ...props }) { ... }`. For React 18 and earlier, use `React.forwardRef`:\
```tsx\
interface InputProps extends React.InputHTMLAttributes\u003cHTMLInputElement\u003e {\
  label: string\
}\
\
const Input = React.forwardRef\u003cHTMLInputElement, InputProps\u003e(\
  ({ label, ...props }, ref) =\u003e (\
    \u003clabel\u003e\
      {label}\
      \u003cinput ref={ref} {...props} /\u003e\
    \u003c/label\u003e\
  )\
)\
Input.displayName = 'Input'\
\
// Parent uses the ref to programmatically focus the input\
const LoginForm = () =\u003e {\
  const emailRef = useRef\u003cHTMLInputElement\u003e(null)\
\
  useEffect(() =\u003e {\
    emailRef.current?.focus()\
  }, [])\
\
  return \u003cInput ref={emailRef} label=\\"Email\\" type=\\"email\\" /\u003e\
}\
```
