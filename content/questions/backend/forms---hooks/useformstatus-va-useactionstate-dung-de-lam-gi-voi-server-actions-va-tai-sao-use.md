---
id: useformstatus-va-useactionstate-dung-de-lam-gi-voi-server-actions-va-tai-sao-use
position: backend
technology: forms---hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`useFormStatus` và `useActionState` dùng để làm gì với Server Actions, và tại sao `useFormStatus` phải nằm trong component con của form?

## Question (EN)
What are `useFormStatus` and `useActionState` used for with Server Actions, and why must `useFormStatus` live in a child component of the form?

## Đáp án chi tiết (VI)
Hai hook bù trừ cho nhau khi làm form bằng Server Actions:\
\
**`useActionState`** (React, dùng ở Client Component) — bọc một action, giữ **state trả về** của nó (lỗi validation, kết quả) qua các lần submit.\
```tsx\
const [state, formAction] = useActionState(createUser, { error: null })\
return \u003cform action={formAction}\u003e...{state.error \u0026\u0026 \u003cp\u003e{state.error}\u003c/p\u003e}\u003c/form\u003e\
```\
\
**`useFormStatus`** (react-dom) — cho biết form cha đang **pending** hay không, để vô hiệu nút / hiện spinner.\
```tsx\
function SubmitButton() {\
  const { pending } = useFormStatus()\
  return \u003cbutton disabled={pending}\u003e{pending ? 'Đang gửi…' : 'Gửi'}\u003c/button\u003e\
}\
```\
\
**Tại sao `useFormStatus` phải ở component con:** nó đọc trạng thái của **`\u003cform\u003e` cha gần nhất qua context**. Nếu gọi ngay trong cùng component chứa `\u003cform\u003e`, nó không nằm *bên trong* form đó nên luôn trả `pending: false`. Vì vậy phải tách nút submit thành component con đặt *trong* `\u003cform\u003e`.\
\
**Lưu ý:** `useFormState` là tên cũ; React 19 đổi sang `useActionState`.

## Detailed Answer (EN)
$88
