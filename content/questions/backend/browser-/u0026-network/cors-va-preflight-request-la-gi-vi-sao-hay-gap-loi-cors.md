---
id: cors-va-preflight-request-la-gi-vi-sao-hay-gap-loi-cors
position: backend
technology: browser-\u0026-network
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CORS và preflight request là gì? Vì sao hay gặp lỗi CORS?

## Question (EN)
What are CORS and preflight requests? Why do CORS errors happen?

## Đáp án chi tiết (VI)
Same-Origin Policy chặn `fetch`/XHR **đọc** dữ liệu cross-origin; **CORS** là cơ chế server dùng HTTP header để cho phép origin khác đọc.\
\
- **Simple request** (GET/HEAD/POST + `Content-Type` safelisted): không có preflight.\
- **Preflighted**: khi dùng method khác, custom header, hoặc `Content-Type: application/json` → trình duyệt gửi `OPTIONS` trước kèm `Access-Control-Request-Method/-Headers`; server phải trả `Access-Control-Allow-Origin/-Methods/-Headers`.\
\
Lỗi CORS thường gặp:\
- Thiếu `Access-Control-Allow-Origin`.\
- Dùng `*` khi request có credentials — phải ghi **origin cụ thể** + `Access-Control-Allow-Credentials: true`.\
- Preflight bị từ chối (OPTIONS không trả 2xx).\
\
Lưu ý: CORS do **trình duyệt** thực thi — không phải cơ chế bảo vệ server.

## Detailed Answer (EN)
The Same-Origin Policy blocks `fetch`/XHR from **reading** cross-origin data; **CORS** is how a server uses HTTP headers to permit other origins to read it.\
\
- **Simple request** (GET/HEAD/POST + a safelisted `Content-Type`): no preflight.\
- **Preflighted**: when using another method, a custom header, or `Content-Type: application/json` → the browser first sends `OPTIONS` with `Access-Control-Request-Method/-Headers`; the server must answer with `Access-Control-Allow-Origin/-Methods/-Headers`.\
\
Common CORS errors:\
- Missing `Access-Control-Allow-Origin`.\
- Using `*` on a credentialed request — you must name a **specific origin** + `Access-Control-Allow-Credentials: true`.\
- Preflight rejected (OPTIONS did not return 2xx).\
\
Note: CORS is enforced by the **browser** — it is not a server-side protection.
