---
id: fetch-cache-trong-next-js-app-router-hoat-dong-nhu-the-nao
position: backend
technology: rendering
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
fetch cache trong Next.js App Router hoạt động như thế nào?

## Question (EN)
How does fetch caching work in the Next.js App Router?

## Đáp án chi tiết (VI)
Next.js extend native fetch với caching:\
\
- `fetch(url)` mặc định `no-store` từ Next.js 15+ (trước đó cache).\
- `{ cache: 'force-cache' }` để opt-in cache.\
- `{ next: { revalidate: 60 } }` revalidate sau 60 giây.\
- `{ next: { tags: ['posts'] } }` tag để invalidate theo tag.\
\
Data cache tách biệt với Full Route Cache.

## Detailed Answer (EN)
Next.js extends the native fetch API with caching options:\
\
- `fetch(url)` defaults to `no-store` from Next.js 15+ (it was cached in earlier versions).\
- `{ cache: 'force-cache' }` opts into caching.\
- `{ next: { revalidate: 60 } }` revalidates after 60 seconds.\
- `{ next: { tags: ['posts'] } }` assigns a tag for targeted invalidation.\
\
The Data Cache is separate from the Full Route Cache.
