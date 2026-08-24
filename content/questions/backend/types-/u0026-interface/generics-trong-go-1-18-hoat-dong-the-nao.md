---
id: generics-trong-go-1-18-hoat-dong-the-nao
position: backend
technology: types-\u0026-interface
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generics trong Go (1.18+) hoạt động thế nào?

## Question (EN)
How do generics work in Go 1.18+?

## Đáp án chi tiết (VI)
Generics cho phép viết function và type hoạt động với nhiều kiểu dữ liệu mà không cần lặp code, ví dụ `func Map[T any, U any](s []T, f func(T) U) []U` nhận slice bất kỳ và trả về slice đã transform. Type parameters được khai báo trong dấu ngoặc vuông `[]`, kèm constraints để giới hạn kiểu được chấp nhận như `any`, `comparable`, hoặc custom interface constraints kiểu `type Number interface { int | float64 }`. Trước Go 1.18, muốn viết hàm generic phải dùng `interface{}` rồi type assertion, vừa mất type safety vừa verbose; generics giải quyết triệt để vấn đề này.

## Detailed Answer (EN)
Generics let you write functions and types that work with multiple data types without code duplication. For example, `func Map[T any, U any](s []T, f func(T) U) []U` accepts a slice of any type and returns a transformed slice. Type parameters are declared in square brackets `[]` with constraints that restrict accepted types: `any`, `comparable`, or custom interface constraints like `type Number interface { int | float64 }`. Before Go 1.18, generic behavior required `interface{}` with type assertions — sacrificing type safety and readability. Generics solve this cleanly.
