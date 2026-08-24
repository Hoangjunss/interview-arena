---
id: django-rest-framework-drf-la-gi-va-giai-quyet-bai-toan-gi
position: backend
technology: drf
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Django REST Framework (DRF) là gì và giải quyết bài toán gì?

## Question (EN)
What is Django REST Framework (DRF) and what does it solve?

## Đáp án chi tiết (VI)
**DRF** là thư viện trên Django chuyên cho REST API: serializer (validate + parse JSON), viewset (gom logic CRUD), router (sinh URL tự động), authentication/permission/throttling/pagination, và browsable API UI để test.\
\
Không có DRF bạn vẫn có thể trả `JsonResponse` từ Django view, nhưng phải tự code validate, schema, pagination, content negotiation. DRF gói sẵn mấy convention đó để team chỉ tập trung vào domain.\
\
```python\
# views.py\
class PostViewSet(viewsets.ModelViewSet):\
    queryset = Post.objects.all()\
    serializer_class = PostSerializer\
    permission_classes = [IsAuthenticatedOrReadOnly]\
\
# urls.py\
router = DefaultRouter()\
router.register('posts', PostViewSet)\
urlpatterns = router.urls   # GET/POST/PUT/PATCH/DELETE /posts/ và /posts/\u003cid\u003e/\
```\
\
DRF mạnh nhất khi API chủ yếu là CRUD trên model. Với API phức tạp (RPC-style, action không phải CRUD), đừng cố ép vào `ModelViewSet` — dùng `APIView` hoặc `@api_view` đọc rõ hơn nhiều.

## Detailed Answer (EN)
**DRF** is a library on top of Django dedicated to REST APIs: serializers (validate + parse JSON), viewsets (bundled CRUD logic), routers (auto-generated URLs), authentication/permission/throttling/pagination, plus a browsable API UI for testing.\
\
Without DRF you can still return `JsonResponse` from a Django view — but you write validation, schema, pagination, and content negotiation yourself. DRF gives you those conventions back so the team focuses on the domain.\
\
```python\
# views.py\
class PostViewSet(viewsets.ModelViewSet):\
    queryset = Post.objects.all()\
    serializer_class = PostSerializer\
    permission_classes = [IsAuthenticatedOrReadOnly]\
\
# urls.py\
router = DefaultRouter()\
router.register('posts', PostViewSet)\
urlpatterns = router.urls   # GET/POST/PUT/PATCH/DELETE /posts/ and /posts/\u003cid\u003e/\
```\
\
DRF is strongest when the API is CRUD on a model. For complex APIs (RPC-style, non-CRUD actions), do not force them into `ModelViewSet` — `APIView` or `@api_view` reads far better.
