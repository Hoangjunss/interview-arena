---
id: doc-route-params-va-query-params-trong-angular-nhu-the-nao
position: backend
technology: routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đọc route params và query params trong Angular như thế nào?

## Question (EN)
How do you read route params and query params in Angular?

## Đáp án chi tiết (VI)
Cách hiện đại nên ưu tiên `withComponentInputBinding()` nếu param map trực tiếp vào input. Khi cần đọc router state phức tạp, dùng `ActivatedRoute` và `paramMap`/`queryParamMap`.\
\
Ví dụ bridge route param sang signal:\
```typescript\
@Component({ template: \\"User {{ id() }}\\" })\
export class UserPage {\
  private route = inject(ActivatedRoute)\
  id = toSignal(this.route.paramMap.pipe(map(params =\u003e params.get(\\"id\\"))), {\
    initialValue: null,\
  })\
}\
```\
Snapshot chỉ phù hợp khi param không đổi trong lifetime component. Nếu route reuse và param có thể đổi, dùng stream hoặc component input binding.

## Detailed Answer (EN)
Prefer `withComponentInputBinding()` when route params map directly to component inputs. When you need more complex router state, use `ActivatedRoute` and `paramMap`/`queryParamMap`.\
\
Bridge route params to a signal:\
```typescript\
@Component({ template: \\"User {{ id() }}\\" })\
export class UserPage {\
  private route = inject(ActivatedRoute)\
  id = toSignal(this.route.paramMap.pipe(map(params =\u003e params.get(\\"id\\"))), {\
    initialValue: null,\
  })\
}\
```\
A snapshot is fine only when params do not change during the component lifetime. If the route is reused and params can change, use streams or component input binding.
