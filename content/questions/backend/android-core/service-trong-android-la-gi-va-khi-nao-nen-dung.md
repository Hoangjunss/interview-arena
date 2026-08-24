---
id: service-trong-android-la-gi-va-khi-nao-nen-dung
position: backend
technology: android-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service trong Android là gì và khi nào nên dùng?

## Question (EN)
What is a Service in Android and when should you use it?

## Đáp án chi tiết (VI)
Service là component chạy nền không có tương tác người dùng, thích hợp cho các tác vụ chạy lâu như phát nhạc, tải file, hay theo dõi vị trí. Service không có UI nhưng chạy trên main thread mặc định, nên cần offload tác vụ nặng sang background thread hoặc coroutine. Foreground service hiển thị notification liên tục và dùng cho tác vụ nền ưu tiên cao.

## Detailed Answer (EN)
A Service is a background component that runs without user interaction, perfect for long-running tasks like music playback, file downloads, or location tracking. Services don't have UI but run on the main thread by default, so long operations should be offloaded to background threads or coroutines. Foreground services show a persistent notification and are used for high-priority background tasks.
