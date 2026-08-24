---
id: revalidation-sau-mutation-trong-server-actions
position: backend
technology: api-\u0026-server-actions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Revalidation sau mutation trong Server Actions?

## Question (EN)
How do you revalidate after a mutation in a Server Action?

## Đáp án chi tiết (VI)
Sau khi mutate data trong Server Action, cần revalidate cache để UI cập nhật: `revalidatePath('/posts')` invalidate cached route, `revalidateTag('posts')` invalidate theo tag. `redirect('/path')` để điều hướng sau action thành công.

## Detailed Answer (EN)
After mutating data in a Server Action, revalidate the cache so the UI reflects the change: `revalidatePath('/posts')` invalidates a specific cached route, and `revalidateTag('posts')` invalidates all cache entries with that tag. Use `redirect('/path')` to navigate after a successful action.
