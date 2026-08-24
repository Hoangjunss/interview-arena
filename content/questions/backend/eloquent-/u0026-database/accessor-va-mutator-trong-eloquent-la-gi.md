---
id: accessor-va-mutator-trong-eloquent-la-gi
position: backend
technology: eloquent-\u0026-database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Accessor và Mutator trong Eloquent là gì?

## Question (EN)
What are accessors and mutators in Eloquent?

## Đáp án chi tiết (VI)
Accessor biến đổi dữ liệu khi đọc, mutator biến đổi khi ghi. Định nghĩa accessor: `protected function name(): Attribute { return Attribute::make(get: fn($value) =\u003e ucfirst($value)); }` tự động viết hoa chữ cái đầu khi truy cập. Mutator: `protected function email(): Attribute { return Attribute::make(set: fn($value) =\u003e strtolower($value)); }` chuyển sang chữ thường khi lưu. \
\
**Ví dụ:** `$user-\u003eemail = \\"JOHN@EXAMPLE.COM\\"` lưu thành chữ thường, `echo $user-\u003ename` hiển thị viết hoa dù lưu là chữ thường. Accessor/mutator tập trung logic định dạng vào một chỗ.

## Detailed Answer (EN)
Accessors transform data when reading, mutators transform when writing. Define accessor: `protected function name(): Attribute { return Attribute::make(get: fn($value) =\u003e ucfirst($value)); }` automatically capitalizes name when accessed. Mutator: `protected function email(): Attribute { return Attribute::make(set: fn($value) =\u003e strtolower($value)); }` converts to lowercase on save. \
\
**Example:** `$user-\u003eemail = \\"JOHN@EXAMPLE.COM\\"` stores as lowercase, `echo $user-\u003ename` (John) displays capitalized even if stored as john. Accessors/mutators centralize formatting logic.
