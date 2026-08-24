---
id: modifier-trong-jetpack-compose-la-gi-cho-vi-du
position: backend
technology: jetpack-compose
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Modifier trong Jetpack Compose là gì? Cho ví dụ.

## Question (EN)
What is a Modifier in Jetpack Compose and give examples.

## Đáp án chi tiết (VI)
Modifier là object có thể chain lại để thêm behavior, styling, hay layout cho composable. \
\
**Ví dụ:** `.size(100.dp)`, `.background(Color.Blue)`, `.padding(16.dp)`, `.clickable { }`, `.weight(1f)`. Thứ tự quan trọng vì modifier chain từ trái sang phải: `.padding().background()` khác với `.background().padding()`. Modifier là lập trình hàm ứng dụng tốt nhất, kết hợp các behavior nhỏ thành behavior phức tạp.

## Detailed Answer (EN)
Modifiers are chainable objects that add behavior, styling, or layout to composables. Examples: `.size(100.dp)`, `.background(Color.Blue)`, `.padding(16.dp)`, `.clickable { }`, `.weight(1f)`. Order matters because modifiers chain left to right: `.padding().background()` is different from `.background().padding()`. Modifiers compose small behaviors into complex ones.
