---
id: http-caching-cho-static-asset-hoat-dong-the-nao-cache-control-etag-va-cache-bust
position: backend
technology: bundle-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTP caching cho static asset hoạt động thế nào? `Cache-Control`, ETag và cache busting là gì?

## Question (EN)
How does HTTP caching work for static assets? What are `Cache-Control`, ETags, and cache busting?

## Đáp án chi tiết (VI)
Trình duyệt cache response theo header từ server, giúp lần truy cập sau không phải tải lại asset:\
\
- **`Cache-Control: max-age=N`** — response còn \\"tươi\\" trong `N` giây; trong khoảng đó trình duyệt dùng bản cache **không hỏi server** (nhanh nhất). Thêm `immutable` để báo file không bao giờ đổi nội dung.\
- **`ETag`** (validation): server gắn mã định danh nội dung; khi cache hết hạn, trình duyệt gửi `If-None-Match` — nội dung chưa đổi thì server trả **`304 Not Modified`** không kèm body → tiết kiệm băng thông nhưng vẫn tốn một round-trip.\
- **Cache busting bằng hash filename**: bundler nhúng hash nội dung vào tên file (`app.3f9a1c.js`). Nhờ đó asset đặt được `max-age=31536000, immutable` (cache 1 năm, không bao giờ revalidate) — khi deploy bản mới, nội dung đổi → **hash đổi → URL mới**, trình duyệt tự tải bản mới.\
\
Cặp đôi chuẩn: **HTML** dùng `no-cache` (luôn revalidate để lấy danh sách asset mới nhất), còn **asset có hash** cache vĩnh viễn. Đây là mặc định của Next.js/Vite khi build production.

## Detailed Answer (EN)
$7a
