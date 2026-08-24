---
id: useformstatus-dung-de-lam-gi-vi-sao-nut-submit-phai-nam-trong-component-con-cua
position: backend
technology: actions
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`useFormStatus` dùng để làm gì? Vì sao nút submit phải nằm trong component con của `\u003cform\u003e` mới đọc được trạng thái?

## Question (EN)
What is `useFormStatus` for, and why must the submit button be a child component of the `\u003cform\u003e` to read the status?

## Đáp án chi tiết (VI)
`useFormStatus` cho một component đọc **trạng thái gửi của form cha gần nhất** mà không cần truyền prop `isSubmitting` xuống.\
\
```jsx\
import { useFormStatus } from 'react-dom'\
\
function SubmitButton() {\
  const { pending } = useFormStatus()\
  return \u003cbutton disabled={pending}\u003e{pending ? 'Sending...' : 'Send'}\u003c/button\u003e\
}\
\
function ContactForm() {\
  return (\
    \u003cform action={sendMessage}\u003e\
      \u003cinput name=\\"email\\" /\u003e\
      \u003cSubmitButton /\u003e\
    \u003c/form\u003e\
  )\
}\
```\
\
Nó đọc trạng thái qua **Context do chính thẻ `\u003cform\u003e` cung cấp**, mà Context chỉ chảy xuống dưới. Nếu gọi `useFormStatus` ngay trong `ContactForm` — tức **cùng cấp** với thẻ `\u003cform\u003e` chứ không nằm trong nó — hook trả về `pending: false` mãi mãi. Vì vậy nút submit phải tách thành component con.\
\
Ngoài `pending`, hook còn trả `data` (FormData đang gửi), `method`, `action` — đủ để hiện tên file đang upload hoặc email đang được gửi. `useFormStatus` chỉ theo dõi form được submit bằng `action`, không theo dõi `onSubmit` tự viết.

## Detailed Answer (EN)
$86
