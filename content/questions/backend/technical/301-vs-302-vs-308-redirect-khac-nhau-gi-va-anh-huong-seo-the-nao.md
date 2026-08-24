---
id: 301-vs-302-vs-308-redirect-khac-nhau-gi-va-anh-huong-seo-the-nao
position: backend
technology: technical
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
301 vs 302 vs 308 redirect — khác nhau gì và ảnh hưởng SEO thế nào?

## Question (EN)
301 vs 302 vs 308 redirects — what are the differences and how do they affect SEO?

## Đáp án chi tiết (VI)
Khác biệt cốt lõi: **301/308 = permanent**, **302/307 = temporary** — và cặp 307/308 **giữ nguyên HTTP method + body**, còn 301/302 cho phép browser đổi POST thành GET (hành vi lịch sử).\
\
**Ảnh hưởng SEO**: (1) Redirect permanent là tín hiệu để Google chọn URL đích làm canonical — indexing pipeline chuyển sang index URL mới. (2) Redirect temporary: Googlebot vẫn follow nhưng KHÔNG coi URL đích là canonical — URL cũ tiếp tục được giữ trong index. (3) Link equity: redirect permanent chuyển tín hiệu ranking sang URL đích — đổi domain hay restructure URL cứ dùng 301/308, không sợ 'mất PageRank'. (4) Soft 404: redirect hàng loạt trang đã xóa về homepage hoặc trang không liên quan bị Google coi là soft 404 — redirect về trang thay thế liên quan, hoặc trả 404/410 thật.\
\
**Chọn thế nào**: đổi URL vĩnh viễn → 301 (đủ cho trang GET thông thường) hoặc 308 (khi cần giữ method cho form/API endpoint). Tạm thời (A/B test, bảo trì, campaign) → 302/307. Tránh redirect chains (A→B→C) — tốn crawl budget và chậm với user.

## Detailed Answer (EN)
$89
