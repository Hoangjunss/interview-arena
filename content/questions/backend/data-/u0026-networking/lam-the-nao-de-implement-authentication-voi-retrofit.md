---
id: lam-the-nao-de-implement-authentication-voi-retrofit
position: backend
technology: data-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để implement authentication với Retrofit?

## Question (EN)
How do you implement authentication with Retrofit?

## Đáp án chi tiết (VI)
Dùng Interceptor để thêm auth header vào mọi request. Khi token hết hạn, interface Authenticator xử lý token refresh bằng cách chặn response 401 và retry với token mới. Lưu token an toàn trong EncryptedSharedPreferences. Gửi token trong Authorization header: `Authorization: Bearer token`. Xử lý token hết hạn một cách graceful để người dùng không thấy lỗi.

## Detailed Answer (EN)
Use an Interceptor to add authentication headers to every request. When the token expires, the Authenticator interface handles token refresh by intercepting 401 responses and retrying with a new token. Store tokens securely in EncryptedSharedPreferences. Send the token in the Authorization header: `Authorization: Bearer token`. Handle expired tokens gracefully to avoid showing errors to users.
