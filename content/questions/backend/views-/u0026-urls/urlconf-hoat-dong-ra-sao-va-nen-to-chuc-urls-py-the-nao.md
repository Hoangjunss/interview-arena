---
id: urlconf-hoat-dong-ra-sao-va-nen-to-chuc-urls-py-the-nao
position: backend
technology: views-\u0026-urls
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
URLconf hoạt động ra sao và nên tổ chức `urls.py` thế nào?

## Question (EN)
How does URLconf work and how should you organize `urls.py`?

## Đáp án chi tiết (VI)
Khi request đến, Django duyệt `request.path` với danh sách `urlpatterns` *theo thứ tự khai báo*, dùng `path()` hoặc `re_path()`. Match xong thì capture group được pass vào view tương ứng.\
\
```python\
# config/urls.py (root)\
from django.urls import path, include\
\
urlpatterns = [\
    path('admin/', admin.site.urls),\
    path('api/v1/', include('apps.api.urls')),\
    path('blog/', include('apps.blog.urls', namespace='blog')),\
]\
\
# apps/blog/urls.py\
app_name = 'blog'\
urlpatterns = [\
    path('', views.PostListView.as_view(), name='post-list'),\
    path('\u003cslug:slug\u003e/', views.PostDetailView.as_view(), name='post-detail'),\
]\
```\
\
Mỗi app giữ `urls.py` riêng và khai `app_name` namespace, sau đó reverse URL qua `reverse('blog:post-detail', kwargs={...})` thay vì hard-code path. Khi đổi URL, chỉ cần sửa một chỗ.\
\
Vì match theo thứ tự, `path('\u003cslug:slug\u003e/')` phải đặt *sau* các path tĩnh như `path('new/', ...)`. Đảo lại là slug sẽ nuốt mất `/new/`, view tĩnh không bao giờ được gọi.

## Detailed Answer (EN)
On each request, Django matches `request.path` against `urlpatterns` *in order*, using `path()` or `re_path()`. After matching, capture groups are passed to the view.\
\
```python\
# config/urls.py (root)\
from django.urls import path, include\
\
urlpatterns = [\
    path('admin/', admin.site.urls),\
    path('api/v1/', include('apps.api.urls')),\
    path('blog/', include('apps.blog.urls', namespace='blog')),\
]\
\
# apps/blog/urls.py\
app_name = 'blog'\
urlpatterns = [\
    path('', views.PostListView.as_view(), name='post-list'),\
    path('\u003cslug:slug\u003e/', views.PostDetailView.as_view(), name='post-detail'),\
]\
```\
\
Each app keeps its own `urls.py` + `app_name` namespace → reverse URLs with `reverse('blog:post-detail', kwargs={...})` instead of hard-coding paths.\
\
**Note:** Matching is order-sensitive, so `path('\u003cslug:slug\u003e/')` must sit *after* static paths (`path('new/', ...)`) — otherwise the slug pattern eats `/new/`.
