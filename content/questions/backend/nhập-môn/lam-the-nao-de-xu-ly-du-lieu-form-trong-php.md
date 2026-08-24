---
id: lam-the-nao-de-xu-ly-du-lieu-form-trong-php
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để xử lý dữ liệu form trong PHP?

## Question (EN)
How do you handle form data in PHP?

## Đáp án chi tiết (VI)
Truy cập dữ liệu form qua superglobal: method GET dùng `$_GET[\\"fieldname\\"]`, POST dùng `$_POST[\\"fieldname\\"]`. Luôn validate và sanitize: kiểm tra tồn tại với `isset($_POST[\\"email\\"])`, validate định dạng với `filter_var()`, escape output với `htmlspecialchars()` để ngăn XSS. \
\
**Ví dụ:** `$email = htmlspecialchars($_POST[\\"email\\"]); if(filter_var($email, FILTER_VALIDATE_EMAIL)) { // hợp lệ }`. Không bao giờ tin tưởng dữ liệu từ người dùng—luôn validate trước khi sử dụng.

## Detailed Answer (EN)
Access form data using superglobals: for GET method use `$_GET[\\"fieldname\\"]`, for POST use `$_POST[\\"fieldname\\"]`. Always validate and sanitize: check if data exists with `isset($_POST[\\"email\\"])`, validate format with `filter_var()`, escape output with `htmlspecialchars()` to prevent XSS. \
\
**Example:** `$email = htmlspecialchars($_POST[\\"email\\"]); if(filter_var($email, FILTER_VALIDATE_EMAIL)) { // valid }`. Never trust user input—always validate before using.
