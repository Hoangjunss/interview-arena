---
id: controller-trong-laravel-la-gi-va-co-nhung-method-nao
position: backend
technology: laravel-cơ-bản
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Controller trong Laravel là gì và có những method nào?

## Question (EN)
What are Laravel controllers and what do they do?

## Đáp án chi tiết (VI)
Controller xử lý logic request, thường tương ứng với một resource (User, Product). Tạo bằng `php artisan make:controller ProductController --resource` sinh ra các method CRUD: `index()` (hiển thị tất cả), `show($id)` (hiển thị một), `create()` (hiển thị form tạo), `store()` (lưu từ form), `edit()` (hiển thị form sửa), `update()` (lưu sửa đổi), `destroy()` (xóa). Controller xử lý request, tương tác với Model, và trả về View hay JSON. \
\
**Ví dụ:** `public function store(Request $request) { $product = Product::create($request-\u003evalidated()); return redirect()-\u003eroute(\\"products.show\\

## Detailed Answer (EN)
Controllers handle request logic, typically corresponding to resources (User, Product). Create with `php artisan make:controller ProductController --resource` generating CRUD methods: `index()` (show all), `show($id)` (show one), `create()` (show form), `store()` (save from form), `edit()` (show edit form), `update()` (save edits), `destroy()` (delete). Controllers process requests, interact with Models, and return Views or JSON. \
\
**Example:** `public function store(Request $request) { $product = Product::create($request-\u003evalidated()); return redirect()-\u003eroute(\\"products.show\\
