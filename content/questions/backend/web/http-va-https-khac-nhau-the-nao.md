---
id: http-va-https-khac-nhau-the-nao
position: backend
technology: web
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTP và HTTPS khác nhau thế nào?

## Question (EN)
What is the difference between HTTP and HTTPS?

## Đáp án chi tiết (VI)
HTTPS là **HTTP chạy trên TLS** — thêm lớp mã hóa cho kết nối, còn ngữ nghĩa HTTP (method, status, header) giữ nguyên.\
\
HTTPS đảm bảo 3 điều mà HTTP thuần không có:\
- **Bảo mật (confidentiality)**: dữ liệu được **mã hóa**, bên nghe lén không đọc được (chống eavesdropping).\
- **Toàn vẹn (integrity)**: phát hiện nếu dữ liệu bị **sửa** trên đường truyền.\
- **Xác thực (authentication)**: **chứng chỉ TLS** (do CA cấp) chứng minh bạn đúng đang nói chuyện với server thật, chống giả mạo/man-in-the-middle.\
\
- Cổng mặc định: HTTP **80**, HTTPS **443**.\
- **Handshake TLS**: dùng bất đối xứng để trao khóa, rồi mã hóa đối xứng cho dữ liệu (nhanh).\
\
Ngày nay HTTPS là chuẩn bắt buộc; trình duyệt cảnh báo trang HTTP và nhiều tính năng (HTTP/2, service worker) yêu cầu HTTPS.

## Detailed Answer (EN)
HTTPS is **HTTP over TLS** — it adds an encryption layer to the connection while keeping HTTP semantics (methods, status, headers) unchanged.\
\
HTTPS provides three things plain HTTP lacks:\
- **Confidentiality**: data is **encrypted**, so eavesdroppers cannot read it.\
- **Integrity**: detects if data is **tampered with** in transit.\
- **Authentication**: a **TLS certificate** (issued by a CA) proves you are talking to the real server, preventing spoofing/man-in-the-middle.\
\
- Default ports: HTTP **80**, HTTPS **443**.\
- **TLS handshake**: asymmetric crypto to exchange keys, then symmetric encryption for the data (fast).\
\
Today HTTPS is the norm; browsers warn on HTTP pages and many features (HTTP/2, service workers) require HTTPS.
