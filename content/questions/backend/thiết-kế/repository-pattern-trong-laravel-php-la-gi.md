---
id: repository-pattern-trong-laravel-php-la-gi
position: backend
technology: thiết-kế
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Repository pattern trong Laravel/PHP là gì?

## Question (EN)
What is the Repository pattern in Laravel/PHP?

## Đáp án chi tiết (VI)
Theo Fowler (PoEAA), **Repository** là lớp trung gian **giữa domain và tầng truy vấn dữ liệu**, cung cấp API kiểu collection (`find`, `save`, `findByEmail`) và **giấu chi tiết** Eloquent/SQL bên dưới. Business logic chỉ nói chuyện với repository, không viết query trực tiếp.\
\
```php\
interface UserRepository {\
  public function findByEmail(string $email): ?User;\
}\
\
class EloquentUserRepository implements UserRepository {\
  public function findByEmail(string $email): ?User {\
    return User::where('email', $email)-\u003efirst();\
  }\
}\
// bind interface -\u003e implementation trong service container\
```\
\
- **Lợi:** tách logic khỏi ORM, dễ đổi nguồn dữ liệu, dễ **mock** interface khi test.\
- **YAGNI:** Eloquent model đã là active-record sẵn; phủ một lớp repository lên nó thường là **abstraction thừa** trừ khi bạn thực sự cần đổi nguồn hoặc test không đụng DB. Đừng thêm chỉ vì \\"cho đúng pattern\\".

## Detailed Answer (EN)
Per Fowler (PoEAA), a **Repository** mediates **between the domain and the data-mapping layer**, exposing a collection-like API (`find`, `save`, `findByEmail`) and **hiding** the Eloquent/SQL details underneath. Business logic talks only to the repository, never writing queries directly.\
\
```php\
interface UserRepository {\
  public function findByEmail(string $email): ?User;\
}\
\
class EloquentUserRepository implements UserRepository {\
  public function findByEmail(string $email): ?User {\
    return User::where('email', $email)-\u003efirst();\
  }\
}\
// bind interface -\u003e implementation in the service container\
```\
\
- **Benefits:** decouples logic from the ORM, eases swapping the data source, and makes the interface easy to **mock** in tests.\
- **YAGNI:** Eloquent models are already active-record; wrapping a repository over them is often a **needless abstraction** unless you genuinely need to swap sources or test without a DB. Don’t add one just \\"for the pattern\\".
