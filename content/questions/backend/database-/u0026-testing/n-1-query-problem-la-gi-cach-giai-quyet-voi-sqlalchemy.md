---
id: n-1-query-problem-la-gi-cach-giai-quyet-voi-sqlalchemy
position: backend
technology: database-\u0026-testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
N+1 Query Problem là gì? Cách giải quyết với SQLAlchemy?

## Question (EN)
What is the N+1 query problem? How to solve it with SQLAlchemy?

## Đáp án chi tiết (VI)
N+1 problem: 1 query lấy N records, rồi N queries nữa để lấy related data. Giải quyết bằng eager loading.\
```python\
# N+1 problem — 1 + N queries\
users = await db.execute(select(User))\
for user in users.scalars():\
    posts = await db.execute(  # 1 query mỗi user!\
        select(Post).where(Post.user_id == user.id)\
    )\
\
# Fix: selectinload — 2 queries total\
from sqlalchemy.orm import selectinload\
\
result = await db.execute(\
    select(User).options(selectinload(User.posts))\
)\
# 1 query lấy tất cả users + 1 query lấy posts cho tất cả user_ids\
\
# joinedload — 1 query với JOIN (tốt khi result set nhỏ)\
from sqlalchemy.orm import joinedload\
```

## Detailed Answer (EN)
N+1: 1 query fetches N records, then N more queries for related data. Fix with eager loading.\
```python\
# Fix with selectinload (2 queries total)\
result = await db.execute(\
    select(User).options(selectinload(User.posts))\
)\
\
# Or joinedload (1 query with JOIN)\
result = await db.execute(\
    select(User).options(joinedload(User.profile))\
)\
```
