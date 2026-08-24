---
id: vi-sao-next-js-khuyen-dung-next-image-thay-cho-the-img-thuong-khi-nao-img-van-ch
position: backend
technology: images
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao Next.js khuyên dùng `next/image` thay cho thẻ `\u003cimg\u003e` thường? Khi nào `\u003cimg\u003e` vẫn chấp nhận được?

## Question (EN)
Why does Next.js recommend `next/image` over a plain `\u003cimg\u003e`? When is `\u003cimg\u003e` still acceptable?

## Đáp án chi tiết (VI)
`next/image` là một `\u003cimg\u003e` được bọc thêm bốn thứ mà tự làm tay rất tốn công:\
\
- **Chuyển định dạng và resize theo yêu cầu**: server sinh ra bản WebP/AVIF đúng kích thước màn hình đang xem, thay vì bắt điện thoại tải ảnh 3000px.\
- **Chống layout shift**: bắt buộc khai báo `width`/`height` (hoặc `fill`), nên trình duyệt giữ sẵn chỗ → không đẩy nội dung khi ảnh về, giữ CLS thấp.\
- **Lazy load mặc định**: ảnh ngoài viewport không tải cho tới khi cuộn tới.\
- **`priority`** cho ảnh hero để nó được preload, phục vụ LCP.\
\
```tsx\
import Image from 'next/image'\
\
\u003cImage src=\\"/hero.jpg\\" width={1200} height={630} alt=\\"Product hero\\" priority /\u003e\
```\
\
**`\u003cimg\u003e` vẫn ổn khi:** ảnh là SVG icon nhỏ, ảnh đã tối ưu sẵn từ CDN riêng, hoặc bạn self-host mà không muốn trả chi phí xử lý ảnh. Khi đó vẫn nên tự đặt `width`/`height` và `loading=\\"lazy\\"` — đó mới là phần thực sự quan trọng.

## Detailed Answer (EN)
`next/image` is an `\u003cimg\u003e` wrapped with four things that are tedious to do by hand:\
\
- **On-demand format conversion and resizing**: the server produces a WebP/AVIF variant sized for the current viewport instead of shipping a 3000px file to a phone.\
- **Layout-shift protection**: `width`/`height` (or `fill`) are required, so the browser reserves space and content does not jump when the image lands — keeping CLS low.\
- **Lazy loading by default**: off-screen images are not fetched until scrolled into view.\
- **`priority`** for the hero image so it gets preloaded, which serves LCP.\
\
```tsx\
import Image from 'next/image'\
\
\u003cImage src=\\"/hero.jpg\\" width={1200} height={630} alt=\\"Product hero\\" priority /\u003e\
```\
\
**A plain `\u003cimg\u003e` is still fine when:** the asset is a small SVG icon, the image is already optimized by your own CDN, or you self-host and do not want to pay for image processing. Even then, set `width`/`height` and `loading=\\"lazy\\"` yourself — that is the part that actually matters.
