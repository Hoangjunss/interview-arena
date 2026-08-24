---
id: file-based-routing-trong-next-js-app-router-hoat-dong-nhu-the-nao
position: backend
technology: app-router
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File-based routing trong Next.js App Router hoạt động như thế nào?

## Question (EN)
How does file-based routing work in the Next.js App Router?

## Đáp án chi tiết (VI)
Trong thư mục `app/`, mỗi thư mục đại diện cho một route segment. `page.tsx` là component hiển thị cho route đó. `[param]` là dynamic segment. `(group)` là route group không ảnh hưởng URL. `[...slug]` là catch-all. File conventions: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx.

## Detailed Answer (EN)
Inside the `app/` directory, each folder represents a route segment. A `page.tsx` file makes that segment publicly accessible. `[param]` folders create dynamic segments. `(group)` folders create route groups without affecting the URL. `[...slug]` creates catch-all routes. Special file conventions: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx.
