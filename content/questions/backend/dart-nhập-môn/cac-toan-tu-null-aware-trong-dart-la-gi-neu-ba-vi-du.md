---
id: cac-toan-tu-null-aware-trong-dart-la-gi-neu-ba-vi-du
position: backend
technology: dart-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các toán tử null-aware trong Dart là gì? Nêu ba ví dụ.

## Question (EN)
What are null-aware operators in Dart? Name three examples.

## Đáp án chi tiết (VI)
Toán tử null-aware giúp xử lý giá trị nullable an toàn. `?.` truy cập thuộc tính chỉ khi đối tượng khác null: `person?.name`. `??` cung cấp giá trị mặc định nếu bên trái là null: `name ?? \\"Unknown\\"`. `??=` chỉ gán nếu biến đang là null: `count ??= 0`. Các toán tử này giúp code ngắn gọn và tránh lỗi null.

## Detailed Answer (EN)
Null-aware operators safely handle nullable values. `?.` accesses properties only if the object is not null. `??` provides a default value if the left side is null. `??=` assigns only if the variable is null. These prevent null errors and reduce boilerplate code.
