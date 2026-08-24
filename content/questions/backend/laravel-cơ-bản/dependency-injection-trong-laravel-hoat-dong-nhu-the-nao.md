---
id: dependency-injection-trong-laravel-hoat-dong-nhu-the-nao
position: backend
technology: laravel-cơ-bản
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency injection trong Laravel hoạt động như thế nào?

## Question (EN)
What is dependency injection in Laravel?

## Đáp án chi tiết (VI)
Dependency injection tự động cung cấp các dependency cần thiết cho class. Thay vì `new UserRepository()` bên trong controller, type-hint trong method: `public function index(UserRepository $repo) { return $repo-\u003eall(); }`. Service container của Laravel tự động khởi tạo và inject class. \
\
**Lợi ích:** dễ test hơn (inject mock repository), coupling lỏng lẻo (đổi implementation mà không sửa controller), code gọn hơn. Laravel xử lý injection tự động cho route controller, middleware, commands. Giúp code linh hoạt và dễ test mà không cần khởi tạo thủ công.

## Detailed Answer (EN)
Dependency injection automatically provides required dependencies to classes. Instead of `new UserRepository()` inside controller, type-hint in method: `public function index(UserRepository $repo) { return $repo-\u003eall(); }`. Laravel's service container automatically instantiates and injects the class. \
\
**Benefits:** easier testing (inject mock repository), loose coupling (change implementation without modifying controller), cleaner code. Laravel handles injection automatically for route controllers, middleware, commands. Makes code flexible and testable without manual instantiation.
