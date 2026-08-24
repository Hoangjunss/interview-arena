---
id: broadcastreceiver-la-gi-va-hoat-dong-nhu-the-nao
position: backend
technology: android-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
BroadcastReceiver là gì và hoạt động như thế nào?

## Question (EN)
What are BroadcastReceivers and how do they work?

## Đáp án chi tiết (VI)
BroadcastReceiver là component lắng nghe các broadcast trong toàn hệ thống (như pin yếu, thay đổi network, hay broadcast tùy chỉnh). Bạn đăng ký nó trong manifest (static) hoặc trong code (dynamic), và nó kích hoạt `onReceive()` khi nhận được broadcast phù hợp. Tránh thực hiện tác vụ nặng trong `onReceive()` vì phải hoàn thành nhanh — dùng WorkManager cho tác vụ dài.

## Detailed Answer (EN)
BroadcastReceiver is a component that listens for system-wide broadcasts (like battery low, network changes, or custom broadcasts). Register it statically in the manifest or dynamically in code, and it triggers `onReceive()` when matching broadcasts are sent. Avoid heavy operations in `onReceive()` since it must complete quickly — use WorkManager for long tasks.
