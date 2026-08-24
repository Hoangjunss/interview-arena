---
id: cdn-la-gi-va-no-cai-thien-hieu-nang-he-thong-nhu-the-nao
position: system-design
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CDN là gì và nó cải thiện hiệu năng hệ thống như thế nào?

## Question (EN)
What is a CDN and how does it improve system performance?

## Đáp án chi tiết (VI)
CDN (Content Delivery Network) là mạng lưới các server phân tán địa lý, lưu trữ bản sao (cache) của static content (hình ảnh, JS, CSS, video) tại các edge nodes gần người dùng nhất. Khi user request một file, CDN route request đến edge node gần nhất thay vì origin server, giảm latency đáng kể – ví dụ user ở Việt Nam truy cập CDN node Singapore thay vì origin server ở US. Ngoài latency, CDN còn giảm tải cho origin server, tăng throughput toàn cầu, có built-in DDoS protection, và cải thiện availability (cache vẫn serve được khi origin tạm thời down). CDN phù hợp nhất cho static assets và video streaming; dynamic content cũng có thể cache nếu dùng Edge Computing (Cloudflare Workers, Vercel Edge). Các CDN lớn: Cloudflare, AWS CloudFront, Akamai, Fastly.

## Detailed Answer (EN)
A CDN (Content Delivery Network) is a geographically distributed network of servers that cache copies of static content (images, JS, CSS, video) at edge nodes close to users. When a user requests a file, the CDN routes the request to the nearest edge node instead of the origin server, significantly reducing latency — for example, a user in Vietnam hits a CDN node in Singapore rather than an origin server in the US. Beyond latency, a CDN also reduces load on the origin server, increases global throughput, provides built-in DDoS protection, and improves availability (the cache can still serve content when the origin is temporarily down). CDNs are most effective for static assets and video streaming; dynamic content can also be cached via Edge Computing (Cloudflare Workers, Vercel Edge). Major CDN providers include Cloudflare, AWS CloudFront, Akamai, and Fastly.
