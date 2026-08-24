---
id: ma-hoa-doi-xung-va-bat-doi-xung-khac-nhau-the-nao-vi-sao-tls-dung-ca-hai
position: backend
technology: bảo-mật-mạng
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mã hóa đối xứng và bất đối xứng khác nhau thế nào? Vì sao TLS dùng cả hai?

## Question (EN)
How do symmetric and asymmetric encryption differ? Why does TLS use both?

## Đáp án chi tiết (VI)
- Mã hóa đối xứng: dùng chung một khóa bí mật cho cả mã hóa lẫn giải mã (AES, ChaCha20). Rất nhanh, phù hợp mã hóa lượng lớn dữ liệu — nhưng hai bên cần một cách an toàn để cùng có khóa.\
- Mã hóa bất đối xứng: dùng một cặp khóa public/private (RSA, ECC). Dữ liệu mã bằng public key chỉ giải được bằng private key tương ứng (và ngược lại cho chữ ký số). Giải quyết bài toán trao đổi khóa mà không cần chia sẻ bí mật trước, nhưng chậm hơn nhiều.\
Vì sao TLS/HTTPS dùng cả hai: bất đối xứng chỉ dùng trong handshake để xác thực server và thỏa thuận an toàn một session key; sau đó toàn bộ dữ liệu được mã hóa đối xứng bằng session key đó để đạt tốc độ. Lấy ưu điểm của cả hai.

## Detailed Answer (EN)
- Symmetric encryption: uses one shared secret key for both encryption and decryption (AES, ChaCha20). Very fast, ideal for bulk data — but both sides need a safe way to obtain the same key.\
- Asymmetric encryption: uses a public/private key pair (RSA, ECC). Data encrypted with the public key can only be decrypted by the matching private key (and vice versa for digital signatures). It solves key exchange without pre-sharing a secret, but is much slower.\
Why TLS/HTTPS uses both: asymmetric crypto is used only during the handshake to authenticate the server and securely agree on a session key; afterward all data is encrypted symmetrically with that session key for speed. This captures the best of both.
