---
id: canonical-url-la-gi-khi-nao-can-su-dung
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Canonical URL là gì? Khi nào cần sử dụng?

## Question (EN)
What is a canonical URL? When should you use it?

## Đáp án chi tiết (VI)
Canonical URL (`\u003clink rel='canonical' href='...'\u003e`) cho Google biết URL nào là 'bản gốc' khi có nhiều URLs chứa cùng nội dung. \
\
**Ví dụ:** `/products?sort=price` và `/products?sort=name` cùng nội dung → canonical trỏ về `/products`. Khi nào CẦN: (1) URL parameters tạo duplicate (filters, sort, pagination), (2) HTTP vs HTTPS, www vs non-www, (3) Syndicated content (bài viết đăng trên nhiều site), (4) Mobile URL khác desktop URL. Nếu không có canonical, Google tự chọn 'bản gốc' — có thể chọn sai. Trong Next.js: dùng `metadata.alternates.canonical` trong `generateMetadata()`. \
\
**Lưu ý:** canonical phải là absolute URL, self-referencing canonical cũng tốt (mỗi trang canonical trỏ về chính nó).

## Detailed Answer (EN)
A canonical URL (`\u003clink rel='canonical' href='...'\u003e`) tells Google which URL is the 'original' version when multiple URLs share the same content. For example: `/products?sort=price` and `/products?sort=name` show the same content — the canonical should point to `/products`. When you NEED it: (1) URL parameters creating duplicates (filters, sorting, pagination), (2) HTTP vs HTTPS or www vs non-www versions, (3) Syndicated content (articles published on multiple sites), (4) Mobile URLs that differ from desktop URLs. Without a canonical, Google picks its own 'original' — which may be the wrong choice. In Next.js: use `metadata.alternates.canonical` inside `generateMetadata()`. \
\
**Note:** canonical URLs must be absolute, and self-referencing canonicals (each page pointing to itself) are also recommended.
