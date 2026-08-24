---
id: resources-trong-rails-router-lam-gi-no-tao-ra-nhung-route-nao
position: backend
technology: mvc-\u0026-routing
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`resources` trong Rails Router làm gì? Nó tạo ra những route nào?

## Question (EN)
What does `resources` do in the Rails Router? What routes does it generate?

## Đáp án chi tiết (VI)
`resources :posts` tự động tạo 7 route RESTful chuẩn:\
\
| HTTP Verb | Path | Action | Helper |\
|---|---|---|---|\
| GET | /posts | index | `posts_path` |\
| GET | /posts/new | new | `new_post_path` |\
| POST | /posts | create | `posts_path` |\
| GET | /posts/:id | show | `post_path(id)` |\
| GET | /posts/:id/edit | edit | `edit_post_path(id)` |\
| PATCH/PUT | /posts/:id | update | `post_path(id)` |\
| DELETE | /posts/:id | destroy | `post_path(id)` |\
\
Dùng `only:` / `except:` để giới hạn: `resources :comments, only: [:index, :create, :destroy]`.

## Detailed Answer (EN)
`resources :posts` automatically generates 7 standard RESTful routes:\
\
| HTTP Verb | Path | Action | Helper |\
|---|---|---|---|\
| GET | /posts | index | `posts_path` |\
| GET | /posts/new | new | `new_post_path` |\
| POST | /posts | create | `posts_path` |\
| GET | /posts/:id | show | `post_path(id)` |\
| GET | /posts/:id/edit | edit | `edit_post_path(id)` |\
| PATCH/PUT | /posts/:id | update | `post_path(id)` |\
| DELETE | /posts/:id | destroy | `post_path(id)` |\
\
Use `only:` / `except:` to restrict: `resources :comments, only: [:index, :create, :destroy]`.
