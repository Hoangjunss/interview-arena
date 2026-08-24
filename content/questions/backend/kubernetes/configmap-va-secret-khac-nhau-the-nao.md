---
id: configmap-va-secret-khac-nhau-the-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ConfigMap và Secret khác nhau thế nào?

## Question (EN)
What is the difference between a ConfigMap and a Secret?

## Đáp án chi tiết (VI)
Cả hai **tách cấu hình khỏi image** để cùng một image chạy ở nhiều môi trường. Đưa vào pod qua **biến môi trường** hoặc **mount thành file**.\
\
- **ConfigMap**: dữ liệu cấu hình **không nhạy cảm** dạng plaintext (URL, feature flag, tên host).\
- **Secret**: dữ liệu **nhạy cảm** (mật khẩu, API key, token, chứng chỉ). Lưu **base64** và được xử lý riêng.\
\
Lưu ý quan trọng: base64 **không phải mã hóa** — mặc định Secret chỉ được encode. Muốn an toàn thật phải bật **encryption at rest** cho etcd và siết **RBAC**, hoặc dùng external secret store (Vault, cloud KMS).

## Detailed Answer (EN)
Both **decouple config from the image** so one image runs across environments. They are injected into pods as **env vars** or **mounted files**.\
\
- **ConfigMap**: **non-sensitive** configuration in plaintext (URLs, feature flags, hostnames).\
- **Secret**: **sensitive** data (passwords, API keys, tokens, certificates). Stored **base64-encoded** and handled separately.\
\
Key caveat: base64 is **not encryption** — by default a Secret is only encoded. For real protection enable **encryption at rest** for etcd, tighten **RBAC**, or use an external secret store (Vault, cloud KMS).
