---
id: magic-methods-trong-php-la-gi-cho-vi-du
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Magic methods trong PHP là gì? Cho ví dụ.

## Question (EN)
What are magic methods in PHP? Give examples.

## Đáp án chi tiết (VI)
Magic methods là các phương thức đặc biệt tự động được gọi khi có hành động tương ứng xảy ra. Các magic method quan trọng: `__construct()` (chạy khi tạo object), `__destruct()` (chạy khi hủy object), `__get()` (truy cập thuộc tính không tồn tại), `__set()` (gán thuộc tính không tồn tại), `__call()` (gọi phương thức không tồn tại), `__toString()` (khi object được in như chuỗi). \
\
**Ví dụ:** truy cập `$user-\u003eemail` private sẽ kích hoạt `__get(\\"email\\")` để kiểm soát quyền truy cập. Hầu hết magic method phải là public; `__construct` có thể là protected hoặc private khi dùng cho singleton pattern.

## Detailed Answer (EN)
Magic methods are special methods that execute automatically in response to certain actions. Key ones: `__construct()` (runs when object created), `__destruct()` (runs when object destroyed), `__get()` (called when accessing inaccessible property), `__set()` (called when setting inaccessible property), `__call()` (called when accessing undefined method), `__toString()` (when object printed as string). \
\
**Example:** accessing private `$user-\u003eemail` triggers `__get(\\"email\\")` to control access. Most magic methods must be public; `__construct` may be protected or private when used for singleton pattern.
