---
id: records-trong-dart-la-gi-va-chung-giup-ich-the-nao-khi-can-tra-ve-nhieu-gia-tri
position: backend
technology: dart-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Records trong Dart là gì và chúng giúp ích thế nào khi cần trả về nhiều giá trị từ một hàm?

## Question (EN)
What are Records in Dart and how do they enable multi-value returns?

## Đáp án chi tiết (VI)
Records là kiểu dữ liệu nhẹ, bất biến, cho phép nhóm nhiều giá trị lại mà không cần tạo class. Bạn có thể dùng cú pháp vị trí `(String, int)` hoặc tên trường `({String name, int age})`. Để trả về từ hàm: `(String, int) fetchUser() =\u003e ('Alice', 30);` và destructure bằng `var (name, age) = fetchUser();`. Records thay thế các workaround dùng Map hay List khi cần trả nhiều giá trị, code ngắn hơn và type-safe hơn.

## Detailed Answer (EN)
Records are lightweight, immutable aggregates bundling multiple values (positional or named fields) without needing a class. \
\
**Example:** `(String, int) fetchUser() =\u003e ('Alice', 30);` then destructure with `var (name, age) = fetchUser();`. They replace Map/List workarounds for multi-return functions with type-safe, concise syntax.
