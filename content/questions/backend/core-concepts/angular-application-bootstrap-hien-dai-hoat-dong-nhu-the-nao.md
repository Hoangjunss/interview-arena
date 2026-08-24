---
id: angular-application-bootstrap-hien-dai-hoat-dong-nhu-the-nao
position: backend
technology: core-concepts
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Angular application bootstrap hiện đại hoạt động như thế nào?

## Question (EN)
How does modern Angular application bootstrapping work?

## Đáp án chi tiết (VI)
Với standalone app, entrypoint thường gọi `bootstrapApplication(AppComponent, appConfig)`.\
\
Ví dụ cấu hình root phổ biến:\
```typescript\
bootstrapApplication(AppComponent, {\
  providers: [\
    provideRouter(routes),\
    provideHttpClient(),\
  ],\
})\
```\
Cách này thay thế pattern cũ `platformBrowserDynamic().bootstrapModule(AppModule)` trong nhiều project mới, giúp root configuration nằm trong provider functions tree-shakable và dễ tách theo môi trường.

## Detailed Answer (EN)
In a standalone app, the entrypoint typically calls `bootstrapApplication(AppComponent, appConfig)`.\
\
Common root configuration:\
```typescript\
bootstrapApplication(AppComponent, {\
  providers: [\
    provideRouter(routes),\
    provideHttpClient(),\
  ],\
})\
```\
This replaces the older `platformBrowserDynamic().bootstrapModule(AppModule)` pattern in many new projects, keeping root configuration in tree-shakable provider functions that are easier to split by environment.
