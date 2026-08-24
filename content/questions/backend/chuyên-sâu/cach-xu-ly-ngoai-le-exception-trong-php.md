---
id: cach-xu-ly-ngoai-le-exception-trong-php
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách xử lý ngoại lệ (exception) trong PHP?

## Question (EN)
How do you handle exceptions in PHP?

## Đáp án chi tiết (VI)
Dùng khối try-catch-finally: `try { code có thể lỗi; } catch(Exception $e) { xử lý lỗi; } finally { code dọn dẹp; }`. Ném ngoại lệ tùy chỉnh: `throw new Exception(\\"Không tìm thấy user\\");`. Tạo class exception riêng bằng cách extends `Exception` để phân loại lỗi cụ thể. Khối `finally` luôn chạy dù có exception hay không. \
\
**Lưu ý quan trọng:** `fopen()` không throw Exception—nó trả về `false` hoặc phát sinh Warning. Để bắt lỗi fopen như exception, cần dùng custom error handler hoặc gói `ErrorException`. \
\
**Ví dụ đúng:** `throw new RuntimeException(\\"Không tìm thấy file missing.txt\\");` khi cần exception thực sự. Xử lý exception đúng cách ngăn crash và cung cấp thông tin lỗi có ý nghĩa.

## Detailed Answer (EN)
Use try-catch-finally blocks: `try { code that might fail; } catch(Exception $e) { handle error; } finally { cleanup code; }`. Throw custom exceptions: `throw new Exception(\\"User not found\\");`. Create custom exception classes extending `Exception` for specific error types. The finally block always runs regardless of exception. \
\
**Important:** `fopen()` does NOT throw an Exception — it returns `false` or emits a Warning. To catch file errors as exceptions, use a custom `set_error_handler()` that converts warnings to `ErrorException`, or explicitly throw: `throw new RuntimeException(\\"File not found\\");`. Proper exception handling prevents crashes and provides meaningful error information.
