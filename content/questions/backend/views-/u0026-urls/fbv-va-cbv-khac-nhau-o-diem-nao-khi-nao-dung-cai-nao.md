---
id: fbv-va-cbv-khac-nhau-o-diem-nao-khi-nao-dung-cai-nao
position: backend
technology: views-\u0026-urls
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FBV và CBV khác nhau ở điểm nào, khi nào dùng cái nào?

## Question (EN)
How are FBVs and CBVs different, and when do you use each?

## Đáp án chi tiết (VI)
**FBV (Function-Based View)** là một function nhận `request` trả `HttpResponse` — đọc một mạch từ trên xuống, rất trực quan. **CBV (Class-Based View)** là class kế thừa từ `View` hoặc generic class (`ListView`, `DetailView`...), tổ chức theo HTTP method (`get()`, `post()`) và cho phép gắn mixin để tái sử dụng logic.\
\
```python\
# FBV\
def post_list(request):\
    posts = Post.objects.published()\
    return render(request, 'posts/list.html', {'posts': posts})\
\
# CBV\
class PostListView(ListView):\
    model = Post\
    template_name = 'posts/list.html'\
    queryset = Post.objects.published()\
```\
\
FBV hợp cho view một lần đặc thù — webhook handler, custom action, integration đơn giản. CBV hợp khi nhiều view chia sẻ pattern (CRUD), hoặc cần composition qua mixin như `LoginRequiredMixin`, `PermissionRequiredMixin`.\
\
Nhìn ngoài CBV trông gọn hơn FBV, nhưng khi mixin chồng nhiều tầng, chuỗi MRO (method resolution order) trở nên khó debug. Đọc source `View.dispatch()` một lần để nắm chắc flow là khoản đầu tư đáng giá.

## Detailed Answer (EN)
**FBV (Function-Based View)** is a function taking `request` and returning `HttpResponse` — readable end-to-end. **CBV (Class-Based View)** is a class extending `View` or a generic class (`ListView`, `DetailView`...), organized by HTTP method (`get()`, `post()`) and allowing mixins to share logic.\
\
```python\
# FBV\
def post_list(request):\
    posts = Post.objects.published()\
    return render(request, 'posts/list.html', {'posts': posts})\
\
# CBV\
class PostListView(ListView):\
    model = Post\
    template_name = 'posts/list.html'\
    queryset = Post.objects.published()\
```\
\
Use **FBV** for one-off custom views (webhook handler, ad-hoc action). Use **CBV** when many views share a pattern (CRUD), or you need mixin composition (`LoginRequiredMixin`, `PermissionRequiredMixin`).\
\
**Note:** CBVs look tidier on the outside, but a tall mixin MRO can be hard to debug — read the `View.dispatch()` source once to internalize the flow.
