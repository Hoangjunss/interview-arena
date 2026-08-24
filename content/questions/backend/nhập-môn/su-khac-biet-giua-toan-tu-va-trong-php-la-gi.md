---
id: su-khac-biet-giua-toan-tu-va-trong-php-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa toán tử `==` và `===` trong PHP là gì?

## Question (EN)
What is the difference between == and === operators?

## Đáp án chi tiết (VI)
`==` kiểm tra giá trị có bằng nhau không nhưng cho phép chuyển đổi kiểu dữ liệu. Ví dụ `\\"5\\" == 5` trả về `true` vì PHP tự đổi chuỗi thành số. Trong khi `===` (so sánh nghiêm ngặt) kiểm tra cả giá trị lẫn kiểu dữ liệu, nên `\\"5\\" === 5` trả về `false`. Luôn dùng `===` trong code thực tế để tránh lỗi do PHP tự động ép kiểu và giúp code rõ ràng hơn.

## Detailed Answer (EN)
Both are comparison operators but with different strictness. `==` checks if values are equal but allows type conversion. For example, `\\"5\\" == 5` returns true because PHP converts the string to a number. The `===` (strict equal) checks both value AND type, so `\\"5\\" === 5` returns false. Always use `===` in production code to avoid unexpected type juggling bugs and improve code clarity.
