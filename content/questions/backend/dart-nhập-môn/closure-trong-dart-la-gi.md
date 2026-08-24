---
id: closure-trong-dart-la-gi
position: backend
technology: dart-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Closure trong Dart là gì?

## Question (EN)
What is a closure in Dart?

## Đáp án chi tiết (VI)
Closure là một hàm \\"đóng gói\\" (capture) các biến từ phạm vi bao quanh và có thể truy cập chúng ngay cả sau khi hàm ngoài đã kết thúc. \
\
**Ví dụ:** `int makeAdder(int x) { return (int y) =\u003e x + y; }` — hàm bên trong \\"giữ lại\\" biến `x`. Closure rất hữu ích cho callbacks và lập trình hàm trong Dart.

## Detailed Answer (EN)
A closure is a function that captures variables from its surrounding scope and can access them even after the outer function has finished. Closures are powerful for callbacks and functional programming patterns in Dart.
