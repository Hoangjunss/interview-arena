---
id: nen-dat-code-khoi-tao-o-constructor-hay-ngoninit-vi-sao
position: backend
technology: lifecycle
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nên đặt code khởi tạo ở `constructor` hay `ngOnInit`? Vì sao?

## Question (EN)
Should initialization code go in the `constructor` or `ngOnInit`? Why?

## Đáp án chi tiết (VI)
`constructor` là của **class TypeScript**, chạy khi Angular tạo instance — lúc này **`@Input()` chưa được gán**. `ngOnInit` là **lifecycle hook của Angular**, chạy sau lần `ngOnChanges` đầu tiên, tức là input đã sẵn sàng.\
\
```ts\
export class UserCard implements OnInit {\
  @Input() userId!: string\
  private http = inject(HttpClient)\
  user?: User\
\
  constructor() {\
    console.log(this.userId)  // undefined — input not bound yet\
  }\
\
  ngOnInit() {\
    this.http.get\u003cUser\u003e(`/api/users/${this.userId}`).subscribe(u =\u003e (this.user = u))\
  }\
}\
```\
\
Quy tắc thực tế:\
- **`constructor`**: chỉ nhận dependency (hoặc dùng `inject()`) và gán field đơn giản. Không gọi API, không đụng DOM.\
- **`ngOnInit`**: khởi tạo dựa trên input — gọi API, set up form, subscribe.\
- Cần DOM đã render (đo kích thước, focus) thì phải đợi **`ngAfterViewInit`**.\
\
Giữ `constructor` mỏng cũng giúp unit test dễ hơn: tạo component không kéo theo side effect.

## Detailed Answer (EN)
The `constructor` belongs to the **TypeScript class** and runs when Angular instantiates it — at that point **`@Input()` values are not bound yet**. `ngOnInit` is an **Angular lifecycle hook** that runs after the first `ngOnChanges`, when inputs are ready.\
\
```ts\
export class UserCard implements OnInit {\
  @Input() userId!: string\
  private http = inject(HttpClient)\
  user?: User\
\
  constructor() {\
    console.log(this.userId)  // undefined — input not bound yet\
  }\
\
  ngOnInit() {\
    this.http.get\u003cUser\u003e(`/api/users/${this.userId}`).subscribe(u =\u003e (this.user = u))\
  }\
}\
```\
\
Practical rule:\
- **`constructor`**: take dependencies (or use `inject()`) and set trivial fields. No HTTP calls, no DOM access.\
- **`ngOnInit`**: initialization that depends on inputs — fetch data, build forms, subscribe.\
- Anything needing rendered DOM (measuring, focusing) must wait for **`ngAfterViewInit`**.\
\
A thin constructor also makes unit tests easier: creating the component causes no side effects.
