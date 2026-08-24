---
id: draft-mode-trong-next-js-dung-de-lam-gi-va-no-bat-tat-static-rendering-ra-sao-ch
position: backend
technology: draft-mode---preview
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Draft Mode trong Next.js dùng để làm gì, và nó bật/tắt static rendering ra sao cho preview nội dung CMS?

## Question (EN)
What is Draft Mode in Next.js for, and how does it toggle static rendering for previewing CMS content?

## Đáp án chi tiết (VI)
Draft Mode cho phép biên tập viên **xem trước bản nháp từ CMS** trên trang vốn được render tĩnh (SSG/ISR) — tức là bỏ qua cache, fetch nội dung chưa publish.\
\
**Cơ chế:** một Route Handler gọi `draftMode().enable()`, Next.js đặt một **cookie ký**; khi cookie có mặt, các trang **chuyển từ static sang dynamic rendering** để luôn lấy data mới.\
\
```ts\
// app/api/draft/route.ts\
import { draftMode } from 'next/headers'\
import { redirect } from 'next/navigation'\
\
export async function GET(request: Request) {\
  const slug = new URL(request.url).searchParams.get('slug')\
  // ... verify secret token từ CMS\
  (await draftMode()).enable()\
  redirect(`/posts/${slug}`)\
}\
```\
\
Trong page, đọc `(await draftMode()).isEnabled` để quyết định fetch bản draft hay published.\
\
**Lưu ý quan trọng:** luôn **xác thực một secret token** trước khi `enable()` — nếu không, ai cũng bật được draft mode và buộc trang chạy dynamic (mất lợi ích cache, lộ nội dung chưa publish). Tắt bằng `draftMode().disable()`.

## Detailed Answer (EN)
$85
