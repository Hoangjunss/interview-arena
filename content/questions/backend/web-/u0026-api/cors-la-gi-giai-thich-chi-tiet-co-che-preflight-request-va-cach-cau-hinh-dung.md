---
id: cors-la-gi-giai-thich-chi-tiet-co-che-preflight-request-va-cach-cau-hinh-dung
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CORS là gì? Giải thích chi tiết cơ chế preflight request và cách cấu hình đúng.

## Question (EN)
What is CORS? Explain the preflight request mechanism and how to configure it correctly.

## Đáp án chi tiết (VI)
CORS (Cross-Origin Resource Sharing) là cơ chế browser ngăn JavaScript đọc response từ origin khác (khác domain/port/protocol) — Same-Origin Policy. Khi cần cross-origin, server phải trả về CORS headers. Simple requests (GET/POST với Content-Type text/plain hoặc form) không cần preflight. Preflight request là OPTIONS request tự động browser gửi trước khi gửi non-simple request (PUT/DELETE/custom headers/JSON body) — server phải trả `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Origin`.\
\
Cấu hình đúng: `Access-Control-Allow-Origin: https://yourdomain.com` (không nên `*` cho authenticated endpoints), `Access-Control-Allow-Credentials: true` nếu dùng cookies"])</script><script>self.__next_f.push([1,

## Detailed Answer (EN)
$88
