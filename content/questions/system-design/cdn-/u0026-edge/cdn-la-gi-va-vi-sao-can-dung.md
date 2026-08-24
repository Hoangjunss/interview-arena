---
id: cdn-la-gi-va-vi-sao-can-dung
position: system-design
technology: cdn-\u0026-edge
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CDN là gì và vì sao cần dùng?

## Question (EN)
What is a CDN and why use one?

## Đáp án chi tiết (VI)
CDN (Content Delivery Network) là mạng lưới **server phân tán theo địa lý** đặt gần người dùng, lưu **bản sao cache** của nội dung để phục vụ từ điểm gần nhất thay vì luôn phải về server gốc (origin).\
\
Lợi ích:\
- **Giảm độ trễ**: dữ liệu đi quãng đường ngắn hơn tới user → tải nhanh hơn.\
- **Giảm tải origin**: phần lớn request tĩnh được cache tại edge, origin nhẹ hơn.\
- **Chịu tải và chống tấn công**: hấp thụ traffic đột biến, phân tán và làm dịu DDoS.\
\
Thường dùng cho **tài nguyên tĩnh** (ảnh, CSS, JS, video, font) và cả **response động có thể cache**. Cơ chế làm mới: cache theo **TTL**, và **purge/invalidate** hoặc đổi URL có version (`app.abc123.js`) khi nội dung thay đổi.\
\
Lưu ý: nội dung cá nhân hóa/nhạy cảm cần đánh dấu **không cache** (vd `Cache-Control: private, no-store`) để không phục vụ nhầm cho user khác.

## Detailed Answer (EN)
A CDN (Content Delivery Network) is a network of **geographically distributed servers** placed near users, holding **cached copies** of content to serve from the closest point instead of always reaching the origin server.\
\
Benefits:\
- **Lower latency**: data travels a shorter distance to the user → faster loads.\
- **Less origin load**: most static requests are cached at the edge, sparing the origin.\
- **Capacity and protection**: absorbs traffic spikes and disperses/softens DDoS.\
\
Typically used for **static assets** (images, CSS, JS, video, fonts) and **cacheable dynamic responses**. Refresh mechanisms: cache by **TTL**, plus **purge/invalidate** or versioned URLs (`app.abc123.js`) when content changes.\
\
Note: personalized/sensitive content must be marked **non-cacheable** (e.g. `Cache-Control: private, no-store`) so it is never served to the wrong user.
