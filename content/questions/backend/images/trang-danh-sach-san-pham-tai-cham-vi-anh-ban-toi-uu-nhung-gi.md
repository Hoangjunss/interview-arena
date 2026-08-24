---
id: trang-danh-sach-san-pham-tai-cham-vi-anh-ban-toi-uu-nhung-gi
position: backend
technology: images
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trang danh sách sản phẩm tải chậm vì ảnh. Bạn tối ưu những gì?

## Question (EN)
A product listing page is slow because of images. What do you optimize?

## Đáp án chi tiết (VI)
Ảnh thường chiếm phần lớn dung lượng trang, và xử lý sai còn gây layout shift.\
\
**Việc cần làm:**\
- **Lazy load ảnh dưới màn hình đầu**: `loading=\\"lazy\\"`. Ảnh trong viewport đầu tiên (LCP) phải để `loading=\\"eager\\"` kèm `fetchpriority=\\"high\\"` — lazy load ảnh hero làm LCP tệ đi.\
- **Đặt `width`/`height` hoặc `aspect-ratio`** để trình duyệt giữ chỗ, tránh Cumulative Layout Shift khi ảnh tải xong.\
- **Phục vụ đúng kích thước** qua `srcset` + `sizes` — không gửi ảnh 2000px cho thumbnail 200px.\
- **Định dạng hiện đại** (WebP/AVIF) với fallback.\
\
```jsx\
\u003cimg\
  src=\\"/p/200.webp\\"\
  srcSet=\\"/p/200.webp 200w, /p/400.webp 400w\\"\
  sizes=\\"(max-width: 640px) 50vw, 200px\\"\
  width={200}\
  height={200}\
  loading=\\"lazy\\"\
  decoding=\\"async\\"\
  alt={product.name}\
/\u003e\
```\
\
Trong Next.js, `next/image` gói sẵn các phần này: tự sinh `srcset`, tự lazy load trừ khi đặt `priority`, và bắt buộc khai báo kích thước nên tránh được layout shift. Với ảnh hero, nhớ `priority` — đây là lỗi hay gặp khiến LCP kém dù đã dùng `next/image`.

## Detailed Answer (EN)
$83
