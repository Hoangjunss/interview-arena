---
id: eloquent-relationships-la-gi-va-co-nhung-loai-nao
position: backend
technology: eloquent-\u0026-database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Eloquent relationships là gì và có những loại nào?

## Question (EN)
What are Eloquent relationships and what types exist?

## Đáp án chi tiết (VI)
Relationships định nghĩa mối liên kết giữa các model. One-to-Many: User có nhiều Post. Định nghĩa trong User model: `public function posts() { return $this-\u003ehasMany(Post::class); }`. Truy cập: `$user-\u003eposts`. Many-to-One (nghịch đảo): Post belongs to User. One-to-One: User có một Profile. Many-to-Many: Post có nhiều Tag. \
\
**Ví dụ:** `$post-\u003etags()-\u003eattach($tagId)` tạo liên kết. Polymorphic: nhiều model cùng liên kết đến một model (như Comment trên cả Post và Video). Relationships cho phép query dữ liệu trực quan: `$user-\u003eposts()-\u003ewhere(\\"published\\

## Detailed Answer (EN)
Relationships define connections between models. One-to-Many: User has many Posts. Define in User model: `public function posts() { return $this-\u003ehasMany(Post::class); }`. Then access: `$user-\u003eposts`. Many-to-One (inverse): Post belongs to User. One-to-One: User has one Profile. Many-to-Many: Posts have many Tags. \
\
**Example:** `$post-\u003etags()-\u003eattach($tagId)` associates. Polymorphic: multiple models relate to one (like Comments on Posts and Videos). Relationships enable intuitive data querying: `$user-\u003eposts()-\u003ewhere(\\"published\\
