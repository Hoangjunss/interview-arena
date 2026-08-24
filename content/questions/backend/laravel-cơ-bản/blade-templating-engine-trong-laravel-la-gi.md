---
id: blade-templating-engine-trong-laravel-la-gi
position: backend
technology: laravel-cơ-bản
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Blade templating engine trong Laravel là gì?

## Question (EN)
What is the Blade templating engine?

## Đáp án chi tiết (VI)
Blade là engine template đơn giản nhưng đủ dùng của Laravel. Biên dịch cú pháp mustache `{{ }}` thành code PHP, được cache để tăng hiệu suất. Các directive quan trọng: `{{ $variable }}` in biến (đã escape), `{!! $html !!}` in HTML thô, `@if`, `@foreach`, `@for` cho cấu trúc điều khiển, `@include(\\"template\\")` nhúng view khác, `@yield(\\"content\\")` trong layouts. \
\
**Ví dụ:** `@foreach($users as $user) \u003cp\u003e{{ $user-\u003ename }}\u003c/p\u003e @endforeach`. Blade tách biệt trình bày khỏi logic, cải thiện khả năng bảo trì và dễ đọc.

## Detailed Answer (EN)
Blade is Laravel's simple yet powerful templating engine. Compiles mustache syntax `{{ }}` into PHP code, cached for performance. Key directives: `{{ $variable }}` outputs variable (escaped), `{!! $html !!}` outputs unescaped HTML, `@if`, `@foreach`, `@for` for control structures, `@include(\\"template\\")` includes other views, `@yield(\\"content\\")` in layouts. \
\
**Example:** `@foreach($users as $user) \u003cp\u003e{{ $user-\u003ename }}\u003c/p\u003e @endforeach`. Blade separates presentation from logic, improving maintainability and readability.
