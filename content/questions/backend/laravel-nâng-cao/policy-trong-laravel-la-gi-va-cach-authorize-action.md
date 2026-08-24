---
id: policy-trong-laravel-la-gi-va-cach-authorize-action
position: backend
technology: laravel-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Policy trong Laravel là gì và cách authorize action?

## Question (EN)
What are Laravel policies and how do you authorize actions?

## Đáp án chi tiết (VI)
Policy tập trung hóa logic phân quyền. Tạo: `php artisan make:policy PostPolicy --model=Post` định nghĩa các method như `view()`, `create()`, `update()`, `delete()`. \
\
**Ví dụ:** `public function update(User $user, Post $post) { return $user-\u003eid === $post-\u003euser_id; }`. Dùng trong controller: `$this-\u003eauthorize(\\"update\\

## Detailed Answer (EN)
Policies centralize authorization logic. Create: `php artisan make:policy PostPolicy --model=Post` defining methods like `view()`, `create()`, `update()`, `delete()`. \
\
**Example:** `public function update(User $user, Post $post) { return $user-\u003eid === $post-\u003euser_id; }`. Use in controller: `$this-\u003eauthorize(\\"update\\
