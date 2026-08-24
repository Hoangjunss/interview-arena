---
id: dependency-injection-la-gi-va-cach-trien-khai-trong-flutter
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency injection là gì và cách triển khai trong Flutter?

## Question (EN)
What is dependency injection and how do you implement it in Flutter?

## Đáp án chi tiết (VI)
Dependency injection là truyền dependency (service, repository) vào class thay vì tạo chúng bên trong. Thay vì `class UserBloc { final repo = UserRepository(); }`, hãy inject: `class UserBloc { UserBloc(this.repo); final UserRepository repo; }`. Điều này cho phép test (mock repository) và linh hoạt (hoán đổi implementation). Dùng `GetIt` cho service locator pattern hoặc truyền dependency qua constructor.

## Detailed Answer (EN)
Dependency injection is passing dependencies into a class instead of creating them inside. This enables testing with mocked dependencies and flexibility to swap implementations. Use `GetIt` for service locator pattern or pass dependencies through constructor chains.
