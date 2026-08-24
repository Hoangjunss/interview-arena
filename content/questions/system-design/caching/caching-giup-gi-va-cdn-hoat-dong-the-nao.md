---
id: caching-giup-gi-va-cdn-hoat-dong-the-nao
position: system-design
technology: caching
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Caching giúp gì và CDN hoạt động thế nào?

## Question (EN)
What does caching achieve and how does a CDN work?

## Đáp án chi tiết (VI)
Cache lưu bản sao dữ liệu **gần nơi dùng** và **nhanh hơn nguồn gốc** (RAM thay vì DB/disk) để **giảm latency** và **giảm tải** cho hệ thống phía sau.\
\
Các tầng cache thường gặp:\
- **Client/browser cache**, **CDN** (biên mạng), **reverse-proxy cache**, **application cache** (Redis/Memcached), **database cache**.\
\
**CDN**: mạng server đặt rải rác về mặt địa lý (edge), phục vụ nội dung tĩnh (ảnh, JS, CSS, video) từ điểm **gần user nhất** → giảm latency và giảm băng thông về origin. Nội dung động cũng có thể cache ở edge với TTL ngắn.\
\
Đánh đổi cốt lõi của cache là **độ mới vs tốc độ** → cần chiến lược invalidation.

## Detailed Answer (EN)
A cache keeps a copy of data **close to where it is used** and **faster than the origin** (RAM instead of DB/disk) to **cut latency** and **offload** the backend.\
\
Common cache layers:\
- **Client/browser cache**, **CDN** (network edge), **reverse-proxy cache**, **application cache** (Redis/Memcached), **database cache**.\
\
**CDN**: a geographically distributed set of edge servers that serve static content (images, JS, CSS, video) from the point **nearest the user** → lower latency and less origin bandwidth. Dynamic content can also be edge-cached with a short TTL.\
\
The core cache trade-off is **freshness vs speed** → you need an invalidation strategy.
