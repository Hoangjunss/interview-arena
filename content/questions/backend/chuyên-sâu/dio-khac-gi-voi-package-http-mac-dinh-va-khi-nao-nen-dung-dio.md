---
id: dio-khac-gi-voi-package-http-mac-dinh-va-khi-nao-nen-dung-dio
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dio khác gì với package `http` mặc định và khi nào nên dùng Dio?

## Question (EN)
How does Dio differ from the default `http` package and when should you use it?

## Đáp án chi tiết (VI)
Package `http` là HTTP client đơn giản, đủ dùng cho request cơ bản. Dio là HTTP client mạnh hơn với: interceptor (middleware để log, thêm token tự động, retry), request/response transformer, quản lý timeout chi tiết, upload file multipart, download file với progress tracking, và cancel token. Kết hợp với Retrofit để tạo type-safe API client từ annotation. Dùng `http` khi app nhỏ, đơn giản. Dùng Dio khi cần interceptor cho auth, logging, hoặc error handling nhất quán trên toàn app.

## Detailed Answer (EN)
The `http` package is a simple HTTP client for basic requests. Dio adds interceptors (middleware for logging, auto-adding auth tokens, retries), request/response transformation, file uploads with progress tracking, and cancel tokens. Pair with Retrofit for annotation-based, type-safe API clients. Use `http` for small apps; use Dio when you need auth interceptors, consistent error handling, or file operations.
