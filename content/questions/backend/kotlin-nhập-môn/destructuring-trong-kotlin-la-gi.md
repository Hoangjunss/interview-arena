---
id: destructuring-trong-kotlin-la-gi
position: backend
technology: kotlin-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Destructuring trong Kotlin là gì?

## Question (EN)
Explain destructuring in Kotlin.

## Đáp án chi tiết (VI)
Destructuring cho phép bạn tách một object thành các biến riêng lẻ trong một câu lệnh duy nhất. Ví dụ `val (name, age) = person` trích xuất thuộc tính từ data class. Cũng có thể dùng trong vòng lặp: `for ((key, value) in map)`. Hoạt động với data class, Pair, List, và rất hữu ích để code dễ đọc hơn khi làm việc với nhiều giá trị.

## Detailed Answer (EN)
Destructuring allows you to break down an object into individual variables in a single statement. For example, `val (name, age) = person` extracts properties from a data class. You can also destructure in loops: `for ((key, value) in map)`. This works with data classes, pairs, lists, and makes code more readable when working with multiple values.
