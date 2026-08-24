---
id: cac-chi-so-web-performance-lcp-inp-cls-ttfb-la-gi-va-toi-uu-the-nao
position: backend
technology: web-perf
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các chỉ số web performance LCP, INP, CLS, TTFB là gì và tối ưu thế nào?

## Question (EN)
What are the web performance metrics LCP, INP, CLS, and TTFB, and how do you optimize them?

## Đáp án chi tiết (VI)
LCP (Largest Contentful Paint) đo thời gian phần tử lớn nhất hiển thị trên màn hình, phản ánh tốc độ tải trực quan. INP (Interaction to Next Paint) đo thời gian phản hồi của tất cả tương tác trong suốt vòng đời trang, không chỉ tương tác đầu tiên — thay thế FID từ tháng 3/2024 trong Core Web Vitals. CLS (Cumulative Layout Shift) đo mức độ dịch chuyển layout bất ngờ, ảnh hưởng đến trải nghiệm ổn định thị giác. TTFB (Time to First Byte) đo thời gian từ lúc gửi request đến khi nhận byte đầu tiên từ server.\
\
Để tối ưu: lazy load hình ảnh, code splitting, minify tài nguyên, cache hiệu quả, dùng CDN, và tối ưu server response time.

## Detailed Answer (EN)
LCP (Largest Contentful Paint) measures how long the largest visible element takes to render — reflects perceived load speed. INP (Interaction to Next Paint) measures the responsiveness of all interactions throughout the page lifecycle, not just the first — it replaced FID in Core Web Vitals in March 2024. CLS (Cumulative Layout Shift) measures unexpected layout movement — affects visual stability. TTFB (Time to First Byte) measures the time from sending a request to receiving the first byte from the server.\
\
To optimize: lazy-load images, code splitting, minify assets, effective caching, CDN usage, and optimize server response time.
