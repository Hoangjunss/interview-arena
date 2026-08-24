---
id: amazon-cloudfront-la-gi-giai-thich-cach-cdn-hoat-dong-va-cac-tinh-nang-bao-mat-c
position: backend
technology: compute-\u0026-networking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Amazon CloudFront là gì? Giải thích cách CDN hoạt động và các tính năng bảo mật của CloudFront.

## Question (EN)
What is Amazon CloudFront? Explain how CDN works and the security features of CloudFront.

## Đáp án chi tiết (VI)
Amazon CloudFront là dịch vụ CDN (Content Delivery Network) của AWS với hơn 450 edge locations trên toàn cầu; nó cache content (HTML, CSS, JS, images, video) tại edge gần người dùng, giảm latency và tải cho origin server. Cơ chế hoạt động: request đến edge location gần nhất → nếu cache HIT, trả về ngay; nếu cache MISS, fetch từ origin (S3, ALB, EC2, custom server) → cache lại theo TTL → trả về client. CloudFront hỗ trợ bảo mật: HTTPS end-to-end (TLS termination tại edge), Origin Access Control (OAC) để chỉ CloudFront mới access được S3 bucket (không expose S3 public), AWS WAF integration để filter request độc hại, Shield Standard miễn phí chống DDoS L3/L4, Shield Advanced cho L7 DDoS protection. Signed URLs/Cookies để restrict access cho nội dung premium. Cache behavior có thể cấu hình per path pattern (vd: `/api/*` không cache, `/static/*` cache 1 năm). CloudFront Functions và Lambda@Edge cho phép chạy code tại edge để modify request/response. Pricing dựa trên data transfer và request count.

## Detailed Answer (EN)
$7a
