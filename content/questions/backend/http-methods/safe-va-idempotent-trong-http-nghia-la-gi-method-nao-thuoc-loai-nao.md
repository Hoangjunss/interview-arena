---
id: safe-va-idempotent-trong-http-nghia-la-gi-method-nao-thuoc-loai-nao
position: backend
technology: http-methods
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Safe và idempotent trong HTTP nghĩa là gì? Method nào thuộc loại nào?

## Question (EN)
What do \\"safe\\" and \\"idempotent\\" mean in HTTP? Which methods are which?

## Đáp án chi tiết (VI)
**Safe** = method chỉ đọc, không làm thay đổi trạng thái phía server (`GET`, `HEAD`, `OPTIONS`). **Idempotent** = gọi 1 lần hay N lần cho cùng kết quả trạng thái (`GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`). Mọi method safe đều idempotent, ngược lại thì không.\
\
| Method | Safe | Idempotent |\
|---|---|---|\
| GET / HEAD | có | có |\
| PUT | không | có |\
| DELETE | không | có |\
| POST | không | **không** |\
| PATCH | không | **không** (trừ khi tự thiết kế được) |\
\
Hệ quả thực tế:\
- Proxy, crawler, prefetch của trình duyệt được phép gọi `GET` tự do. Nếu đặt `GET /orders/1/delete` thì một con bot quét link cũng xoá sạch dữ liệu.\
- Client và load balancer chỉ **tự retry an toàn** với method idempotent. `POST` bị timeout thì không biết server đã xử lý hay chưa — đó là lý do phải có idempotency key.\
\
`DELETE` vẫn idempotent dù lần đầu trả `204` còn lần sau trả `404`: idempotent nói về **trạng thái cuối cùng của server**, không phải về response giống hệt nhau.

## Detailed Answer (EN)
**Safe** = the method is read-only and does not change server state (`GET`, `HEAD`, `OPTIONS`). **Idempotent** = calling it once or N times leaves the same state (`GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`). Every safe method is idempotent; the converse is false.\
\
| Method | Safe | Idempotent |\
|---|---|---|\
| GET / HEAD | yes | yes |\
| PUT | no | yes |\
| DELETE | no | yes |\
| POST | no | **no** |\
| PATCH | no | **no** (unless you design it to be) |\
\
Practical consequences:\
- Proxies, crawlers, and browser prefetch may call `GET` freely. If you expose `GET /orders/1/delete`, a link-scanning bot can wipe your data.\
- Clients and load balancers may only **safely auto-retry** idempotent methods. A timed-out `POST` leaves you unsure whether the server processed it — which is exactly why idempotency keys exist.\
\
`DELETE` is still idempotent even if the first call returns `204` and the next returns `404`: idempotency is about the **resulting server state**, not about identical responses.
