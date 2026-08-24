---
id: push-notification-hoat-dong-the-nao-fcm-va-apns-dong-vai-tro-gi
position: backend
technology: notifications
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Push notification hoạt động thế nào? FCM và APNs đóng vai trò gì?

## Question (EN)
How do push notifications work, and what roles do FCM and APNs play?

## Đáp án chi tiết (VI)
Push notification cho phép server chủ động gửi tin tới thiết bị **kể cả khi app không mở**, thông qua dịch vụ trung gian của nền tảng.\
\
Luồng chuẩn:\
1. App **đăng ký** và nhận một **device token** duy nhất từ dịch vụ push (**FCM** cho Android/đa nền, **APNs** cho iOS).\
2. App gửi token này về **backend** lưu lại.\
3. Khi cần, backend gọi FCM/APNs kèm token + payload; dịch vụ đẩy tin tới đúng thiết bị.\
4. App nhận và hiển thị (hoặc xử lý im lặng với data-only message).\
\
Lưu ý:\
- FCM là giải pháp **đa nền tảng** (Android, iOS, web), payload tối đa ~4KB.\
- Phân biệt **notification message** (OS tự hiển thị) và **data message** (app tự xử lý).\
- Android 13+ cần **quyền `POST_NOTIFICATIONS`** lúc chạy; iOS cần người dùng cho phép.\
\
Hay hỏi: xử lý noti khi app ở foreground vs background/killed, và vòng đời của token (có thể refresh).

## Detailed Answer (EN)
Push notifications let a server proactively send messages to a device **even when the app is closed**, through the platform's intermediary service.\
\
Standard flow:\
1. The app **registers** and receives a unique **device token** from the push service (**FCM** for Android/cross-platform, **APNs** for iOS).\
2. The app sends this token to the **backend** to store.\
3. When needed, the backend calls FCM/APNs with the token + payload; the service delivers to the right device.\
4. The app receives and displays it (or handles it silently for data-only messages).\
\
Notes:\
- FCM is a **cross-platform** solution (Android, iOS, web), payload up to ~4KB.\
- Distinguish a **notification message** (OS displays it) from a **data message** (the app handles it).\
- Android 13+ needs the runtime **`POST_NOTIFICATIONS` permission**; iOS needs user consent.\
\
Common ask: handling notifications with the app in foreground vs background/killed, and token lifecycle (it can refresh).
