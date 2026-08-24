---
id: cac-loai-loi-trong-php-la-gi-va-cach-xu-ly-chung
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các loại lỗi trong PHP là gì và cách xử lý chúng?

## Question (EN)
What are PHP error types and how are they handled?

## Đáp án chi tiết (VI)
PHP có ba loại lỗi truyền thống: Notice (không nghiêm trọng, không dừng script như truy cập biến chưa định nghĩa), Warning (nghiêm trọng hơn nhưng script vẫn chạy như mở file không hợp lệ), và Fatal error (nghiêm trọng, dừng thực thi như gọi hàm chưa định nghĩa). PHP 7+ bổ sung hệ thống Error class: `Error` và `Exception` đều implement `Throwable`, bao gồm `TypeError`, `ValueError`, `ParseError`. Xử lý lỗi bằng: `error_reporting(E_ALL)` hiển thị mọi lỗi, `set_error_handler()` xử lý tùy chỉnh, hoặc dùng try-catch cho Throwable. Trên môi trường production, ghi lỗi vào file log thay vì hiển thị cho người dùng.

## Detailed Answer (EN)
PHP has three traditional error types: Notices (non-critical, script continues), Warnings (more serious but script continues), and Fatal errors (severe, stops execution). PHP 7+ added the Error class hierarchy: both `Error` and `Exception` implement `Throwable`, covering `TypeError`, `ValueError`, `ParseError`, and more. Handle errors with: `error_reporting(E_ALL)` to show all errors, `set_error_handler()` for custom handling, or try-catch blocks for any `Throwable`. In production, log errors to files instead of displaying to users.
