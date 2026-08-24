---
id: service-la-gi-khi-nao-dung-foreground-service-hay-workmanager
position: backend
technology: components
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service là gì? Khi nào dùng foreground service hay WorkManager?

## Question (EN)
What is a Service and when do you use a foreground service vs WorkManager?

## Đáp án chi tiết (VI)
Service là component chạy tác vụ **không cần UI**. Mặc định chạy trên main thread nên phải tự đẩy việc nặng sang thread nền.\
\
Các loại/lựa chọn:\
- **Foreground service**: việc người dùng thấy được và cần chạy tiếp khi app ở nền (phát nhạc, ghi âm, định vị chuyến đi). Bắt buộc hiện **notification** thường trực.\
- **Bound service**: cho component khác bind vào để gọi trực tiếp (IPC).\
- **WorkManager**: cách **được khuyến nghị** cho việc nền **có thể trì hoãn và cần đảm bảo chạy** (đồng bộ, upload) — tự lên lịch, chịu ràng buộc (chỉ chạy khi có Wi-Fi/đang sạc), sống qua restart.\
\
Lưu ý: `IntentService` đã deprecated; background service thuần bị Android mới hạn chế mạnh → ưu tiên WorkManager hoặc coroutine trong vòng đời phù hợp.

## Detailed Answer (EN)
A Service is a component that runs work with **no UI**. By default it runs on the main thread, so you must offload heavy work to a background thread yourself.\
\
Options:\
- **Foreground service**: user-visible work that must keep running while the app is backgrounded (music playback, recording, trip location). It must show a persistent **notification**.\
- **Bound service**: lets other components bind and call it directly (IPC).\
- **WorkManager**: the **recommended** way for **deferrable, guaranteed** background work (sync, upload) — it schedules itself, honors constraints (only on Wi-Fi/charging), and survives restarts.\
\
Note: `IntentService` is deprecated; plain background services are heavily restricted on modern Android → prefer WorkManager or a coroutine in an appropriate lifecycle scope.
