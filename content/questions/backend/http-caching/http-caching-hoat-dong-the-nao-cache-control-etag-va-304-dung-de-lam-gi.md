---
id: http-caching-hoat-dong-the-nao-cache-control-etag-va-304-dung-de-lam-gi
position: backend
technology: http-caching
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTP caching hoạt động thế nào? Cache-Control, ETag và 304 dùng để làm gì?

## Question (EN)
How does HTTP caching work? What are Cache-Control, ETag, and 304 for?

## Đáp án chi tiết (VI)
HTTP có sẵn cơ chế cache để trình duyệt/CDN/proxy **tái dùng response cũ**, giảm round-trip và tải origin. Hai lớp:\
\
- **Freshness (còn tươi)** — `Cache-Control`:\
  - `max-age=\u003cgiây\u003e`: thời gian được coi là còn tươi, dùng thẳng từ cache không hỏi server.\
  - `no-cache`: được lưu nhưng **phải revalidate** với server trước khi dùng.\
  - `no-store`: **không lưu** (nội dung nhạy cảm).\
  - `private` (chỉ cache trình duyệt) vs `public` (cả CDN/proxy được cache).\
- **Validation (kiểm lại khi hết tươi)** — khi cache hết hạn, client hỏi server \\"có đổi không\\" bằng conditional request:\
  - `ETag` (dấu vân tay nội dung) + `If-None-Match`, hoặc `Last-Modified` + `If-Modified-Since`.\
  - Nếu **không đổi**, server trả **`304 Not Modified`** **không kèm body** → client dùng lại bản cache, tiết kiệm băng thông; nếu đổi thì trả `200` với nội dung mới.\
\
Mẫu thường dùng: asset có hash trong tên → `max-age` rất dài + `immutable`; HTML/`API` dễ đổi → `no-cache` rồi dựa vào ETag để revalidate rẻ.

## Detailed Answer (EN)
$89
