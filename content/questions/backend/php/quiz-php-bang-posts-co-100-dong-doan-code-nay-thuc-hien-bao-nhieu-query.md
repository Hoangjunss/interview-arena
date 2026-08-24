---
id: quiz-php-bang-posts-co-100-dong-doan-code-nay-thuc-hien-bao-nhieu-query
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bảng posts có 100 dòng. Đoạn code này thực hiện bao nhiêu query?

## Đáp án trắc nghiệm
- [x] 101 — một query lấy posts, mỗi post một query lấy author
- [ ] 2 — Eloquent tự eager load quan hệ khi được truy cập lần đầu
- [ ] 1 — Eloquent tự join sang bảng authors
- [ ] 200 — mỗi post cần một query cho post và một cho author

## Giải thích (VI)
101 query — bài toán N+1 kinh điển. Post::all() chạy 1 query; mỗi lần $post->author chạm vào quan hệ chưa load, Eloquent lazy load bằng một query riêng × 100. Fix: Post::with('author')->get() — eager loading gom về 2 query (SELECT * FROM posts + SELECT * FROM authors WHERE id IN (...)).

### Giải thích các phương án:
- **101 — một query lấy posts, mỗi post một query lấy author** (Đúng): Đây là bài toán N+1: quan hệ chưa load nên mỗi lần truy cập là một query.
- **2 — Eloquent tự eager load quan hệ khi được truy cập lần đầu** (Sai): Truy cập quan hệ chưa load là lazy load từng model một, không gom lại.
- **1 — Eloquent tự join sang bảng authors** (Sai): Eloquent không tự join; quan hệ được load bằng query riêng.
- **200 — mỗi post cần một query cho post và một cho author** (Sai): Toàn bộ posts được lấy trong một query duy nhất ở đầu.
