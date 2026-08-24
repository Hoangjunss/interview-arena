---
id: robots-txt-la-gi-cach-cau-hinh-dung
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
robots.txt là gì? Cách cấu hình đúng?

## Question (EN)
What is robots.txt? How do you configure it correctly?

## Đáp án chi tiết (VI)
`robots.txt` là file text đặt ở root domain (example.com/robots.txt) hướng dẫn search engine bots nên/không nên crawl phần nào của website. Syntax: `User-agent: *` (áp dụng cho tất cả bots), `Disallow: /admin` (không crawl /admin), `Allow: /admin/public` (ngoại lệ cho phép), `Sitemap: https://example.com/sitemap.xml`.\
\
Lưu ý quan trọng: robots.txt chỉ là 'yêu cầu', bot xấu có thể bỏ qua. `Disallow` KHÔNG giống `noindex` — trang vẫn có thể xuất hiện trên Google nếu có backlinks. Muốn chắc chắn không index → dùng `\u003cmeta name='robots' content='noindex'\u003e`.\
\
Sai lầm: block CSS/JS files khiến Google không render được trang → ảnh hưởng SEO nghiêm trọng.

## Detailed Answer (EN)
`robots.txt` is a text file placed at the root domain (example.com/robots.txt) that instructs search engine bots which parts of the website to crawl or avoid. Syntax: `User-agent: *` (applies to all bots), `Disallow: /admin` (do not crawl /admin), `Allow: /admin/public` (allow this exception), `Sitemap: https://example.com/sitemap.xml`.\
\
Important notes: robots.txt is just a 'request' — malicious bots may ignore it. `Disallow` is NOT the same as `noindex` — a page can still appear in Google if it has backlinks pointing to it. To guarantee non-indexing, use `\u003cmeta name='robots' content='noindex'\u003e`.\
\
A common mistake is blocking CSS/JS files, which prevents Google from rendering the page and seriously hurts SEO.
