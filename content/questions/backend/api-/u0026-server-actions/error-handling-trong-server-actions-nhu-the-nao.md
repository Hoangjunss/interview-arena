---
id: error-handling-trong-server-actions-nhu-the-nao
position: backend
technology: api-\u0026-server-actions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error handling trong Server Actions như thế nào?

## Question (EN)
How do you handle errors in Server Actions?

## Đáp án chi tiết (VI)
Server Actions có thể throw errors sẽ được catch bởi nearest error.tsx. Với useFormState/useActionState, return error object thay vì throw: `return { error: 'Invalid input' }`. Dùng try/catch trong action để handle expected errors (validation, not found) và return user-friendly error states.

## Detailed Answer (EN)
Server Actions can throw errors, which will be caught by the nearest error.tsx boundary. When using useFormState/useActionState, return an error object instead of throwing: `return { error: 'Invalid input' }`. Use try/catch inside the action to handle expected errors (validation failures, not-found cases) and return user-friendly error state objects.
