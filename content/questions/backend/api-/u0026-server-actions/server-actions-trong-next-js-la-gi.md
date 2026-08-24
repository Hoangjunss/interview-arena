---
id: server-actions-trong-next-js-la-gi
position: backend
technology: api-\u0026-server-actions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server Actions trong Next.js là gì?

## Question (EN)
What are Server Actions in Next.js?

## Đáp án chi tiết (VI)
Server Actions là async functions chạy trên server, được gọi từ Client Components hoặc forms. Khai báo với `'use server'` directive. Cho phép mutate data trực tiếp mà không cần tạo API endpoint riêng.\
```tsx\
// actions/post-actions.ts\
'use server'\
import { revalidatePath } from 'next/cache'\
\
export async function createPost(formData: FormData) {\
  const title = formData.get('title') as string\
  await db.posts.create({ title })\
  revalidatePath('/posts') // làm mới cache trang sau khi mutate\
}\
\
// components/new-post-form.tsx\
'use client'\
import { createPost } from '@/actions/post-actions'\
\
export function NewPostForm() {\
  return (\
    \u003cform action={createPost}\u003e\
      \u003cinput name=\\"title\\" placeholder=\\"Post title\\" /\u003e\
      \u003cbutton type=\\"submit\\"\u003eCreate\u003c/button\u003e\
    \u003c/form\u003e\
  )\
}\
```

## Detailed Answer (EN)
Server Actions are async functions that run on the server and can be called from Client Components or HTML forms. Declare them with the `'use server'` directive. They allow mutating data directly without building a separate API endpoint.\
```tsx\
// actions/post-actions.ts\
'use server'\
import { revalidatePath } from 'next/cache'\
\
export async function createPost(formData: FormData) {\
  const title = formData.get('title') as string\
  await db.posts.create({ title })\
  revalidatePath('/posts') // bust the cache after mutating\
}\
\
// components/new-post-form.tsx\
'use client'\
import { createPost } from '@/actions/post-actions'\
\
export function NewPostForm() {\
  return (\
    \u003cform action={createPost}\u003e\
      \u003cinput name=\\"title\\" placeholder=\\"Post title\\" /\u003e\
      \u003cbutton type=\\"submit\\"\u003eCreate\u003c/button\u003e\
    \u003c/form\u003e\
  )\
}\
```
