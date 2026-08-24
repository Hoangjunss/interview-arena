---
id: sitemap-xml-la-gi-khi-nao-can-va-cach-tao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sitemap XML là gì? Khi nào cần và cách tạo?

## Question (EN)
What is an XML sitemap? When do you need one, and how do you create it?

## Đáp án chi tiết (VI)
Sitemap XML (`sitemap.xml`) là file liệt kê tất cả URLs quan trọng của website, giúp search engine khám phá và index nhanh hơn. Format: `\u003curlset\u003e` chứa nhiều `\u003curl\u003e`, mỗi url có `\u003cloc\u003e` (URL), `\u003clastmod\u003e` (ngày cập nhật), `\u003cchangefreq\u003e` và `\u003cpriority\u003e` — lưu ý Google đã giảm tầm quan trọng của hai trường này từ ~2022 (vẫn giữ cho tương thích).\
\
Khi nào CẦN: website lớn (\u003e500 trang), trang mới tạo chưa có backlinks, website có nhiều content động (blog, e-commerce), trang deep link (\u003e3 clicks từ homepage). Khi nào KHÔNG cần: website nhỏ (\u003c50 trang) với navigation tốt.\
\
Trong Next.js: dùng `app/sitemap.ts` export function trả về mảng URLs — Next.js tự generate sitemap.xml. Giới hạn: max 50,000 URLs hoặc 50MB mỗi sitemap, dùng sitemap index cho website lớn hơn.

## Detailed Answer (EN)
An XML sitemap (`sitemap.xml`) is a file listing all important URLs on a website, helping search engines discover and index content faster. Format: `\u003curlset\u003e` contains multiple `\u003curl\u003e` entries, each with `\u003cloc\u003e` (URL), `\u003clastmod\u003e` (last modified date), `\u003cchangefreq\u003e` and `\u003cpriority\u003e` — note that Google de-emphasized these last two fields since ~2022 (keep them for compatibility but they have limited impact).\
\
When you NEED one: large websites (\u003e500 pages), newly launched sites without backlinks, sites with lots of dynamic content (blog, e-commerce), and pages that are deep in the site structure (\u003e3 clicks from homepage). When you DON'T need one: small sites (\u003c50 pages) with good navigation.\
\
In Next.js: use `app/sitemap.ts` exporting a function that returns an array of URLs — Next.js auto-generates sitemap.xml. Limits: max 50,000 URLs or 50MB per sitemap; use a sitemap index for larger sites.
