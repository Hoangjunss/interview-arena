---
id: lifecycle-hooks-trong-angular-chay-theo-thu-tu-nao-va-dung-khi-nao
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lifecycle hooks trong Angular chạy theo thứ tự nào và dùng khi nào?

## Question (EN)
What is the Angular lifecycle hook order and when should each hook be used?

## Đáp án chi tiết (VI)
Các hook hay gặp: `ngOnChanges` chạy khi input đổi, lần đầu chạy trước `ngOnInit`; `ngOnInit` chạy một lần sau khi input initial xong; `ngAfterViewInit` dùng khi view/query đã sẵn sàng; `ngOnDestroy` hoặc `DestroyRef` dùng cleanup.\
\
Ví dụ cleanup hiện đại:\
```typescript\
@Component({ template: \\"{{ userId() }}\\" })\
export class UserPage {\
  userId = input.required\u003cstring\u003e()\
\
  constructor() {\
    inject(DestroyRef).onDestroy(() =\u003e console.log(\\"cleanup\\"))\
  }\
}\
```\
Từ Angular hiện đại, `afterNextRender`/`afterEveryRender` phù hợp cho DOM work sau render và không chạy trong SSR/prerender.

## Detailed Answer (EN)
Common hooks: `ngOnChanges` runs when inputs change and its first run happens before `ngOnInit`; `ngOnInit` runs once after initial inputs are set; `ngAfterViewInit` is for ready view/query state; `ngOnDestroy` or `DestroyRef` is for cleanup.\
\
Modern cleanup example:\
```typescript\
@Component({ template: \\"{{ userId() }}\\" })\
export class UserPage {\
  userId = input.required\u003cstring\u003e()\
\
  constructor() {\
    inject(DestroyRef).onDestroy(() =\u003e console.log(\\"cleanup\\"))\
  }\
}\
```\
In modern Angular, `afterNextRender`/`afterEveryRender` fit DOM work after rendering and do not run during SSR/prerender.
