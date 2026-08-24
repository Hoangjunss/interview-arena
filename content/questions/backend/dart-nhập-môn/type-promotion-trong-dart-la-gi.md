---
id: type-promotion-trong-dart-la-gi
position: backend
technology: dart-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Type promotion trong Dart là gì?

## Question (EN)
What is type promotion in Dart?

## Đáp án chi tiết (VI)
Type promotion là khi Dart tự động thu hẹp kiểu của biến dựa trên luồng điều khiển. Nếu bạn có `String?` và kiểm tra `if (name != null)`, trong khối đó Dart coi `name` là `String` non-nullable mà không cần `!`. Điều này xảy ra tự động với kiểm tra null, `is` checks, và toán tử logic, giúp giảm boilerplate.

## Detailed Answer (EN)
Type promotion is when Dart narrows a variable's type based on control flow. If you have a nullable `String?` and check `if (name != null)`, inside that block Dart treats `name` as non-nullable `String` without needing `!`. This happens automatically with null checks, `is` checks, and logical operators.
