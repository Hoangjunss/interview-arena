---
id: crawl-budget-la-gi-cach-toi-uu-cho-website-lon
position: backend
technology: technical
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Crawl budget là gì? Cách tối ưu cho website lớn?

## Question (EN)
What is crawl budget? How do you optimize it for large websites?

## Đáp án chi tiết (VI)
Crawl budget là số pages Googlebot crawl trong một khoảng thời gian — waste crawl budget bằng duplicate URLs hay redirect chains có thể khiến important pages không được index.\
\
Gồm 2 yếu tố: **Crawl rate limit** (tốc độ crawl không gây quá tải server) và **Crawl demand** (Google muốn crawl bao nhiêu dựa trên popularity/freshness). Quan trọng khi website \u003e10,000 pages.\
\
Lãng phí crawl budget: (1) duplicate content (URL parameters, www/non-www), (2) soft 404s (trang trống return 200), (3) redirect chains (A→B→C→D), (4) infinite URL spaces (calendar, filters tạo vô hạn URL combinations).\
\
Tối ưu: canonical tags, robots.txt block unnecessary paths, clean URL structure, sitemap chỉ chứa important pages, server response time \u003c500ms, dùng 410 thay vì 404 cho permanently deleted pages. Lưu ý: `rel=next/prev` cho pagination đã bị Google deprecated từ tháng 3/2019 — không còn hiệu lực.

## Detailed Answer (EN)
Crawl budget is the number of pages Googlebot crawls in a given time period — wasting it on duplicate URLs or redirect chains can prevent important pages from being indexed.\
\
It consists of two factors: **Crawl rate limit** (the speed at which Googlebot crawls without overloading the server) and **Crawl demand** (how much Google wants to crawl based on popularity and freshness). This matters most for websites with over 10,000 pages.\
\
Common crawl budget waste: (1) duplicate content (URL parameters, www vs non-www), (2) soft 404s (empty pages returning a 200 status), (3) redirect chains (A→B→C→D), (4) infinite URL spaces (calendars, filters creating endless URL combinations).\
\
Optimization: canonical tags, blocking unnecessary paths in robots.txt, clean URL structure, sitemaps listing only important pages, server response time under 500ms, using 410 instead of 404 for permanently deleted pages. Note: `rel=next/prev` for pagination was deprecated by Google in March 2019 — it no longer has any effect.
