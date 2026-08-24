---
id: n-1-query-problem-trong-django-bieu-hien-ra-sao-va-bat-the-nao
position: backend
technology: performance-\u0026-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
N+1 query problem trong Django biểu hiện ra sao và bắt thế nào?

## Question (EN)
How does the N+1 query problem show up in Django and how do you catch it?

## Đáp án chi tiết (VI)
$84

## Detailed Answer (EN)
**N+1** happens when you run one query to get N objects, then *for each object run another query* to fetch a related row → 1 + N total queries.\
\
```python\
posts = Post.objects.all()          # 1 query\
for p in posts:\
    print(p.author.full_name)       # +1 query per iteration — N queries!\
```\
\
Fix with `select_related` (FK/OneToOne) or `prefetch_related` (M2M, reverse FK) — see [[#9207]]:\
```python\
posts = Post.objects.select_related('author')   # 1 JOIN query\
```\
\
Catch it early in dev:\
- **`django-debug-toolbar`** — its \\"SQL\\" panel lists every query per request, with duplicate warnings.\
- **`django.db.connection.queries`** in shell after `DEBUG=True`.\
- **Tests** with `self.assertNumQueries(2):` around important code paths — fails when N+1 leaks extra queries.\
\
**Note:** N+1 leaking through **templates** is sneaky — `{% for p in posts %}{{ p.author.name }}` counts too. When a nested DRF serializer's base queryset is not prefetched, every item adds 2–3 queries. Always test with ≥ 50 rows, not 2.
