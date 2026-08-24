---
id: getit-la-gi-va-lien-quan-den-state-management-nhu-the-nao
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`GetIt` là gì và liên quan đến state management như thế nào?

## Question (EN)
What is `GetIt` and how does it relate to state management?

## Đáp án chi tiết (VI)
`GetIt` là service locator cho dependency injection. Bạn đăng ký singleton hoặc factory: `getIt.registerSingleton\u003cRepository\u003e(Repository())`, rồi truy cập ở bất kỳ đâu: `getIt\u003cRepository\u003e()`. Bản thân nó không phải state management mà giúp clean architecture bằng cách quản lý dependency. Thường dùng kết hợp BLoC hoặc Riverpod để inject repository và service vào business logic.

## Detailed Answer (EN)
`GetIt` is a service locator for dependency injection. Register singletons or factories and access them anywhere in the app. It's not state management itself but enables clean architecture by managing dependencies, often used alongside BLoC or Riverpod.
