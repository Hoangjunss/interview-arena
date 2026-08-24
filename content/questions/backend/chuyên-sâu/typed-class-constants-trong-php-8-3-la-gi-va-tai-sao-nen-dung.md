---
id: typed-class-constants-trong-php-8-3-la-gi-va-tai-sao-nen-dung
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Typed class constants trong PHP 8.3 là gì và tại sao nên dùng?

## Question (EN)
What are typed class constants in PHP 8.3 and why are they useful?

## Đáp án chi tiết (VI)
Typed class constants cho phép khai báo kiểu dữ liệu cho hằng số trong class, tương tự typed properties. \
\
**Ví dụ:** `public const int MAX_USERS = 1000;` hoặc `public const string API_KEY = \\"secret\\";`. \
\
**Lợi ích:** tăng type safety, IDE autocomplete chính xác hơn, ngăn nhầm kiểu dữ liệu vô tình, tự document code. Kiểu phải khớp với giá trị gán tại thời điểm khai báo—PHP sẽ báo lỗi nếu không khớp. Đây là tính năng nhỏ nhưng quan trọng giúp codebase PHP lớn dễ bảo trì hơn.

## Detailed Answer (EN)
Typed class constants allow declaring the type of a class constant, similar to typed properties. \
\
**Example:** `public const int MAX_USERS = 1000;` or `public const string API_KEY = \\"secret\\";`. \
\
**Benefits:** improved type safety, better IDE autocompletion, prevent accidental type mismatches, self-documenting code. The type must match the assigned value at declaration time—PHP will error on mismatch. A small but important feature that makes large PHP codebases more maintainable.
