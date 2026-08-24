---
id: reverse-proxy-va-forward-proxy-khac-nhau-the-nao
position: backend
technology: proxy
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reverse proxy và forward proxy khác nhau thế nào?

## Question (EN)
What is the difference between a reverse proxy and a forward proxy?

## Đáp án chi tiết (VI)
Cả hai là trung gian, nhưng đứng ở **hai phía khác nhau** và phục vụ đối tượng khác nhau.\
\
- **Forward proxy**: đứng **trước client**, thay mặt **client** gửi request ra ngoài. Server đích chỉ thấy proxy, không thấy client. Dùng để: ẩn danh client, lọc/kiểm soát truy cập trong công ty, vượt chặn địa lý, cache phía client.\
- **Reverse proxy**: đứng **trước server**, thay mặt **server** nhận request từ internet rồi chuyển vào backend. Client tưởng đang nói với một server duy nhất. Dùng để: **load balancing**, **TLS termination**, **caching**, nén, che giấu/bảo vệ backend, định tuyến (nginx, HAProxy, Cloudflare).\
\
Mẹo nhớ: **forward = đại diện cho client**; **reverse = đại diện cho server**. Ai bị \\"giấu mặt\\" nói lên đó là loại proxy nào.

## Detailed Answer (EN)
Both are intermediaries, but they sit on **opposite sides** and serve different parties.\
\
- **Forward proxy**: sits **in front of clients**, sending requests outward on behalf of the **client**. The target server sees only the proxy, not the client. Used for: client anonymity, corporate access filtering/control, bypassing geo-blocks, client-side caching.\
- **Reverse proxy**: sits **in front of servers**, receiving internet requests on behalf of the **server** and forwarding to the backend. Clients think they talk to one server. Used for: **load balancing**, **TLS termination**, **caching**, compression, hiding/protecting the backend, routing (nginx, HAProxy, Cloudflare).\
\
Mnemonic: **forward = represents the client**; **reverse = represents the server**. Who is \\"hidden\\" tells you which one it is.
