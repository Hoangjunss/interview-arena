---
id: https-tls-hoat-dong-the-nao-handshake-gom-nhung-buoc-nao
position: backend
technology: tls
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTPS/TLS hoạt động thế nào? Handshake gồm những bước nào?

## Question (EN)
How does HTTPS/TLS work, and what happens in the handshake?

## Đáp án chi tiết (VI)
HTTPS = HTTP chạy trên **TLS**. TLS cho ba đảm bảo: **mã hóa** (nghe lén không đọc được), **toàn vẹn** (không sửa được giữa đường), **xác thực** (chắc đang nói với đúng server qua chứng chỉ).\
\
**Handshake** (rút gọn) trước khi truyền dữ liệu:\
1. Client gửi `ClientHello`: các phiên bản TLS và cipher suite hỗ trợ + số ngẫu nhiên.\
2. Server chọn tham số, gửi **certificate** (chứa public key, do CA ký).\
3. Client **verify chứng chỉ** qua chuỗi CA tin cậy (đúng domain, còn hạn, không thu hồi).\
4. Hai bên trao đổi khóa (**ECDHE** cho forward secrecy) để cùng suy ra một **khóa phiên đối xứng** — bất đối xứng chỉ dùng để thiết lập, không dùng cho dữ liệu (chậm).\
5. Đổi sang mã hóa; từ đó dữ liệu được mã hóa bằng **khóa đối xứng** (nhanh).\
\
TLS 1.3 rút gọn còn ~1 vòng (1-RTT, có 0-RTT). Thực hành đúng: chỉ TLS 1.2+, cipher mạnh, HSTS, chứng chỉ hợp lệ.

## Detailed Answer (EN)
HTTPS = HTTP over **TLS**. TLS gives three guarantees: **encryption** (eavesdroppers cannot read), **integrity** (no tampering in transit), **authentication** (you are talking to the right server, via its certificate).\
\
The **handshake** (simplified) before any data flows:\
1. The client sends `ClientHello`: supported TLS versions and cipher suites + a random number.\
2. The server picks parameters and sends its **certificate** (containing its public key, signed by a CA).\
3. The client **verifies the certificate** against trusted CAs (right domain, not expired, not revoked).\
4. Both sides exchange keys (**ECDHE** for forward secrecy) to derive a shared **symmetric session key** — asymmetric crypto is used only to set up, not for the data (too slow).\
5. They switch to encryption; from then on data is encrypted with the fast **symmetric key**.\
\
TLS 1.3 trims this to ~1 round-trip (1-RTT, with 0-RTT). Good practice: TLS 1.2+ only, strong ciphers, HSTS, valid certificates.
