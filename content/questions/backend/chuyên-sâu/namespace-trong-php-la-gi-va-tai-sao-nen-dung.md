---
id: namespace-trong-php-la-gi-va-tai-sao-nen-dung
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Namespace trong PHP là gì và tại sao nên dùng?

## Question (EN)
What are namespaces and why should you use them?

## Đáp án chi tiết (VI)
Namespace tổ chức code và tránh xung đột tên. Khai báo với `namespace MyApp\\\\Models;` ở đầu file. Nhiều class có thể cùng tên nếu ở namespace khác nhau: `MyApp\\\\Models\\\\User` và `Admin\\\\Models\\\\User`. Import bằng `use MyApp\\\\Models\\\\User as MyUser;`. \
\
**Lợi ích:** tổ chức codebase lớn một cách logic, ngăn ô nhiễm global namespace, cho phép autoloading theo chuẩn PSR, cải thiện khả năng bảo trì. Nếu không có namespace, toàn bộ code cạnh tranh trong global namespace gây ra xung đột.

## Detailed Answer (EN)
Namespaces organize code and avoid naming conflicts. Define with `namespace MyApp\\\\Models;` at the top of file. Multiple classes can have same name if in different namespaces: `MyApp\\\\Models\\\\User` vs `Admin\\\\Models\\\\User`. Import with `use MyApp\\\\Models\\\\User as MyUser;`. \
\
**Benefits:** organize large codebases logically, prevent global namespace pollution, enable autoloading with PSR standards, improve code maintainability. Without namespaces, all code competes for global name space causing conflicts.
