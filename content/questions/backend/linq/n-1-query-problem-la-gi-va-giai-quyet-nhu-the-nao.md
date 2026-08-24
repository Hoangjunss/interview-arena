---
id: n-1-query-problem-la-gi-va-giai-quyet-nhu-the-nao
position: backend
technology: linq
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
N+1 query problem là gì và giải quyết như thế nào?

## Question (EN)
What is the N+1 query problem and how do you solve it?

## Đáp án chi tiết (VI)
N+1 xảy ra khi một query tải parent records, rồi với mỗi parent lại có thêm một query riêng để tải children (1 + N queries). Lazy loading trong Entity Framework hay gây ra vấn đề này. Giải quyết bằng eager loading: `.Include()` cho quan hệ trực tiếp, `.ThenInclude()` cho quan hệ lồng nhau. Hoặc dùng `.Select()` projection để chỉ tải đúng field cần thiết trong một query duy nhất.

## Detailed Answer (EN)
N+1 occurs when one query fetches parent records, then separate queries fetch children for each parent (1 + N queries). Lazy loading in Entity Framework is a common cause. Solve with eager loading: `.Include()` for direct relationships, `.ThenInclude()` for nested ones. Or use `.Select()` projections to load only needed fields in a single query.
