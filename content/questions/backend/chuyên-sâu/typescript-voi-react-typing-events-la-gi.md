---
id: typescript-voi-react-typing-events-la-gi
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TypeScript với React: typing events là gì?

## Question (EN)
How do you type React events in TypeScript?

## Đáp án chi tiết (VI)
`React.ChangeEvent\u003cHTMLInputElement\u003e` cho onChange, `React.MouseEvent\u003cHTMLButtonElement\u003e` cho onClick, `React.FormEvent\u003cHTMLFormElement\u003e` cho onSubmit. Nếu không nhớ chính xác: hover lên event trong IDE, hoặc dùng React.SyntheticEvent rộng hơn.\
\
```typescript\
function handleChange(e: React.ChangeEvent\u003cHTMLInputElement\u003e) {\
  setValue(e.target.value);\
}\
\
function handleSubmit(e: React.FormEvent\u003cHTMLFormElement\u003e) {\
  e.preventDefault();\
  // ...\
}\
```

## Detailed Answer (EN)
`React.ChangeEvent\u003cHTMLInputElement\u003e` for onChange, `React.MouseEvent\u003cHTMLButtonElement\u003e` for onClick, `React.FormEvent\u003cHTMLFormElement\u003e` for onSubmit. If you cannot remember the exact type: hover over the event in your IDE, or use the broader React.SyntheticEvent.\
\
```typescript\
function handleChange(e: React.ChangeEvent\u003cHTMLInputElement\u003e) {\
  setValue(e.target.value);\
}\
\
function handleSubmit(e: React.FormEvent\u003cHTMLFormElement\u003e) {\
  e.preventDefault();\
  // ...\
}\
```
