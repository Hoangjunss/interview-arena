---
id: find-find-by-va-where-khac-nhau-nhu-the-nao
position: backend
technology: active-record
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`find`, `find_by` và `where` khác nhau như thế nào?

## Question (EN)
What are the differences between `find`, `find_by`, and `where`?

## Đáp án chi tiết (VI)
| Method | Trả về | Nếu không tìm thấy |\
|---|---|---|\
| `find(id)` | single record | raise `ActiveRecord::RecordNotFound` |\
| `find_by(attrs)` | single record hoặc `nil` | `nil` |\
| `where(attrs)` | `ActiveRecord::Relation` (collection) | empty relation |\
\
```ruby\
User.find(1)               # raise nếu id=1 không tồn tại\
User.find_by(email: \\"x\\")  # nil nếu không có\
User.where(role: \\"admin\\")  # Relation — chưa query đến khi cần\
```\
\
**Lazy evaluation:** `where` không chạy SQL ngay — chỉ build query. SQL thực sự chạy khi gọi `to_a`, `.each`, `.first`, hoặc render.\
\
Dùng `find` khi ID chắc chắn tồn tại (controller `show`). Dùng `find_by` khi có thể nil. Dùng `where` để chain thêm điều kiện.

## Detailed Answer (EN)
| Method | Returns | If not found |\
|---|---|---|\
| `find(id)` | single record | raises `ActiveRecord::RecordNotFound` |\
| `find_by(attrs)` | single record or `nil` | `nil` |\
| `where(attrs)` | `ActiveRecord::Relation` (collection) | empty relation |\
\
```ruby\
User.find(1)               # raises if id=1 doesn't exist\
User.find_by(email: \\"x\\")  # nil if not found\
User.where(role: \\"admin\\")  # Relation — not queried until needed\
```\
\
**Lazy evaluation:** `where` doesn't run SQL immediately — it builds a query object. SQL fires when `.to_a`, `.each`, `.first`, or rendering occurs.\
\
Use `find` when the ID is guaranteed to exist (controller `show`). Use `find_by` when nil is possible. Use `where` to chain further conditions.
