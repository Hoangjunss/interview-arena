---
id: php-co-nhung-kieu-du-lieu-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PHP có những kiểu dữ liệu nào?

## Question (EN)
What are PHP data types and what are the main ones?

## Đáp án chi tiết (VI)
PHP có 8 kiểu dữ liệu cơ bản: String (chuỗi như \\"Hello\\"), Integer (số nguyên), Float (số thập phân), Boolean (true/false), Array (tập hợp giá trị), Object (thực thể của lớp), NULL (không có giá trị), và Resource (tham chiếu tài nguyên bên ngoài). Bốn kiểu đầu là scalar (kiểu đơn giản), Array và Object là kiểu phức hợp, NULL là kiểu đặc biệt, còn Resource dùng cho kết nối database hay file handle. PHP 8.1+ bổ sung Enum như là first-class type với type safety đầy đủ, cùng với union types (8.0: `int|string`), intersection types (8.1: `A\u0026B`), và never type (8.1).

## Detailed Answer (EN)
PHP has 8 core data types: String (text like \\"Hello\\"), Integer (whole numbers without decimals), Float (numbers with decimals), Boolean (true/false), Array (collection of values), Object (instance of a class), NULL (no value), and Resource (reference to external resource). The first four are scalars (simple types), Array and Object are compound types, NULL is special, and Resource is used for database connections and file handles. PHP 8.1+ adds Enum as a first-class type with full type safety, along with union types (8.0: `int|string`), intersection types (8.1: `A\u0026B`), and the never type (8.1).
