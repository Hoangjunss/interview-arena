---
id: lam-sao-tu-dong-refresh-token-khi-request-tra-ve-401-axios-fetch-interceptor
position: backend
technology: auth-\u0026-token
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao tự động refresh token khi request trả về 401 (axios/fetch interceptor)?

## Question (EN)
How do you auto-refresh the token when a request returns 401 (axios/fetch interceptor)?

## Đáp án chi tiết (VI)
Gắn một **response interceptor**: khi nhận `401` do access token hết hạn → gọi refresh MỘT lần, lấy access token mới, rồi **retry** request gốc.\
\
Điểm hay bị hỏi sâu: khi đang refresh mà nhiều request khác cũng nhận `401`, chúng phải **xếp hàng chờ** (queue) token mới thay vì mỗi request tự gọi refresh song song — tránh gọi refresh nhiều lần và race condition. Khi refresh xong, \\"flush\\" hàng đợi để retry tất cả.\
\
Lưu ý: request gọi refresh phải **được loại khỏi** interceptor để không tạo vòng lặp; nếu refresh thất bại → đăng xuất và điều hướng về trang login.

## Detailed Answer (EN)
Attach a **response interceptor**: on a `401` caused by an expired access token, call refresh ONCE, get a new access token, then **retry** the original request.\
\
The deep follow-up: while a refresh is in flight, other requests that also get `401` must **queue and wait** for the new token instead of each firing its own refresh in parallel — this avoids duplicate refreshes and a race condition. Once refresh resolves, flush the queue and retry all of them.\
\
Note: the refresh call itself must be **excluded** from the interceptor to avoid an infinite loop; if refresh fails, log out and redirect to login.
