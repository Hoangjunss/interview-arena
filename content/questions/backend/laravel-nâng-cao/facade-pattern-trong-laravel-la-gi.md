---
id: facade-pattern-trong-laravel-la-gi
position: backend
technology: laravel-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Facade pattern trong Laravel là gì?

## Question (EN)
What is the Laravel facade pattern?

## Đáp án chi tiết (VI)
Facade cung cấp giao diện giống static đến các service trong container. `Auth::user()` gọi authentication service bên dưới theo kiểu static. Các facade khác: `DB::table()`, `Cache::get()`, `Mail::send()`. Bên dưới: facade `Auth` resolve thành `\\\\Illuminate\\\\Auth\\\\AuthManager` từ container. \
\
**Ưu điểm:** cú pháp static tiện lợi, vẫn có thể inject dependency, ý định rõ ràng, dễ mock trong test. Thay vì inject `AuthManager` khắp nơi, dùng `Auth::user()`. Tạo custom facade: extend class `Facade` và định nghĩa `getFacadeAccessor()` trả về key trong container. Facade cân bằng sự tiện lợi với lợi ích của dependency injection.

## Detailed Answer (EN)
Facades provide static-like interface to underlying services in container. `Auth::user()` calls underlying authentication service statically. Other facades: `DB::table()`, `Cache::get()`, `Mail::send()`. Behind scenes: `Auth` facade resolves to `\\\\Illuminate\\\\Auth\\\\AuthManager` from container. \
\
**Advantages:** convenient static syntax, still dependency-injectable, clear intent, easy to mock in tests. \
\
**Example:** instead of injecting `AuthManager` everywhere, use `Auth::user()`. Create custom facade: extend `Facade` class and define `getFacadeAccessor()` returning container key. Facades balance convenience (static look) with dependency injection benefits.
