---
id: cors-la-gi-va-cau-hinh-phia-server-the-nao-cho-dung
position: backend
technology: cors
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CORS là gì và cấu hình phía server thế nào cho đúng?

## Question (EN)
What is CORS and how do you configure it correctly on the server?

## Đáp án chi tiết (VI)
Trình duyệt áp **same-origin policy**: JS ở origin A mặc định không đọc được response từ origin B (khác scheme/host/port). **CORS** là cơ chế server **cho phép có kiểm soát** một số cross-origin request, bằng cách trả các header phản hồi.\
\
Đây là quyết định **phía server**:\
- `Access-Control-Allow-Origin`: origin được phép. **Liệt kê rõ** các origin tin cậy; **không** dùng `*` cho API cần credential/nhạy cảm.\
- `Access-Control-Allow-Methods` / `-Headers`: method và header được phép.\
- `Access-Control-Allow-Credentials: true` nếu cần gửi cookie — khi đó **không được** dùng `*` cho origin.\
- **Preflight**: với request \\"non-simple\\" (PUT/DELETE, header tùy biến), trình duyệt gửi `OPTIONS` trước; server phải trả đúng các header trên (kèm `Max-Age` để cache).\
\
Lưu ý bảo mật: CORS **không** phải cơ chế xác thực — nó chỉ nới same-origin cho trình duyệt. Đừng phản chiếu (reflect) bừa `Origin` của request vào `Allow-Origin`; hãy allow-list.

## Detailed Answer (EN)
Browsers enforce the **same-origin policy**: JS on origin A cannot, by default, read a response from origin B (different scheme/host/port). **CORS** is the mechanism by which a server **selectively permits** some cross-origin requests, by returning response headers.\
\
This is a **server-side** decision:\
- `Access-Control-Allow-Origin`: the permitted origin. **Explicitly list** trusted origins; **do not** use `*` for credentialed/sensitive APIs.\
- `Access-Control-Allow-Methods` / `-Headers`: the allowed methods and headers.\
- `Access-Control-Allow-Credentials: true` if cookies must be sent — in which case you **cannot** use `*` for the origin.\
- **Preflight**: for \\"non-simple\\" requests (PUT/DELETE, custom headers) the browser sends an `OPTIONS` first; the server must return the headers above (plus `Max-Age` to cache it).\
\
Security note: CORS is **not** an authentication mechanism — it only relaxes same-origin for browsers. Do not blindly reflect the request's `Origin` into `Allow-Origin`; use an allow-list.
