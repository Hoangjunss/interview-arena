---
id: su-khac-biet-giua-process-va-thread-trong-android
position: backend
technology: android-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa Process và Thread trong Android?

## Question (EN)
What are the differences between Process and Thread in Android?

## Đáp án chi tiết (VI)
Process là một instance riêng biệt của app với bộ nhớ và tài nguyên riêng, chạy độc lập với các process khác. Thread là đơn vị thực thi nhẹ hơn trong một process, chia sẻ bộ nhớ với các thread khác. Android app có main thread (UI thread) xử lý toàn bộ UI, còn background thread xử lý tác vụ nặng. Tuyệt đối không được block main thread.

## Detailed Answer (EN)
A Process is a separate instance of the app with its own memory space and resources, running independently. A Thread is a lightweight execution unit within a process that shares memory with other threads. Android apps have a main thread (UI thread) that handles all UI operations, and background threads handle heavy tasks. Never block the main thread.
