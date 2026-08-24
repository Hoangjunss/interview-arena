---
id: platform-channel-la-gi-flutter-goi-ma-native-android-ios-nhu-the-nao
position: backend
technology: platform-integration
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Platform channel là gì? Flutter gọi mã native (Android/iOS) như thế nào?

## Question (EN)
What is a platform channel and how does Flutter call native (Android/iOS) code?

## Đáp án chi tiết (VI)
Platform channel là cơ chế **truyền message giữa Dart và mã native** khi cần API mà Flutter chưa bọc sẵn (Bluetooth, cảm biến, SDK riêng).\
\
Cách hoạt động:\
- Phía Dart dùng `MethodChannel` (đặt tên duy nhất) gọi một method kèm tham số.\
- Message được **serialize** qua codec chuẩn rồi gửi sang phía host (Kotlin/Java trên Android, Swift/Objective-C trên iOS), nơi đăng ký handler xử lý và trả kết quả về (dạng `Future`).\
- Các loại: `MethodChannel` (gọi hàm), `EventChannel` (stream sự kiện native → Dart), `BasicMessageChannel` (message tùy biến).\
\
Lưu ý: giao tiếp **bất đồng bộ**; xử lý nặng nên chạy nền phía native để không nghẽn UI. Đây cũng chính là ý tưởng \\"native module/bridge\\" chung của mobile cross-platform.

## Detailed Answer (EN)
A platform channel is the mechanism to **pass messages between Dart and native code** when you need an API Flutter does not wrap (Bluetooth, sensors, a proprietary SDK).\
\
How it works:\
- On the Dart side, a `MethodChannel` (with a unique name) invokes a method with arguments.\
- The message is **serialized** via a standard codec and sent to the host (Kotlin/Java on Android, Swift/Objective-C on iOS), where a registered handler processes it and returns a result (as a `Future`).\
- Types: `MethodChannel` (call functions), `EventChannel` (native event stream → Dart), `BasicMessageChannel` (custom messages).\
\
Note: communication is **asynchronous**; run heavy work on a native background thread so the UI is not blocked. This is the general \\"native module/bridge\\" idea shared by cross-platform mobile.
