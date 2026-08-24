---
id: dtos-data-transfer-objects-la-gi-va-cach-cai-thien-kien-truc-code
position: backend
technology: laravel-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DTOs (Data Transfer Objects) là gì và cách cải thiện kiến trúc code?

## Question (EN)
What are DTOs (Data Transfer Objects) and how do they improve code architecture?

## Đáp án chi tiết (VI)
DTO là các value object đơn giản đóng gói dữ liệu request/response không có business logic, đảm bảo type safety. \
\
**Ví dụ:** `class CreateUserDTO { public function __construct(public string $name, public string $email, public int $age) {} }`. \
\
**Lợi ích:** type hinting rõ ràng thay vì unpack array mù quáng, bắt lỗi type tại compile time, self-document tham số mong muốn, IDE autocomplete đầy đủ, dễ refactor qua nhiều controller/service. Phân biệt với Eloquent model (entity DB có ORM logic). Với PHP 8.2+ readonly class, DTO trở nên bất biến và an toàn hơn: `readonly class CreateUserDTO { ... }`.

## Detailed Answer (EN)
DTOs are simple value objects encapsulating request/response data without business logic, ensuring type safety. \
\
**Example:** `class CreateUserDTO { public function __construct(public string $name, public string $email, public int $age) {} }`. \
\
**Benefits:** clear type hinting instead of blind array unpacking, catch type errors at compile time, self-document expected parameters, full IDE autocompletion, easy refactoring across controllers/services. Distinguish from Eloquent models (DB entities with ORM logic). With PHP 8.2+ readonly classes, DTOs become immutable and safer: `readonly class CreateUserDTO { ... }`.
