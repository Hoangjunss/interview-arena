---
id: cach-su-dung-server-actions-voi-html-forms
position: backend
technology: api-\u0026-server-actions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách sử dụng Server Actions với HTML forms?

## Question (EN)
How do you use Server Actions with HTML forms?

## Đáp án chi tiết (VI)
Gán Server Action vào form action attribute: `\u003cform action={createPost}\u003e`. Form submit tự động gọi Server Action với FormData. Không cần JavaScript client-side (progressive enhancement). Trong action: `const title = formData.get('title')`. Kết hợp với useFormState (React 18) hoặc useActionState (React 19) để track state.

## Detailed Answer (EN)
Assign a Server Action to the form's action attribute: `\u003cform action={createPost}\u003e`. On submit, the Server Action is automatically called with the FormData — no client-side JavaScript required (progressive enhancement). Inside the action: `const title = formData.get('title')`. Combine with useFormState (React 18) or useActionState (React 19) to track submission state.
