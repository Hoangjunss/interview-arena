---
id: superglobal-trong-php-la-gi-cho-vi-du
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Superglobal trong PHP là gì? Cho ví dụ.

## Question (EN)
What are PHP superglobals? Give examples.

## Đáp án chi tiết (VI)
Superglobal là các biến được PHP định nghĩa sẵn, có thể truy cập ở bất kỳ đâu trong script mà không cần khai báo `global`. Các superglobal quan trọng: `$_GET` (dữ liệu gửi qua URL), `$_POST` (dữ liệu gửi ẩn qua form), `$_SERVER` (thông tin server), `$_FILES` (file được upload), `$_COOKIE` (dữ liệu cookie), `$_SESSION` (lưu trữ session), `$GLOBALS` (chứa tất cả biến toàn cục). PHP tự động gán giá trị cho các biến này và có thể dùng trong mọi hàm hay phạm vi.

## Detailed Answer (EN)
Superglobals are pre-defined variables available everywhere in a script without declaring global. The most important ones are: `$_GET` (collects form data sent via URL), `$_POST` (collects form data sent hidden), `$_SERVER` (contains server and execution environment info), `$_FILES` (contains uploaded files), `$_COOKIE` (contains cookie data), `$_SESSION` (stores user data across pages), and `$GLOBALS` (contains all global variables). These variables are automatically populated by PHP and can be accessed from any function or scope.
