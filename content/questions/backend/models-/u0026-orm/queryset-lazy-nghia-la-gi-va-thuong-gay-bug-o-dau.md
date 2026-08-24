---
id: queryset-lazy-nghia-la-gi-va-thuong-gay-bug-o-dau
position: backend
technology: models-\u0026-orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
QuerySet \\"lazy\\" nghĩa là gì và thường gây bug ở đâu?

## Question (EN)
What does \\"lazy\\" QuerySet mean and where does it usually cause bugs?

## Đáp án chi tiết (VI)
**QuerySet lazy** nghĩa là Django chưa chạy SQL khi bạn tạo query, chỉ chạy khi *evaluate* — tức là iterate, `list()`, `len()`, `bool()`, slicing có step, hoặc serialize. Nhờ vậy bạn có thể `.filter().exclude().order_by()` nối nhiều bước mà cuối cùng vẫn chỉ phát một câu SQL duy nhất.\
\
```python\
qs = Post.objects.filter(published=True)   # chưa hit DB\
qs = qs.order_by('-created_at')[:10]       # vẫn chưa hit\
for p in qs:                                # ← hit DB ở đây\
    print(p.title)\
```\
\
Bug hay gặp nhất: gọi `len(qs)` trước rồi `for p in qs` → **2 query**, vì `len()` đánh thức query nhưng không cache list. Sửa đơn giản: `posts = list(qs)` rồi dùng `posts` cho cả 2 việc.\
\
Một điểm tinh tế hay vấp: QuerySet có cache kết quả *trong cùng instance* sau lần evaluate đầu, nhưng nếu bạn `.filter()` thêm thì đó là QuerySet mới — cache không tồn tại nữa. Cần tái sử dụng kết quả thì gán biến và evaluate một lần.

## Detailed Answer (EN)
**Lazy QuerySet** = Django does not run SQL when you build the query, only when it is *evaluated* (iteration, `list()`, `len()`, `bool()`, stepped slicing, serialization). That is why you can chain `.filter().exclude().order_by()` and still issue a single SQL statement.\
\
```python\
qs = Post.objects.filter(published=True)   # no DB hit yet\
qs = qs.order_by('-created_at')[:10]       # still no hit\
for p in qs:                                # ← hits the DB here\
    print(p.title)\
```\
\
Common bug: calling `len(qs)` first then `for p in qs` → **2 queries**, because `len()` triggers a query but does not cache the list. Fix: `posts = list(qs)` and reuse `posts`.\
\
**Note:** A QuerySet caches results *within the same instance* after the first evaluation, but *cloning* (extra `.filter`) creates a new QuerySet → cache lost. If you need to reuse, assign to a variable and evaluate once.
