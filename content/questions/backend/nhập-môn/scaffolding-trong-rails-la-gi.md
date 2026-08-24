---
id: scaffolding-trong-rails-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Scaffolding trong Rails là gì?

## Question (EN)
What is scaffolding in Rails?

## Đáp án chi tiết (VI)
**Scaffolding** là generator sinh sẵn **toàn bộ stack CRUD** cho một resource chỉ bằng một lệnh: model + migration + controller + views + route + test.\
\
```bash\
bin/rails generate scaffold Post title:string body:text\
bin/rails db:migrate\
```\
\
Sau lệnh này bạn có ngay:\
- `app/models/post.rb` và migration tạo bảng `posts`.\
- `PostsController` với 7 action REST (`index`, `show`, `new`, `create`, `edit`, `update`, `destroy`).\
- Views ERB cho từng action + `resources :posts` trong `routes.rb`.\
\
**Dùng khi nào:** rất hợp để **học Rails**, dựng **prototype** hay demo nhanh — thấy ngay một resource chạy đầu-cuối. \
\
**Lưu ý thực tế:** scaffold đẻ khá nhiều code boilerplate (view, controller generic) mà app thật thường phải sửa lại nhiều; nhiều team production tránh dùng thẳng, chỉ generate model/controller riêng lẻ rồi tự viết view. Xóa nhanh bằng `rails destroy scaffold Post`.

## Detailed Answer (EN)
**Scaffolding** is a generator that produces the **entire CRUD stack** for a resource with a single command: model + migration + controller + views + route + tests.\
\
```bash\
bin/rails generate scaffold Post title:string body:text\
bin/rails db:migrate\
```\
\
After this you immediately get:\
- `app/models/post.rb` and a migration creating the `posts` table.\
- A `PostsController` with the 7 REST actions (`index`, `show`, `new`, `create`, `edit`, `update`, `destroy`).\
- ERB views for each action + `resources :posts` in `routes.rb`.\
\
**When to use it:** great for **learning Rails** and building quick **prototypes** or demos — you see a resource working end to end at once.\
\
**Practical note:** scaffolding generates a lot of boilerplate (generic views, controller) that real apps usually rewrite; many production teams avoid it directly, generating models/controllers separately and writing their own views. Undo it with `rails destroy scaffold Post`.
