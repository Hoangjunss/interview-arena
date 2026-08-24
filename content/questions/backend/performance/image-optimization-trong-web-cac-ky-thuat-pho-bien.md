---
id: image-optimization-trong-web-cac-ky-thuat-pho-bien
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Image optimization trong web: các kỹ thuật phổ biến?

## Question (EN)
Image optimization on the web: what are the common techniques?

## Đáp án chi tiết (VI)
Tối ưu ảnh là một trong những cách hiệu quả nhất để giảm page weight và cải thiện LCP.\
\
- **Format hiện đại** — WebP nhỏ hơn JPEG 25–34%, AVIF ~50% (encode chậm hơn); dùng `\u003cpicture\u003e` với fallback cho browser chưa support.\
- **Responsive images** — `srcset` + `sizes` để browser chọn đúng size theo device; `next/image` tự generate.\
- **Đúng kích thước** — không serve ảnh 2000px cho container 400px; Image CDN (Cloudinary, Imgix) resize on demand qua URL params.\
- **Nén** — lossy (JPEG quality 80 thường không phân biệt được với 100) hoặc lossless (PNG, WebP lossless); tools: Squoosh, Sharp, ImageMagick.\
- **Lazy load** — `loading='lazy'` cho ảnh below-fold; không áp dụng cho LCP image.\
- **Preload ảnh critical** — `\u003clink rel='preload' as='image' href='hero.webp' imagesrcset='...'\u003e` cho hero image.\
- **LQIP** — placeholder mờ tí hon hiển thị trong khi tải; `next/image` có prop `placeholder='blur'`.\
- **CDN/edge** — serve ảnh từ location gần user; Image CDN hiện đại tự convert format, resize và nén theo device.

## Detailed Answer (EN)
$86
