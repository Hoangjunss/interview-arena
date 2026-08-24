---
id: cloudfront-cdn-la-gi-va-giai-quyet-van-de-gi
position: backend
technology: cdn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CloudFront (CDN) là gì và giải quyết vấn đề gì?

## Question (EN)
What is CloudFront (a CDN) and what problem does it solve?

## Đáp án chi tiết (VI)
CloudFront là **CDN** của AWS — mạng **edge location** phân bố toàn cầu, **cache nội dung gần người dùng** để giảm độ trễ và tải cho origin.\
\
- Request đi tới edge **gần nhất**; nếu đã cache thì trả ngay (cache hit), chưa có thì lấy từ **origin** (S3, ALB, server) rồi cache lại.\
- Lợi ích: **latency thấp** (rút ngắn quãng đường mạng), **giảm tải origin**, **tiết kiệm băng thông**, chống chịu tải/DDoS tốt hơn (kết hợp AWS Shield/WAF).\
- Cấu hình: **TTL** (thời gian cache), **cache key**, **invalidation** khi cần xóa cache; hỗ trợ TLS.\
\
Hợp phục vụ **static asset, ảnh, video, file tải, cả nội dung động**. Cốt lõi: đưa dữ liệu **về gần biên (edge)** thay vì mọi request về một origin duy nhất.

## Detailed Answer (EN)
CloudFront is AWS's **CDN** — a globally distributed network of **edge locations** that **caches content near users** to cut latency and origin load.\
\
- A request goes to the **nearest** edge; if cached it is served immediately (cache hit), otherwise it is fetched from the **origin** (S3, ALB, server) and cached.\
- Benefits: **low latency** (shorter network path), **reduced origin load**, **bandwidth savings**, and better resilience to load/DDoS (with AWS Shield/WAF).\
- Config: **TTL** (cache duration), **cache key**, **invalidation** to purge, plus TLS support.\
\
Fits serving **static assets, images, video, downloads, and even dynamic content**. Core idea: bring data **to the edge**, close to users, instead of every request hitting one origin.
