---
id: code-signing-khi-phat-hanh-app-la-gi-vi-sao-can
position: backend
technology: deployment
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Code signing khi phát hành app là gì? Vì sao cần?

## Question (EN)
What is code signing when releasing an app, and why is it needed?

## Đáp án chi tiết (VI)
Trước khi lên store, app phải được **ký số (code signing)** bằng chứng chỉ — đây là cách nền tảng **xác thực nguồn gốc và toàn vẹn** của bản cài.\
\
Vì sao cần:\
- Đảm bảo app đến từ đúng nhà phát triển và **không bị sửa đổi** sau khi ký.\
- Store dùng chữ ký để cho phép **cập nhật** (bản mới phải cùng khóa ký với bản cũ).\
\
Android:\
- Ký APK/**App Bundle** bằng keystore. **Play App Signing**: Google giữ khóa ký chính, bạn dùng **upload key** để nộp (đặt lại được nếu lộ).\
- Debug build tự ký bằng chứng chỉ debug (store không nhận).\
\
iOS:\
- Cần **certificate + provisioning profile** từ Apple Developer, ràng buộc App ID/thiết bị/quyền (entitlements).\
\
Lưu ý bảo mật: **giữ khóa ký an toàn**, không commit vào repo — mất khóa (Android, không dùng Play App Signing) có thể mất khả năng cập nhật app. Hay hỏi: khác biệt upload key và app signing key.

## Detailed Answer (EN)
Before hitting the store, an app must be **code-signed** with a certificate — this is how the platform **verifies the origin and integrity** of the build.\
\
Why it is needed:\
- Ensures the app comes from the right developer and was **not modified** after signing.\
- Stores use the signature to allow **updates** (a new build must use the same signing key as the old one).\
\
Android:\
- Sign the APK/**App Bundle** with a keystore. **Play App Signing**: Google holds the main signing key, you submit with an **upload key** (resettable if compromised).\
- Debug builds self-sign with a debug certificate (stores reject it).\
\
iOS:\
- Needs a **certificate + provisioning profile** from Apple Developer, tied to the App ID/devices/entitlements.\
\
Security note: **keep signing keys safe**, never commit them — losing the key (on Android without Play App Signing) can mean losing the ability to update the app. Common ask: upload key vs app signing key.
