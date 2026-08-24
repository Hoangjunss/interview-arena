---
id: mobile-first-indexing-la-gi-dev-can-luu-y-gi
position: backend
technology: technical
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mobile-first indexing là gì? Dev cần lưu ý gì?

## Question (EN)
What is mobile-first indexing? What should developers watch out for?

## Đáp án chi tiết (VI)
Mobile-first indexing nghĩa là Google dùng **phiên bản mobile** của trang (crawl bằng Googlebot smartphone) để index và ranking — không phải phiên bản desktop. Nội dung chỉ có trên desktop mà thiếu trên mobile sẽ không được tính khi xếp hạng.\
\
**Dev cần lưu ý**: (1) **Content parity** — bản mobile phải chứa cùng nội dung chính với desktop; ẩn bớt nội dung trên mobile đồng nghĩa mất nội dung trong index. (2) **Structured data và meta robots** phải có mặt như nhau trên cả 2 phiên bản. (3) **Không lazy-load nội dung chính** theo user interaction (scroll/click) — Googlebot không tương tác với trang. (4) **Không block resources** (CSS/JS/ảnh) trong robots.txt. (5) Ảnh chất lượng cao, alt text đầy đủ, URL ảnh ổn định (không đổi mỗi lần load). (6) Title và meta description tương đương giữa 2 phiên bản.\
\
Google khuyến nghị **responsive design** (1 URL, 1 HTML cho mọi thiết bị) — dễ triển khai nhất và tránh toàn bộ vấn đề parity của kiểu separate URLs (m.example.com).

## Detailed Answer (EN)
$83
