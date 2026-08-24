---
id: active-record-la-gi-rails-mapping-ten-model-voi-bang-db-nhu-the-nao
position: backend
technology: active-record
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Active Record là gì? Rails mapping tên model với bảng DB như thế nào?

## Question (EN)
What is Active Record? How does Rails map model names to DB tables?

## Đáp án chi tiết (VI)
Active Record là ORM (Object-Relational Mapper) của Rails — mỗi model Ruby class tương ứng với 1 bảng DB, mỗi instance tương ứng với 1 row.\
\
**Quy ước đặt tên (CoC):**\
\
| Model class | Bảng DB |\
|---|---|\
| `User` | `users` |\
| `BlogPost` | `blog_posts` |\
| `OrderItem` | `order_items` |\
\
Model tự hiểu schema từ DB — không cần khai báo column trong code. Gọi `User.create!(...)`, `User.where(...)` là đủ; Rails tự map.

## Detailed Answer (EN)
Active Record is Rails' ORM (Object-Relational Mapper) — each Ruby model class maps to a DB table, and each instance maps to a row.\
\
**Naming conventions (CoC):**\
\
| Model class | DB table |\
|---|---|\
| `User` | `users` |\
| `BlogPost` | `blog_posts` |\
| `OrderItem` | `order_items` |\
\
The model reads its schema directly from the DB — no column declarations needed in code. Calling `User.create!(...)` or `User.where(...)` just works; Rails handles the mapping.
