---
id: lam-the-nao-de-tich-hop-firebase-authentication-vao-flutter-va-nhung-loi-pho-bie
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để tích hợp Firebase Authentication vào Flutter và những lỗi phổ biến là gì?

## Question (EN)
How do you integrate Firebase Authentication in Flutter and what are common pitfalls?

## Đáp án chi tiết (VI)
Dùng package `firebase_auth`: `await FirebaseAuth.instance.signInWithEmailAndPassword(email: email, password: password)`. Lắng nghe trạng thái auth bằng `authStateChanges()` stream—đây là cách đúng để biết user đã đăng nhập chưa. Lưu ý phổ biến: (1) không lắng nghe `authStateChanges()` mà kiểm tra `currentUser` ngay lập tức—có thể null khi app mới mở; (2) quên bật Email/Password provider trong Firebase Console; (3) quên thêm entitlement trên iOS; (4) không wrap trong try/catch dẫn đến crash khi mất mạng. Lưu ý: SHA-1 chỉ cần thiết cho Google Sign-In và OAuth provider, KHÔNG cần cho email/password auth. Luôn test cả trường hợp offline.

## Detailed Answer (EN)
Use `firebase_auth`: `await FirebaseAuth.instance.signInWithEmailAndPassword(email: email, password: password)`. Listen to auth state via `authStateChanges()` stream — the correct way to know if a user is signed in. Common pitfalls: (1) checking `currentUser` immediately on startup (may be null); (2) forgetting to enable the Email/Password sign-in provider in Firebase Console; (3) missing iOS entitlements; (4) not wrapping auth calls in try/catch for network errors. Note: SHA-1 is only required for Google Sign-In and OAuth providers — not for email/password auth.
