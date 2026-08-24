---
id: workmanager-la-gi-va-khi-nao-nen-dung
position: backend
technology: data-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WorkManager là gì và khi nào nên dùng?

## Question (EN)
What is WorkManager and when should you use it?

## Đáp án chi tiết (VI)
WorkManager lên lịch background work có thể defer được, tồn tại qua app restart và system reboot. Nó tự động xử lý Doze Mode và App Standby, chọn cơ chế scheduling tốt nhất (JobScheduler, BroadcastReceiver). Dùng cho tác vụ đáng tin cậy, không khẩn cấp như sync data, upload file, hay báo cáo định kỳ. Tạo `Worker` subclass, dùng `OneTimeWorkRequest` hoặc `PeriodicWorkRequest`, và enqueue với `WorkManager.enqueue()`.

## Detailed Answer (EN)
WorkManager schedules deferrable background work that survives app restarts and system reboots. It automatically handles Doze Mode and App Standby, choosing the best scheduling mechanism. Use for reliable, non-urgent tasks like syncing data, uploading files, or periodic reports. Create `Worker` subclasses, use `OneTimeWorkRequest` or `PeriodicWorkRequest`, and enqueue with `WorkManager.enqueue()`.
