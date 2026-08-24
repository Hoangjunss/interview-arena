---
id: giai-thich-null-safety-trong-kotlin-va-su-khac-biet-giua-kieu-nullable-va-non-nu
position: backend
technology: kotlin-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích null safety trong Kotlin và sự khác biệt giữa kiểu nullable và non-nullable.

## Question (EN)
Explain Kotlin null safety and the difference between nullable and non-nullable types.

## Đáp án chi tiết (VI)
Trong Kotlin, biến mặc định không được phép null để loại bỏ NullPointerException. Muốn cho phép null, bạn khai báo kiểu nullable bằng `?` (ví dụ `String?`). Compiler bắt buộc bạn xử lý null ngay lúc biên dịch qua các toán tử như `?.` (safe call) hoặc `!!` (ép buộc). Điều này giúp các lỗi liên quan đến null không thể lọt qua bước compile.

## Detailed Answer (EN)
In Kotlin, variables are non-nullable by default to eliminate NullPointerException. To allow null values, declare a nullable type with `?` (e.g., `String?`). The compiler forces you to handle null cases at compile-time using safe operators like `?.` (safe call) or `!!` (unsafe cast). This makes null-related bugs impossible to pass compilation.
