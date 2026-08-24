---
id: vong-doi-app-mobile-foreground-background-la-gi-react-native-theo-doi-bang-cach
position: backend
technology: lifecycle
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vòng đời app mobile (foreground/background) là gì? React Native theo dõi bằng cách nào?

## Question (EN)
What is the mobile app lifecycle (foreground/background) and how does React Native track it?

## Đáp án chi tiết (VI)
Khác với vòng đời từng màn, app mobile còn có **trạng thái toàn app** do OS quản: đang mở (foreground), chạy nền (background), hoặc bị hệ thống thu hồi (killed).\
\
Vì sao quan trọng:\
- Vào **background** nên dừng camera/animation/timer, lưu state, ngắt kết nối nặng để tiết kiệm pin.\
- Quay lại **foreground** nên làm mới dữ liệu, kiểm tra token, reconnect.\
- OS có thể **kill** app ở nền bất cứ lúc nào → không dựa vào việc còn sống.\
\
RN theo dõi bằng **`AppState`**:\
- Giá trị: `active` (foreground), `background`, và `inactive` (iOS, đang chuyển tiếp).\
- Nghe đổi trạng thái qua `AppState.addEventListener('change', handler)` (nhớ gỡ khi unmount).\
\
Đối chiếu native: Android dùng lifecycle callback + process lifecycle; iOS dùng các sự kiện scene/app delegate.

## Detailed Answer (EN)
Beyond per-screen lifecycles, a mobile app also has an **app-wide state** managed by the OS: open (foreground), running in the background, or reclaimed by the system (killed).\
\
Why it matters:\
- Going to the **background**, you should stop camera/animation/timers, save state, and drop heavy connections to save battery.\
- Returning to the **foreground**, you should refresh data, check tokens, reconnect.\
- The OS can **kill** a backgrounded app at any time → do not assume it stays alive.\
\
RN tracks this with **`AppState`**:\
- Values: `active` (foreground), `background`, and `inactive` (iOS, transitional).\
- Listen for changes via `AppState.addEventListener('change', handler)` (remove it on unmount).\
\
Native equivalents: Android uses lifecycle callbacks + process lifecycle; iOS uses scene/app-delegate events.
