---
id: cdn-hoat-dong-the-nao-khi-nao-nen-va-khong-nen-dung-cdn
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CDN hoạt động thế nào? Khi nào nên và không nên dùng CDN?

## Question (EN)
How does a CDN work? When should and should not you use a CDN?

## Đáp án chi tiết (VI)
CDN (Content Delivery Network) là mạng lưới server phân tán toàn cầu (PoP - Points of Presence). Khi user request file, CDN router tìm server gần nhất về mặt địa lý/network. Lần đầu cache miss: CDN fetch từ origin server và cache lại. Các lần sau: phục vụ từ edge cache — giảm latency đáng kể (từ 200ms còn 20ms) và giảm tải origin. CDN xử lý: static assets (JS/CSS/images), video streaming, software downloads, và ngày nay cả dynamic content qua Edge Functions.\
\
Nên dùng CDN khi: user phân tán toàn cầu, static assets chiếm traffic lớn, cần DDoS protection, media streaming. Không hiệu quả khi: nội dung cực kỳ dynamic/personalized (không cache được), API responses có private data, nội dung thay đổi liên tục với TTL ngắn.\
\
Cache invalidation là thách thức lớn: dùng content hashing (main.abc123.js) để bust cache ngay lập tức khi deploy.

## Detailed Answer (EN)
$84
