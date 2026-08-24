---
id: reactive-forms-vs-template-driven-forms-trong-angular-khac-nhau-the-nao-khi-nao
position: backend
technology: forms
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reactive Forms vs Template-driven Forms trong Angular khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do Reactive Forms and Template-driven Forms differ in Angular? When do you use each?

## Đáp án chi tiết (VI)
Hai cách build form trong Angular:\
\
| | **Template-driven** | **Reactive** |\
|---|---|---|\
| Khai báo | Trong template (`ngModel`) | Trong class (`FormGroup`/`FormControl`) |\
| Form model | Angular tự tạo ngầm | Dev định nghĩa tường minh |\
| Validation | Directive trên template | Validator function trong code |\
| Async/dynamic | Khó | Dễ (thêm/bớt control runtime) |\
| Test | Khó (phụ thuộc DOM) | Dễ (test model trực tiếp) |\
\
```typescript\
// Reactive\
form = new FormGroup({\
  email: new FormControl(\\"\\

## Detailed Answer (EN)
Two ways to build forms in Angular:\
\
| | **Template-driven** | **Reactive** |\
|---|---|---|\
| Declaration | In the template (`ngModel`) | In the class (`FormGroup`/`FormControl`) |\
| Form model | Created implicitly by Angular | Defined explicitly by the dev |\
| Validation | Directives in the template | Validator functions in code |\
| Async/dynamic | Hard | Easy (add/remove controls at runtime) |\
| Testability | Hard (DOM-dependent) | Easy (test the model directly) |\
\
```typescript\
// Reactive\
form = new FormGroup({\
  email: new FormControl(\\"\\
