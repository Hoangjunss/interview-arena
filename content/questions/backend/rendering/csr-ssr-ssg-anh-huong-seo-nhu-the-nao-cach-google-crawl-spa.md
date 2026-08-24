---
id: csr-ssr-ssg-anh-huong-seo-nhu-the-nao-cach-google-crawl-spa
position: backend
technology: rendering
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSR, SSR, SSG ảnh hưởng SEO như thế nào? Cách Google crawl SPA?

## Question (EN)
How do CSR, SSR, and SSG affect SEO? How does Google crawl SPAs?

## Đáp án chi tiết (VI)
Rendering strategy là yếu tố critical ảnh hưởng khả năng Google index content — CSR là rủi ro cao nhất, SSR/SSG an toàn nhất.\
\
CSR (Client-Side Rendering): HTML ban đầu trống, JS render content → Google phải chờ JS execute (second wave indexing). Rủi ro: Googlebot có thể timeout, content không index đầy đủ, crawl budget lãng phí.\
\
SSR (Server-Side Rendering): HTML đầy đủ từ server → Google index ngay lập tức, tốt nhất cho SEO.\
\
SSG (Static Site Generation): HTML pre-built → nhanh nhất, SEO tốt cho content tĩnh.\
\
Google crawl SPA: Googlebot dùng Chromium headless (evergreen — luôn theo bản Chrome ổn định từ 2019), render JS rồi mới index — độ trễ render trung bình chỉ vài giây đến vài phút, nhưng CSR vẫn mang rủi ro index: render budget, JS lỗi khiến content không xuất hiện. Nếu bắt buộc CSR: đảm bảo critical content nằm trong initial HTML. Lưu ý Google đã deprecated dynamic rendering (coi là workaround, không phải giải pháp lâu dài) — dùng SSR/SSG hoặc prerendering thay thế.

## Detailed Answer (EN)
$87
