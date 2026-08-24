---
id: null-safety-trong-dart-la-gi-va-tai-sao-no-quan-trong
position: backend
technology: dart-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Null safety trong Dart là gì và tại sao nó quan trọng?

## Question (EN)
What is null safety in Dart and why does it matter?

## Đáp án chi tiết (VI)
Null safety nghĩa là các biến không thể chứa `null` trừ khi được đánh dấu nullable bằng `?`. Điều này giúp phòng ngừa lỗi `NullPointerException` ở runtime bằng cách phát hiện lỗi ngay lúc compile. Với null safety, lập trình viên phải có chủ đích rõ ràng về biến nào có thể null, giúp code an toàn hơn và trình biên dịch tối ưu hiệu quả hơn.

## Detailed Answer (EN)
Null safety means variables cannot contain `null` unless explicitly marked as nullable with `?`. This prevents `NullPointerException` errors at runtime by catching them at compile time instead. With null safety, you must be intentional about which variables can be null, making code safer and allowing compiler optimizations.
