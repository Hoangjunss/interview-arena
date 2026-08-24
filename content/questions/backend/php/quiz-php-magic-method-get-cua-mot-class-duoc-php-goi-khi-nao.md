---
id: quiz-php-magic-method-get-cua-mot-class-duoc-php-goi-khi-nao
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Magic method __get() của một class được PHP gọi khi nào?

## Đáp án trắc nghiệm
- [ ] Mỗi lần đọc bất kỳ property nào của object, kể cả property public có sẵn
- [x] Khi đọc property không tồn tại hoặc không truy cập được từ bên ngoài
- [ ] Khi object được truyền vào var_dump hoặc print_r để in ra
- [ ] Khi gọi một method không tồn tại trên object

## Giải thích (VI)
__get($name) chạy khi code đọc property không tồn tại hoặc không truy cập được (private/protected nhìn từ ngoài). Tương tự: __set cho phép gán, __call($name, $args) cho method không tồn tại, __callStatic cho static method. Property public có sẵn được đọc thẳng, không qua magic method.

### Giải thích các phương án:
- **Mỗi lần đọc bất kỳ property nào của object, kể cả property public có sẵn** (Sai): Property public tồn tại được đọc trực tiếp, không đi qua __get.
- **Khi đọc property không tồn tại hoặc không truy cập được từ bên ngoài** (Đúng): Truy cập property public có sẵn thì đọc thẳng; __get chỉ là fallback cho property "thiếu".
- **Khi object được truyền vào var_dump hoặc print_r để in ra** (Sai): Debug output không kích hoạt __get; nó dump trực tiếp property thật của object.
- **Khi gọi một method không tồn tại trên object** (Sai): Method không tồn tại kích hoạt __call (hoặc __callStatic với static), không phải __get.
