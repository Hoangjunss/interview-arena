---
id: type-hinting-trong-php-la-gi-va-tai-sao-quan-trong
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Type hinting trong PHP là gì và tại sao quan trọng?

## Question (EN)
What is type hinting and why is it important?

## Đáp án chi tiết (VI)
Type hinting chỉ định kiểu dữ liệu kỳ vọng của tham số và kiểu trả về: `function getUserById(int $id): User { ... }`. \
\
**Lợi ích:** phát hiện lỗi sớm (truyền string thay vì int sẽ báo lỗi ngay), cải thiện khả năng đọc code, hỗ trợ IDE autocomplete, và đóng vai trò tài liệu. Kiểu scalar: int, string, float, bool. Kiểu object: tên class. Nullable: `?int` cho phép int hoặc null. PHP 8.0+ bổ sung union types (`int|string`), PHP 8.1 thêm intersection types (`A\u0026B`) và never type, PHP 8.2 thêm DNF types (`(A\u0026B)|null`). Type hint không bắt buộc nhưng rất khuyến nghị cho code dễ bảo trì.

## Detailed Answer (EN)
Type hinting specifies expected parameter and return types: `function getUserById(int $id): User { ... }`. \
\
**Benefits:** catch errors early (passing string instead of int fails immediately), improve code readability, enable IDE autocompletion, and serve as documentation. Scalar types: int, string, float, bool. Object types: class names. Nullable: `?int` allows int or null. PHP 8.0+ adds union types (`int|string`), PHP 8.1 adds intersection types (`A\u0026B`) and the never type, PHP 8.2 adds DNF types (`(A\u0026B)|null`). Type hints are optional but highly recommended for maintainable code.
