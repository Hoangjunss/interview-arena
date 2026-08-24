---
id: toi-uu-bo-nho-va-pin-cho-app-mobile-can-luu-y-gi
position: backend
technology: performance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tối ưu bộ nhớ và pin cho app mobile: cần lưu ý gì?

## Question (EN)
What matters when optimizing memory and battery for a mobile app?

## Đáp án chi tiết (VI)
Thiết bị mobile giới hạn RAM và pin; app tiêu tốn dễ bị hệ thống kill hoặc bị người dùng gỡ.\
\
**Bộ nhớ:**\
- **Rò rỉ (leak)** là nguyên nhân chính: giữ tham chiếu tới Activity/Context/View trong object sống lâu, listener/coroutine không hủy → object không được GC. Dùng LeakCanary/Profiler để phát hiện.\
- Giải phóng tài nguyên nặng (bitmap, file, camera) đúng lúc; ảnh nên downscale/cache.\
- List lớn phải ảo hóa (RecyclerView/LazyColumn/FlatList), không nạp tất cả vào RAM.\
\
**Pin:**\
- Tốn pin nhất: **mạng, GPS, wake lock, việc nền chạy liên tục**.\
- Gom request theo lô, dùng **WorkManager** với ràng buộc (chỉ chạy khi sạc/Wi-Fi), tránh polling dày; nghe lifecycle để dừng cảm biến/timer khi vào nền.\
- Đẩy thông báo qua **push** thay vì tự poll server.\
\
Hay hỏi: cách phát hiện memory leak và vì sao background work không kiểm soát làm hao pin.

## Detailed Answer (EN)
Mobile devices are limited in RAM and battery; a heavy app gets killed by the system or uninstalled by users.\
\
**Memory:**\
- **Leaks** are the main culprit: holding an Activity/Context/View reference in a long-lived object, or uncancelled listeners/coroutines → objects never GC'd. Use LeakCanary/Profiler to find them.\
- Release heavy resources (bitmaps, files, camera) promptly; downscale/cache images.\
- Large lists must be virtualized (RecyclerView/LazyColumn/FlatList), not loaded entirely into RAM.\
\
**Battery:**\
- Biggest drains: **network, GPS, wake locks, continuous background work**.\
- Batch requests, use **WorkManager** with constraints (only on charge/Wi-Fi), avoid frequent polling; observe lifecycle to stop sensors/timers when backgrounded.\
- Deliver updates via **push** instead of self-polling the server.\
\
Common ask: how to detect a memory leak and why uncontrolled background work drains battery.
