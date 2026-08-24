---
id: use-client-directive-trong-next-js-dung-khi-nao
position: backend
technology: server-client-components
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
'use client' directive trong Next.js dùng khi nào?

## Question (EN)
When should you use the 'use client' directive in Next.js?

## Đáp án chi tiết (VI)
`'use client'` đặt ở đầu file để đánh dấu component là Client Component. Cần thiết khi component dùng: useState, useEffect, event handlers, browser APIs. Đặt boundary tại component cần interactivity, không cần wrap toàn app.\
```tsx\
// components/like-button.tsx\
'use client'  // ← bắt buộc vì dùng useState và onClick\
\
import { useState } from 'react'\
\
export function LikeButton({ initialCount }: { initialCount: number }) {\
  const [count, setCount] = useState(initialCount)\
  return (\
    \u003cbutton onClick={() =\u003e setCount(c =\u003e c + 1)}\u003e\
      ❤{count}\
    \u003c/button\u003e\
  )\
}\
\
// app/post/page.tsx — Server Component, không cần 'use client'\
import { LikeButton } from '@/components/like-button'\
\
export default async function PostPage() {\
  const post = await fetchPost()\
  return (\
    \u003carticle\u003e\
      \u003ch1\u003e{post.title}\u003c/h1\u003e\
      {/* Server Component chứa Client Component — OK */}\
      \u003cLikeButton initialCount={post.likes} /\u003e\
    \u003c/article\u003e\
  )\
}\
```

## Detailed Answer (EN)
Place `'use client'` at the top of a file to mark it as a Client Component. It is required when the component uses: useState, useEffect, event handlers, or browser APIs. Place the boundary at the component that needs interactivity; there is no need to wrap the entire app.\
```tsx\
// components/like-button.tsx\
'use client'  // ← required because we use useState and onClick\
\
import { useState } from 'react'\
\
export function LikeButton({ initialCount }: { initialCount: number }) {\
  const [count, setCount] = useState(initialCount)\
  return (\
    \u003cbutton onClick={() =\u003e setCount(c =\u003e c + 1)}\u003e\
      ❤{count}\
    \u003c/button\u003e\
  )\
}\
\
// app/post/page.tsx — Server Component, no 'use client' needed\
import { LikeButton } from '@/components/like-button'\
\
export default async function PostPage() {\
  const post = await fetchPost()\
  return (\
    \u003carticle\u003e\
      \u003ch1\u003e{post.title}\u003c/h1\u003e\
      {/* Server Component can include Client Components — OK */}\
      \u003cLikeButton initialCount={post.likes} /\u003e\
    \u003c/article\u003e\
  )\
}\
```
