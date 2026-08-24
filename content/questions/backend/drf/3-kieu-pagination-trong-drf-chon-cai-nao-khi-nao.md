---
id: 3-kieu-pagination-trong-drf-chon-cai-nao-khi-nao
position: backend
technology: drf
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
3 kiểu pagination trong DRF — chọn cái nào khi nào?

## Question (EN)
Three pagination styles in DRF — which to pick when?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
DRF ships three styles, each optimized for a UI/dataset shape:\
\
- **`PageNumberPagination`** — `?page=2\u0026page_size=20`. Renders \\"Page 1 / 2 / 3 ...\\". Fits classic numbered UIs. Simple, but large `OFFSET` slows down.\
- **`LimitOffsetPagination`** — `?limit=20\u0026offset=40`. Flexible client-driven control. Same `OFFSET` slowness on big tables.\
- **`CursorPagination`** — `?cursor=cD0yMDI2...`. Uses the sort column (`-created_at`) as the cursor → every page is O(log n). No page numbers / total count; fits infinite scroll and real-time feeds.\
\
```python\
class PostCursorPagination(CursorPagination):\
    page_size = 20\
    ordering = '-created_at'\
    cursor_query_param = 'cursor'\
\
class PostViewSet(viewsets.ModelViewSet):\
    pagination_class = PostCursorPagination\
```\
\
**Note:** A 1M+ row table with page-number pagination and `count()` on every request → `COUNT(*)` scans the whole table = brutally slow. Either override `paginator.get_paginated_response` to drop `count`, or switch to cursor.
