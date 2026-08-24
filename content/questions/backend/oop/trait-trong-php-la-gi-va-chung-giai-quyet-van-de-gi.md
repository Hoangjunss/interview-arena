---
id: trait-trong-php-la-gi-va-chung-giai-quyet-van-de-gi
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trait trong PHP là gì và chúng giải quyết vấn đề gì?

## Question (EN)
What are Traits in PHP and how do they solve problems?

## Đáp án chi tiết (VI)
Trait cho phép tái sử dụng phương thức trong nhiều class không liên quan mà không cần kế thừa. Khai báo: `trait Logger { public function log($msg) { echo $msg; } }`. Dùng trong bất kỳ class nào: `class User { use Logger; }` và `class Product { use Logger; }` thì cả hai đều có phương thức log. Trait giải quyết vấn đề trùng lặp code khi nhiều class cần chức năng giống nhau nhưng không chia sẻ class cha. Chúng giống như tái sử dụng \\"ngang\\" trong khi kế thừa là tái sử dụng \\"dọc\\".

## Detailed Answer (EN)
Traits allow reusing methods in multiple unrelated classes without inheritance. Define with `trait Logger { public function log($msg) { echo $msg; } }`. Use in any class: `class User { use Logger; }` and `class Product { use Logger; }` now both have the log method. Traits solve the problem of code duplication when multiple classes need the same functionality but don't share a parent. They're like \\"horizontal\\" reuse versus inheritance's \\"vertical\\" reuse.
