---
id: providedin-root-khac-provider-trong-component-the-nao
position: backend
technology: dependency-injection
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`providedIn: \\"root\\"` khác provider trong component thế nào?

## Question (EN)
How is `providedIn: \\"root\\"` different from a component provider?

## Đáp án chi tiết (VI)
`providedIn: \\"root\\"` đăng ký service ở root injector, thường là singleton toàn app và tree-shakable nếu không dùng.\
\
Ví dụ component provider tạo store riêng cho mỗi wizard:\
```typescript\
@Component({\
  selector: \\"app-wizard\\

## Detailed Answer (EN)
`providedIn: \\"root\\"` registers a service in the root injector, usually as an app-wide singleton and tree-shakable when unused.\
\
Component provider example creating a separate store per wizard:\
```typescript\
@Component({\
  selector: \\"app-wizard\\
