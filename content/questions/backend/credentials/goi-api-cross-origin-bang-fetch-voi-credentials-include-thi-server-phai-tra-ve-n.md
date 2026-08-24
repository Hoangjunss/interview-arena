---
id: goi-api-cross-origin-bang-fetch-voi-credentials-include-thi-server-phai-tra-ve-n
position: backend
technology: credentials
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gọi API cross-origin bằng `fetch` với `credentials: 'include'` thì server phải trả về những header gì?

## Question (EN)
When calling a cross-origin API with `fetch` and `credentials: 'include'`, what must the server return?

## Đáp án chi tiết (VI)
Khi request mang cookie cross-origin, trình duyệt siết quy tắc chặt hơn bình thường. Server phải trả **đủ hai header**:\
\
- `Access-Control-Allow-Origin: https://app.example.com` — **phải là origin cụ thể**, dùng `*` sẽ bị chặn.\
- `Access-Control-Allow-Credentials: true`.\
\
Nếu là preflight, response `OPTIONS` cũng phải lặp lại hai header trên, và `Access-Control-Allow-Headers` cũng **không được dùng `*`** khi có credentials.\
\
```js\
await fetch('https://api.example.com/me', {\
  credentials: 'include', // send cookies cross-origin\
})\
```\
\
Phía cookie cũng phải hợp lệ: `SameSite=None; Secure`, nếu không trình duyệt sẽ **không đính kèm** dù CORS đã đúng — đây là nguyên nhân phổ biến nhất của lỗi \\"chạy local ổn, lên staging mất session\\".\
\
Lưu ý thêm: mặc định JS **chỉ đọc được** vài response header cơ bản. Muốn đọc header tự định nghĩa (vd `X-Total-Count`) phải khai `Access-Control-Expose-Headers`.

## Detailed Answer (EN)
Once a request carries cookies cross-origin, the browser applies stricter rules. The server must return **both** headers:\
\
- `Access-Control-Allow-Origin: https://app.example.com` — it **must be a concrete origin**; `*` is rejected.\
- `Access-Control-Allow-Credentials: true`.\
\
If a preflight is involved, the `OPTIONS` response must repeat both, and `Access-Control-Allow-Headers` **cannot be `*`** either when credentials are in play.\
\
```js\
await fetch('https://api.example.com/me', {\
  credentials: 'include', // send cookies cross-origin\
})\
```\
\
The cookie itself must also qualify: `SameSite=None; Secure`, otherwise the browser **will not attach it** even with correct CORS — the most common cause of \\"works locally, session disappears on staging\\".\
\
One more note: JS can only read a few basic response headers by default. To read a custom one (e.g. `X-Total-Count`) the server must list it in `Access-Control-Expose-Headers`.
