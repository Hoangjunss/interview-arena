---
id: best-practice-ve-memory-management-trong-android-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Best practice về memory management trong Android là gì?

## Question (EN)
What are the best practices for memory management in Android?

## Đáp án chi tiết (VI)
Tránh memory leak bằng cách: không giữ strong reference đến Activity/View (dùng weak ref), unregister listener khi không dùng, implement singleton đúng cách với application context. Lưu ý: `viewModelScope` và `lifecycleScope` tự động bị cancel khi ViewModel cleared hoặc lifecycle destroyed — chỉ cần cancel thủ công với custom `CoroutineScope`. Dùng `LeakCanary` để tự động phát hiện leak. Monitor bằng memory tab trong Android Profiler.

## Detailed Answer (EN)
Avoid memory leaks by: not holding strong references to Activities/Views (use weak refs), unregistering listeners when done, and properly implementing singletons with application context. Note: `viewModelScope` and `lifecycleScope` are automatically cancelled when the ViewModel is cleared or lifecycle is destroyed — manual cancellation is only needed for custom `CoroutineScope`. Use `LeakCanary` to detect leaks automatically. Monitor with Android Profiler's memory tab.
