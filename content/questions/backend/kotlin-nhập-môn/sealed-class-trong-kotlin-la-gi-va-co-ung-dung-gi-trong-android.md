---
id: sealed-class-trong-kotlin-la-gi-va-co-ung-dung-gi-trong-android
position: backend
technology: kotlin-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sealed class trong Kotlin là gì và có ứng dụng gì trong Android?

## Question (EN)
Explain sealed classes and their use case in Android.

## Đáp án chi tiết (VI)
Sealed class giới hạn một class hierarchy thành tập hợp subclass cố định, được định nghĩa trong cùng một file hoặc package. Rất phù hợp để biểu diễn các trạng thái giới hạn như response API (Success/Error/Loading). Khi dùng với `when`, compiler bắt buộc xử lý hết tất cả subclass, không cần nhánh `else`, giúp code an toàn hơn rất nhiều.

## Detailed Answer (EN)
Sealed classes restrict a class hierarchy to a known set of subclasses defined in the same file or package. They're perfect for representing restricted type hierarchies like API responses (Success/Error/Loading). When used with `when` expressions, the compiler forces you to handle all possible subclasses, eliminating the need for an `else` clause.
