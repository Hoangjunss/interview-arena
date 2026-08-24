---
id: nullable-type-type-trong-php-la-gi
position: backend
technology: kiểu-dữ-liệu
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nullable type (`?type`) trong PHP là gì?

## Question (EN)
What is a nullable type (`?type`) in PHP?

## Đáp án chi tiết (VI)
`?T` khai báo giá trị **hoặc là kiểu `T`, hoặc là `null`**. Dùng được cho tham số, kiểu trả về, và property (từ 7.4). Đây là ràng buộc rõ ràng: `?int` nhận `int` hoặc `null`, nhưng **không** nhận string.\
\
```php\
function find(?int $id): ?User {   // nhận int|null, trả User|null\
  if ($id === null) return null;\
  return User::find($id);\
}\
```\
\
- Từ PHP 8, `?T` tương đương union `T|null` — có thể viết `int|null` cho rõ nghĩa hơn khi union nhiều kiểu.\
- **Khác với tham số optional:** `?int $id` vẫn **bắt buộc truyền** (truyền `null` được); còn `int $id = 0` mới là có default và được phép bỏ trống.\
- Khi hàm trả `?User`, caller **phải xử lý null** để tránh lỗi gọi method trên `null`.

## Detailed Answer (EN)
`?T` declares a value that is **either type `T` or `null`**. It works for parameters, return types, and properties (since 7.4). It is an explicit contract: `?int` accepts `int` or `null`, but **not** a string.\
\
```php\
function find(?int $id): ?User {   // accepts int|null, returns User|null\
  if ($id === null) return null;\
  return User::find($id);\
}\
```\
\
- Since PHP 8, `?T` is equivalent to the union `T|null` — you can write `int|null`, which reads clearer when unioning several types.\
- **Different from an optional parameter:** `?int $id` is still **required** (you may pass `null`); only `int $id = 0` has a default and may be omitted.\
- When a function returns `?User`, the caller **must handle null** to avoid calling a method on `null`.
