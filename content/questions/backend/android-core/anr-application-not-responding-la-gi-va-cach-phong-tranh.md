---
id: anr-application-not-responding-la-gi-va-cach-phong-tranh
position: backend
technology: android-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ANR (Application Not Responding) là gì và cách phòng tránh?

## Question (EN)
What is an ANR (Application Not Responding) and how do you prevent it?

## Đáp án chi tiết (VI)
ANR là hộp thoại hệ thống hiện ra khi **main thread (UI thread) bị chặn quá lâu** nên app không phản hồi. Các ngưỡng chính:\
\
- Không xử lý input event (chạm, phím) trong **5 giây**.\
- `BroadcastReceiver.onReceive()` chạy quá lâu (**10 giây** foreground, **60 giây** background).\
- Service không hoàn tất khởi động/thao tác đúng hạn.\
\
Nguyên nhân điển hình: làm việc nặng trên main thread — I/O đĩa/mạng, query database lớn, parse JSON khổng lồ, bitmap lớn, hoặc lock/deadlock.\
\
**Cách phòng tránh:**\
- Đẩy mọi tác vụ nặng khỏi main thread: coroutine + `Dispatchers.IO`, `WorkManager` cho việc chạy nền/trì hoãn được.\
- Không I/O hay truy vấn DB đồng bộ trên UI thread.\
- Giữ callback vòng đời và `onReceive()` thật nhẹ.\
- Theo dõi trên **Android vitals** (Play Console) để bắt ANR thực tế từ người dùng.

## Detailed Answer (EN)
An ANR is the system dialog shown when the **main (UI) thread is blocked too long** and the app stops responding. Key thresholds:\
\
- No response to an input event (touch, key) within **5 seconds**.\
- A `BroadcastReceiver.onReceive()` runs too long (**10 seconds** foreground, **60 seconds** background).\
- A Service fails to finish startup/execution in time.\
\
Typical causes: heavy work on the main thread — disk/network I/O, large database queries, huge JSON parsing, big bitmaps, or locks/deadlocks.\
\
**Prevention:**\
- Move heavy work off the main thread: coroutines + `Dispatchers.IO`, `WorkManager` for deferrable/background jobs.\
- Never do synchronous I/O or DB queries on the UI thread.\
- Keep lifecycle callbacks and `onReceive()` lightweight.\
- Monitor **Android vitals** (Play Console) to catch real-world ANRs from users.
