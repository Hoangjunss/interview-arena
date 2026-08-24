---
id: validation-input-trong-express-dung-gi
position: backend
technology: node.js-deep
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Validation input trong Express dùng gì?

## Question (EN)
What do you use for input validation in Express?

## Đáp án chi tiết (VI)
Zod là lựa chọn tốt nhất cho Express + TS: schema-first, type-safe, safeParse trả structured errors.\
\
```ts\
const schema = z.object({ email: z.string().email(), age: z.number().min(18) });\
app.post('/users', (req, res) =\u003e {\
  const result = schema.safeParse(req.body);\
  if (!result.success) return res.status(400).json(result.error);\
});\
```\
\
Alternatives: Joi, Yup, class-validator. Validate ở layer đầu tiên — trước bất kỳ business logic nào.

## Detailed Answer (EN)
Zod (TypeScript-first): `const schema = z.object({ email: z.string().email(), age: z.number().min(18) }); app.post('/users', (req, res) =\u003e { const result = schema.safeParse(req.body); if (!result.success) return res.status(400).json(result.error); })`. Alternatives: Joi, Yup, class-validator. Always validate at the first layer — before any business logic.
