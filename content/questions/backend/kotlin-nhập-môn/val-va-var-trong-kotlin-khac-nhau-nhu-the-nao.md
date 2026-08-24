---
id: val-va-var-trong-kotlin-khac-nhau-nhu-the-nao
position: backend
technology: kotlin-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`val` và `var` trong Kotlin khác nhau như thế nào?

## Question (EN)
What is the difference between `val` and `var` in Kotlin?

## Đáp án chi tiết (VI)
`val` khai báo biến chỉ đọc, không thể gán lại sau khi khởi tạo (tương tự `final` trong Java), còn `var` khai báo biến có thể thay đổi giá trị. Dùng `val` làm mặc định giúp code an toàn hơn và phù hợp với nguyên tắc immutability trong kiến trúc MVVM. Kotlin compiler khuyến khích dùng `val` ở mọi nơi có thể.

## Detailed Answer (EN)
`val` declares a read-only variable that cannot be reassigned after initialization (like `final` in Java), while `var` declares a mutable variable. Using `val` by default improves code safety and aligns with immutability principles used in MVVM architectures. The Kotlin compiler encourages using `val` everywhere possible.
