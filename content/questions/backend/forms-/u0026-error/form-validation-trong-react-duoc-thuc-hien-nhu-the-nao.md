---
id: form-validation-trong-react-duoc-thuc-hien-nhu-the-nao
position: backend
technology: forms-\u0026-error
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Form validation trong React được thực hiện như thế nào?

## Question (EN)
How is form validation done in React?

## Đáp án chi tiết (VI)
Các cách:\
\
- (1) Manual: check trong onChange/onSubmit, lưu errors vào state.\
- (2) HTML5 built-in: required, minLength, pattern attributes.\
- (3) Formik + Yup: declarative schema validation.\
- (4) React Hook Form với resolver (Yup, Zod).\
\
Dùng Zod cho type-safe validation kết hợp TypeScript là best practice hiện đại.

## Detailed Answer (EN)
Several approaches:\
\
- (1) Manual — check values in onChange/onSubmit and store errors in state.\
- (2) HTML5 built-in — required, minLength, pattern attributes.\
- (3) Formik + Yup — declarative schema validation.\
- (4) React Hook Form with a resolver (Yup or Zod).\
\
Using Zod for type-safe validation combined with TypeScript is the modern best practice.
