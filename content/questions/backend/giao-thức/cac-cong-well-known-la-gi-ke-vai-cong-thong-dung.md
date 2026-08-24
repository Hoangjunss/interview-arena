---
id: cac-cong-well-known-la-gi-ke-vai-cong-thong-dung
position: backend
technology: giao-thức
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các cổng well-known là gì? Kể vài cổng thông dụng.

## Question (EN)
What are well-known ports? Name a few common ones.

## Đáp án chi tiết (VI)
Cổng (port) là số 16-bit (0–65535) giúp tầng Transport phân biệt nhiều dịch vụ chạy trên cùng một IP. IANA chia ba khoảng: well-known (0–1023, dịch vụ hệ thống), registered (1024–49151), và dynamic/ephemeral (49152–65535, dùng cho client tạm thời).\
\
Vài cổng well-known thường gặp:\
- 22 — SSH (remote shell, TCP)\
- 53 — DNS (phân giải tên, chủ yếu UDP, TCP cho zone transfer)\
- 80 — HTTP (TCP)\
- 443 — HTTPS (TCP; HTTP/3 chạy QUIC trên UDP 443)\
- 25 — SMTP (chuyển mail); 587 — SMTP submission\
Nhớ vài cổng đầu giúp đọc log/firewall rule và debug kết nối nhanh — ví dụ thấy traffic tới 443 tức là HTTPS.

## Detailed Answer (EN)
A port is a 16-bit number (0–65535) that lets the Transport layer distinguish multiple services running on the same IP. IANA splits the range into three: well-known (0–1023, system services), registered (1024–49151), and dynamic/ephemeral (49152–65535, used by transient clients).\
\
A few common well-known ports:\
- 22 — SSH (remote shell, TCP)\
- 53 — DNS (name resolution, mostly UDP, TCP for zone transfers)\
- 80 — HTTP (TCP)\
- 443 — HTTPS (TCP; HTTP/3 runs QUIC over UDP 443)\
- 25 — SMTP (mail relay); 587 — SMTP submission\
Remembering the first few ports speeds up reading logs/firewall rules and debugging connections — e.g. traffic to 443 means HTTPS.
