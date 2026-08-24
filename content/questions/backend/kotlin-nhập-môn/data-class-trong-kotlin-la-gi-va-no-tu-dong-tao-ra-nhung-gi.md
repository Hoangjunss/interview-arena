---
id: data-class-trong-kotlin-la-gi-va-no-tu-dong-tao-ra-nhung-gi
position: backend
technology: kotlin-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Data class trong Kotlin là gì và nó tự động tạo ra những gì?

## Question (EN)
What is a data class in Kotlin and what does it auto-generate?

## Đáp án chi tiết (VI)
Data class tự động sinh ra các method boilerplate như `equals()`, `hashCode()`, `toString()` và `copy()`. Data class cần ít nhất một tham số trong constructor và rất phù hợp để chứa dữ liệu (như response API hay model database). Chúng không thể là abstract, open, sealed, hay inner class, và tất cả tham số constructor phải được đánh dấu `val` hoặc `var`.

## Detailed Answer (EN)
A data class automatically generates boilerplate methods like `equals()`, `hashCode()`, `toString()`, and `copy()`. Data classes require at least one constructor parameter and are perfect for holding data (like API responses or database models). They cannot be abstract, open, sealed, or inner classes, and all constructor parameters must be marked as `val` or `var`.
