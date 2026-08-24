---
id: certificate-pinning-la-gi-va-cach-implement
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Certificate pinning là gì và cách implement?

## Question (EN)
What is certificate pinning and how do you implement it?

## Đáp án chi tiết (VI)
Certificate pinning đảm bảo app chỉ giao tiếp với server có certificate SSL cụ thể, ngăn chặn tấn công man-in-the-middle. Dùng `CertificatePinner` của OkHttp để pin public key hash. \
\
**Ví dụ:** `CertificatePinner.Builder().add(\\"example.com\\

## Detailed Answer (EN)
Certificate pinning ensures your app only communicates with servers having a specific SSL certificate, preventing man-in-the-middle attacks. Use OkHttp's `CertificatePinner` to pin public key hashes. \
\
**Example:** `CertificatePinner.Builder().add(\\"example.com\\
