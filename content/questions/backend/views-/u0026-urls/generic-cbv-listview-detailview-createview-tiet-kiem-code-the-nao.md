---
id: generic-cbv-listview-detailview-createview-tiet-kiem-code-the-nao
position: backend
technology: views-\u0026-urls
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generic CBV (`ListView`, `DetailView`, `CreateView`) tiết kiệm code thế nào?

## Question (EN)
How do generic CBVs (`ListView`, `DetailView`, `CreateView`) save code?

## Đáp án chi tiết (VI)
Generic CBV đóng gói sẵn pattern CRUD: lấy object/list, render template, xử lý form, redirect — bạn chỉ phải override những phần thực sự khác.\
\
```python\
class PostListView(ListView):\
    model = Post\
    paginate_by = 20\
    template_name = 'posts/list.html'   # mặc định: posts/post_list.html nếu bỏ\
    context_object_name = 'posts'\
\
    def get_queryset(self):\
        return Post.objects.published().select_related('author')\
\
class PostCreateView(LoginRequiredMixin, CreateView):\
    model = Post\
    form_class = PostForm\
    success_url = reverse_lazy('blog:post-list')\
```\
\
`ListView` lo phân trang, `DetailView` lo lookup theo `pk`/`slug`, `CreateView`/`UpdateView` lo form + save + redirect. Đủ dùng cho phần lớn case CRUD.\
\
Khi logic không khớp pattern (action không phải CRUD, response không phải HTML, flow đặc biệt), đừng cố ép vào generic CBV — nhảy về FBV hoặc kế thừa thẳng `View` đọc rõ hơn nhiều. Generic CBV mạnh cho 80% case CRUD, còn 20% case lạ thì viết tay sẽ tốn ít não hơn.

## Detailed Answer (EN)
Generic CBVs bundle the standard CRUD pattern: fetch object/list, render template, handle form, redirect — you override only the bits that actually differ.\
\
```python\
class PostListView(ListView):\
    model = Post\
    paginate_by = 20\
    template_name = 'posts/list.html'   # auto: posts/post_list.html if omitted\
    context_object_name = 'posts'\
\
    def get_queryset(self):\
        return Post.objects.published().select_related('author')\
\
class PostCreateView(LoginRequiredMixin, CreateView):\
    model = Post\
    form_class = PostForm\
    success_url = reverse_lazy('blog:post-list')\
```\
\
`ListView` handles pagination, `DetailView` handles `pk`/`slug` lookup, `CreateView`/`UpdateView` handle form + save + redirect.\
\
**Note:** When the logic does not fit the pattern (non-CRUD action, non-HTML response), do not force it into a generic CBV — fall back to FBV or subclass `View` directly. Generic CBVs cover 80% of CRUD; the other 20% is clearer written by hand.
