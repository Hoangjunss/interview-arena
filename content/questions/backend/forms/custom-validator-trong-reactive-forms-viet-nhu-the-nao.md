---
id: custom-validator-trong-reactive-forms-viet-nhu-the-nao
position: backend
technology: forms
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom validator trong Reactive Forms viết như thế nào?

## Question (EN)
How do you write a custom validator in Reactive Forms?

## Đáp án chi tiết (VI)
Validator là function nhận `AbstractControl` và trả về `ValidationErrors | null`.\
\
Ví dụ cross-field validator:\
```typescript\
function passwordsMatch(group: AbstractControl): ValidationErrors | null {\
  const password = group.get(\\"password\\")?.value\
  const confirm = group.get(\\"confirm\\")?.value\
\
  return password === confirm ? null : { passwordMismatch: true }\
}\
```\
Async validator phù hợp check server như username đã tồn tại; cần debounce/cancel để không bắn request quá nhiều.

## Detailed Answer (EN)
A validator is a function that receives an `AbstractControl` and returns `ValidationErrors | null`.\
\
Example cross-field validator:\
```typescript\
function passwordsMatch(group: AbstractControl): ValidationErrors | null {\
  const password = group.get(\\"password\\")?.value\
  const confirm = group.get(\\"confirm\\")?.value\
\
  return password === confirm ? null : { passwordMismatch: true }\
}\
```\
Async validators fit server checks such as username availability; debounce/cancel them to avoid too many requests.
