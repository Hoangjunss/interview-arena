---
id: luu-tru-du-lieu-nhay-cam-va-bao-mat-co-ban-tren-mobile-can-luu-y-gi
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lưu trữ dữ liệu nhạy cảm và bảo mật cơ bản trên mobile cần lưu ý gì?

## Question (EN)
What are the essentials of storing sensitive data and basic mobile security?

## Đáp án chi tiết (VI)
Thiết bị có thể bị mất, root/jailbreak, hoặc app bị dịch ngược → không được coi client là môi trường tin cậy.\
\
**Lưu trữ nhạy cảm:**\
- Token/mật khẩu/khóa để trong **kho an toàn của OS**: Android **Keystore** (hoặc EncryptedSharedPreferences), iOS **Keychain**. RN dùng `react-native-keychain`, Flutter dùng `flutter_secure_storage`.\
- **Không** để bí mật trong `SharedPreferences`/`AsyncStorage` plaintext, trong code, hay commit vào repo.\
\
**Truyền dữ liệu:**\
- Luôn **HTTPS/TLS**; cân nhắc **certificate pinning** cho app nhạy cảm.\
\
**Nguyên tắc khác:**\
- **Không tin client**: xác thực/uỷ quyền và validate lại ở **server** (client-side chỉ để UX).\
- Tối thiểu hóa dữ liệu và quyền; không log thông tin nhạy cảm.\
- Cân nhắc sinh trắc học (biometric) cho thao tác quan trọng, và kiểm tra tính toàn vẹn (Play Integrity/App Attest) khi cần.\
\
Hay hỏi: vì sao API key nhúng trong app không bao giờ thật sự bí mật.

## Detailed Answer (EN)
A device can be lost, rooted/jailbroken, or the app reverse-engineered → never treat the client as a trusted environment.\
\
**Sensitive storage:**\
- Keep tokens/passwords/keys in the **OS secure store**: Android **Keystore** (or EncryptedSharedPreferences), iOS **Keychain**. RN uses `react-native-keychain`, Flutter uses `flutter_secure_storage`.\
- **Never** put secrets in plaintext `SharedPreferences`/`AsyncStorage`, in code, or committed to the repo.\
\
**Data in transit:**\
- Always **HTTPS/TLS**; consider **certificate pinning** for sensitive apps.\
\
**Other principles:**\
- **Do not trust the client**: authenticate/authorize and re-validate on the **server** (client-side is only for UX).\
- Minimize data and permissions; do not log sensitive info.\
- Consider biometrics for critical actions, and integrity checks (Play Integrity/App Attest) where needed.\
\
Common ask: why an API key embedded in the app is never truly secret.
