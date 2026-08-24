---
id: toi-uu-anh-va-asset-tren-frontend-gom-nhung-ky-thuat-nao
position: backend
technology: assets-\u0026-images
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tối ưu ảnh và asset trên frontend gồm những kỹ thuật nào?

## Question (EN)
What techniques optimize images and assets on the frontend?

## Đáp án chi tiết (VI)
Ảnh thường là phần nặng nhất của trang, nên tối ưu:\
\
- **Lazy-load** ảnh ngoài viewport: `\u003cimg loading=\\"lazy\\"\u003e` — hoãn tải tới khi gần cuộn đến.\
- **Responsive images**: `srcset` + `sizes` để trình duyệt tự chọn kích thước hợp với DPR/viewport → không tải ảnh to thừa trên mobile.\
- **Định dạng hiện đại**: **WebP/AVIF** nhẹ hơn JPEG/PNG đáng kể; dùng `\u003cpicture\u003e` để fallback.\
- Đặt **`width`/`height`** (hoặc `aspect-ratio`) để tránh **layout shift** (CLS).\
- Nén ảnh, phục vụ qua **CDN**, `preload` ảnh **LCP**, `decoding=\\"async\\"`.\
\
Với asset khác: minify, gzip/brotli, và code splitting cho JS/CSS.

## Detailed Answer (EN)
Images are usually the heaviest part of a page, so:\
\
- **Lazy-load** off-screen images: `\u003cimg loading=\\"lazy\\"\u003e` — defers the fetch until the user nears them.\
- **Responsive images**: `srcset` + `sizes` let the browser pick a size fitting the DPR/viewport → no oversized images on mobile.\
- **Modern formats**: **WebP/AVIF** are markedly lighter than JPEG/PNG; use `\u003cpicture\u003e` for fallback.\
- Set **`width`/`height`** (or `aspect-ratio`) to avoid **layout shift** (CLS).\
- Compress images, serve via a **CDN**, `preload` the **LCP** image, `decoding=\\"async\\"`.\
\
For other assets: minify, gzip/brotli, and code-split your JS/CSS.
