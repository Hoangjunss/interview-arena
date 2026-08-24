---
id: loading-lazy-va-fetchpriority-dung-the-nao-cho-dung-vi-sao-anh-tren-man-hinh-dau
position: backend
technology: images
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`loading=\\"lazy\\"` và `fetchpriority` dùng thế nào cho đúng? Vì sao ảnh trên màn hình đầu không nên lazy-load?

## Question (EN)
How should `loading=\\"lazy\\"` and `fetchpriority` be used? Why should above-the-fold images not be lazy-loaded?

## Đáp án chi tiết (VI)
`loading=\\"lazy\\"` bảo trình duyệt **hoãn tải ảnh cho tới khi sắp lọt viewport**, làm nhẹ đợt tải đầu. `fetchpriority` thì **không đổi thứ tự phát hiện**, chỉ chỉnh **mức ưu tiên** khi trình duyệt xếp hàng tải.\
\
Cách dùng đúng theo vị trí:\
\
```html\
\u003c!-- hero image: eager + high priority --\u003e\
\u003cimg src=\\"/hero.webp\\" width=\\"1200\\" height=\\"630\\" fetchpriority=\\"high\\" alt=\\"...\\"\u003e\
\
\u003c!-- below the fold --\u003e\
\u003cimg src=\\"/item.webp\\" width=\\"400\\" height=\\"300\\" loading=\\"lazy\\" decoding=\\"async\\" alt=\\"...\\"\u003e\
```\
\
**Vì sao không lazy-load ảnh màn hình đầu:** ảnh lazy chỉ được xếp hàng sau khi layout xong và biết nó nằm trong viewport, nên bị **tải trễ hơn hẳn** so với ảnh thường. Nếu đó là phần tử LCP thì LCP xấu đi đáng kể. Đây là lỗi rất hay gặp khi lập trình viên bật `loading=\\"lazy\\"` cho toàn bộ ảnh.\
\
Luôn khai `width`/`height` (hoặc `aspect-ratio`): trình duyệt chừa sẵn chỗ nên **không phát sinh CLS** khi ảnh về. Thêm `decoding=\\"async\\"` để việc giải mã ảnh không chặn main thread.

## Detailed Answer (EN)
`loading=\\"lazy\\"` tells the browser to **defer an image until it approaches the viewport**, lightening the initial load. `fetchpriority` does **not** change discovery order; it adjusts the **priority** the browser assigns when queuing the fetch.\
\
Correct usage by position:\
\
```html\
\u003c!-- hero image: eager + high priority --\u003e\
\u003cimg src=\\"/hero.webp\\" width=\\"1200\\" height=\\"630\\" fetchpriority=\\"high\\" alt=\\"...\\"\u003e\
\
\u003c!-- below the fold --\u003e\
\u003cimg src=\\"/item.webp\\" width=\\"400\\" height=\\"300\\" loading=\\"lazy\\" decoding=\\"async\\" alt=\\"...\\"\u003e\
```\
\
**Why not lazy-load above the fold:** a lazy image is only queued after layout determines it is in the viewport, so it starts **noticeably later** than a normal image. If it is the LCP element, LCP degrades sharply. Blanket-applying `loading=\\"lazy\\"` to every image is a very common mistake.\
\
Always declare `width`/`height` (or `aspect-ratio`): the browser reserves the box so the image arriving causes **no CLS**. Add `decoding=\\"async\\"` so image decoding does not block the main thread.
